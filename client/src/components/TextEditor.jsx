import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { useContext, useState } from "react";
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
   const [value, setValue] = useState("");

   const { user, setUser } = useContext(UserContext);

   const navigate = useNavigate();

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
               <p className="text-xl">Untitled document</p>
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
                  <div className="profile group cursor-pointer">
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
                        className="hidden group-hover:block absolute bg-white border border-gray-600 w-20 top-14 right-1 rounded-lg py-1"
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
