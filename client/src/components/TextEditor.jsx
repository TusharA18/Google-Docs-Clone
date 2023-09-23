import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContextProvider";
import { io } from "socket.io-client";
import { fetchDocument } from "../api/api";
import RenameDocumentModal from "./RenameDocumentModal";
import ShareLinkModal from "./ShareLinkModal";

const toolbarOptions = [
   ["bold", "italic", "underline", "strike"], // toggled buttons
   ["blockquote", "code-block"],

   [{ header: 1 }, { header: 2 }], // custom button values
   [{ list: "ordered" }, { list: "bullet" }],
   [{ script: "sub" }, { script: "super" }], // superscript/subscript
   [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
   [{ direction: "rtl" }], // text direction

   [{ size: ["small", false, "large", "huge"] }], // custom dropdown
   [{ header: [1, 2, 3, 4, 5, 6, false] }],

   [{ color: [] }, { background: [] }], // dropdown with defaults from theme
   [{ font: [] }],
   [{ align: [] }],

   ["clean"], // remove formatting button
];

const TextEditor = () => {
   const {
      user,
      setUser,
      showModal,
      setShowModal,
      modalData,
      setModalData,
      showShareModal,
      setShowShareModal,
   } = useContext(UserContext);

   const { id } = useParams();

   const [socket, setSocket] = useState();
   const [quill, setQuill] = useState();
   const [name, setName] = useState("");
   const [save, setSave] = useState(true);
   const [flag, setFlag] = useState(false);

   const navigate = useNavigate();

   useEffect(() => {
      const element = document.querySelector(".ql-editor");
      element?.focus();
   }, []);

   useEffect(() => {
      const container = document.querySelector(".ql-container");
      const editor = document.querySelector(".ql-editor");

      container?.addEventListener("click", () => {
         editor?.focus();
      });
   });

   useEffect(() => {
      document.title = `${name} - Google Docs`;
   }, [name]);

   useEffect(() => {
      const fetchData = async () => {
         const data = await fetchDocument({
            token: sessionStorage.getItem("auth-token"),
            docId: id,
         });

         if (!data) {
            navigate("/error");
         }

         setModalData(data);

         setName(data?.name);
      };

      fetchData();
   }, [showModal, flag]); // eslint-disable-line

   useEffect(() => {
      const container = document.querySelector(".container");

      const editor = document.createElement("div");

      container.append(editor);

      const quillServer = new Quill(editor, {
         theme: "snow",
         modules: { toolbar: toolbarOptions },
      });

      quillServer.disable();
      quillServer.setText("Loading the document...");

      setQuill(quillServer);

      return () => {
         container.innerHTML = "";
      };
   }, []);

   useEffect(() => {
      const socketServer = io(import.meta.env.VITE_SERVER_URL);

      setSocket(socketServer);

      return () => {
         socket && socket.disconnect();
      };
   }, []); // eslint-disable-line

   useEffect(() => {
      if (quill == null || socket == null) {
         return;
      }

      socket.once("load-document", (document) => {
         quill.setContents(document.value);
         quill.enable();
      });

      socket.emit("get-document", id);
   }, [quill, socket, id]);

   useEffect(() => {
      if (quill == null || socket == null) {
         return;
      }

      const handleChange = (delta, oldDelta, source) => {
         if (source !== "user") {
            return;
         }

         setSave(false);

         socket.emit("send-changes", delta);
      };

      quill.on("text-change", handleChange);

      return () => {
         quill.off("text-change", handleChange);
      };
   }, [quill, socket]);

   useEffect(() => {
      if (quill == null || socket == null) {
         return;
      }

      const handleChange = (delta) => {
         setSave(false);

         quill.updateContents(delta);
      };

      socket.on("receive-changes", handleChange);

      return () => {
         socket.off("receive-changes", handleChange);
      };
   }, [quill, socket]);

   useEffect(() => {
      if (
         socket == null ||
         quill.getContents().ops[0].insert == "Loading the document...\n"
      ) {
         return;
      }

      const interval = setTimeout(() => {
         setSave(true);
      }, 1200);

      socket.emit("save-changes", {
         name: name.length === 0 ? "Untitled document" : name,
         _id: id,
         value: quill.getContents(),
         date: Date.now(),
      });

      return () => {
         clearTimeout(interval);
      };
   }, [save, name]); // eslint-disable-line

   useEffect(() => {
      if (socket == null) {
         return;
      }

      socket.emit("send-name-change", "");
   }, [socket, name]); // eslint-disable-line

   useEffect(() => {
      if (socket == null) {
         return;
      }

      // eslint-disable-next-line
      socket.on("receive-name-change", (val) => {
         setFlag(!flag);
      });
   }, [socket, name]); // eslint-disable-line

   useEffect(() => {
      if (!user) {
         return;
      }

      const element = document.querySelector(".profile");

      const handleEvent = () => {
         setTimeout(() => {
            element.querySelector("button").style.display = "none";
         }, 2000);

         element.querySelector("button").style.display = "block";
      };

      element.addEventListener("mouseover", handleEvent);

      return () => {
         element.removeEventListener("mouseover", handleEvent);
      };
   }, [user]); // eslint-disable-line

   const handleClick = () => {
      sessionStorage.removeItem("auth-token");

      setUser();

      navigate("/login");
   };

   const handleToggle = () => {
      setShowModal(true);
   };

   return (
      <div className="bg-[rgb(249, 251, 253)] max-h-full w-full">
         <div className="flex items-center justify-between fixed bg-white px-5 py-2 w-full h-16 shadow-lg z-10">
            <div className="flex items-center justify-center text-gray-600">
               <Link to="/document">
                  <img
                     className="w-9 cursor-pointer"
                     src="/assets/logo.png"
                     alt="docs logo"
                  />
               </Link>
               <h1 className="text-xl mx-2 mr-10">{name}</h1>
               <div className="flex items-center pt-1 space-x-2">
                  <img className="w-5" src="/assets/save-icon.png" alt="" />
                  <p>{save ? "Saved to Drive" : "Saving..."}</p>
               </div>
            </div>
            <div className="flex items-center space-x-4 mr-1">
               {user?._id === modalData?.userId && (
                  <div
                     onClick={handleToggle}
                     className="flex items-center text-lg border cursor-pointer border-gray-300 bg-white text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-3xl space-x-2"
                  >
                     <img src="/assets/rename.png" className="w-6" alt="" />
                     <p>Rename</p>
                  </div>
               )}
               <button
                  onClick={() => setShowShareModal(true)}
                  className="flex items-center bg-blue-400 text-white hover:bg-blue-500 px-4 py-2 rounded-3xl text-lg space-x-1"
               >
                  <img
                     className="w-5 mix-blend-multiply"
                     src="/assets/lock-icon.jpg"
                     alt=""
                  />
                  <p>Share</p>
               </button>
               {user ? (
                  <div className="profile cursor-pointer">
                     <img
                        src={
                           user?.photo
                              ? user?.photo
                              : "/assets/anonymous-user.webp"
                        }
                        className="w-11 rounded-3xl"
                        alt=""
                     />
                     <button
                        className="hidden absolute bg-white border border-gray-600 w-20 top-14 right-1 rounded-lg py-1"
                        onClick={handleClick}
                     >
                        Sign Out
                     </button>
                  </div>
               ) : (
                  <>
                     <button
                        className="w-20 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700"
                        onClick={() => navigate("/login")}
                     >
                        Login
                     </button>
                  </>
               )}
            </div>
         </div>
         <div className="container pt-10 w-full m-auto"></div>
         {showModal && <RenameDocumentModal />}
         {showShareModal && <ShareLinkModal />}
      </div>
   );
};

export default TextEditor;
