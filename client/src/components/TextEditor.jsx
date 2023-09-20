import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContextProvider";

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
   const { user, setUser, doc, setDoc } = useContext(UserContext);

   const [value, setValue] = useState("");
   const [name, setName] = useState(doc.name);
   const [save, setSave] = useState(true);

   const navigate = useNavigate();

   useEffect(() => {
      const element = document.querySelector(".ql-editor");
      element.focus();
   }, []);

   useEffect(() => {
      const container = document.querySelector(".ql-container");
      const editor = document.querySelector(".ql-editor");

      container.addEventListener("click", () => {
         editor.focus();
      });
   });

   useEffect(() => {
      document.title = `${name} - Google Docs`;

      setDoc((prev) => ({ ...prev, name: name }));
   }, [name]); // eslint-disable-line

   useEffect(() => {
      setDoc((prev) => ({ ...prev, data: value }));
   }, [value]); // eslint-disable-line

   useEffect(() => {
      setTimeout(() => {
         setSave(true);
      }, 3000);

      setSave(false);
   }, [doc]);

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

   return (
      <div className="bg-[rgb(249, 251, 253)] max-h-full">
         <div className="flex items-center justify-between fixed bg-white px-5 py-2 w-full h-16 shadow-lg z-10">
            <div className="flex items-center justify-center text-gray-600">
               <Link to="/document">
                  <img
                     className="w-9 cursor-pointer"
                     src="/assets/logo.png"
                     alt="docs logo"
                  />
               </Link>
               <input
                  className="text-xl hover:border hover:border-gray-600 rounded-lg px-2 py-1 mx-1"
                  type="text"
                  maxLength={20}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />
               <div className="flex space-x-2">
                  <img className="w-5" src="/assets/save-icon.png" alt="" />
                  <p>{save ? "Saved to Drive" : "Saving..."}</p>
               </div>
            </div>
            <div className="flex items-center space-x-4 mr-1">
               <button className="flex items-center bg-blue-300 hover:bg-blue-500 px-4 py-2 rounded-3xl">
                  <img
                     className="w-5 mix-blend-multiply"
                     src="/assets/lock-icon.jpg"
                     alt=""
                  />
                  <p className="text-sm font-semibold">Share</p>
               </button>
               {user ? (
                  <div className="profile cursor-pointer">
                     <img
                        src={
                           user?.photo
                              ? user?.photo
                              : "/assets/anonymous-user.webp"
                        }
                        className="w-9 rounded-3xl"
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
         <ReactQuill
            modules={{ toolbar: toolbarOptions }}
            theme="snow"
            value={value}
            onChange={setValue}
         />
      </div>
   );
};

export default TextEditor;
