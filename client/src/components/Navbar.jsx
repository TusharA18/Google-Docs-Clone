import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContextProvider";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = ({ text, setText }) => {
   const { user, setUser } = useContext(UserContext);

   const navigate = useNavigate();

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

   useEffect(() => {
      if (sessionStorage.getItem("auth-token")) {
         navigate("/document");
      }
   }, [navigate]); // eslint-disable-line

   const handleClick = () => {
      sessionStorage.removeItem("auth-token");

      setUser();

      navigate("/login");
   };

   return (
      <div className="flex items-center justify-between bg-white px-5 py-2 fixed w-full h-16 shadow-lg cursor-pointer">
         <Link to="/document">
            <div className="flex items-center justify-center">
               <img
                  className="w-9 cursor-pointer"
                  src="/assets/logo.png"
                  alt="docs logo"
               />
               <p className="text-xl">Docs</p>
            </div>
         </Link>
         {user && (
            <div className="flex items-center justify-start text-black bg-gray-100 p-3 w-[35rem] rounded-lg space-x-3 focus-within:bg-white focus-within:border focus-within:shadow-md">
               <img className="" src="/assets/search.svg" alt="" />
               <input
                  className="bg-transparent w-full text-black border-none outline-none"
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Search..."
               />
            </div>
         )}
         <div className="flex items-center space-x-4 mr-1">
            <img className="w-7" src="/assets/menu-app.svg" alt="" />
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
                     onClick={() => navigate("/login")}
                     className="w-20 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                     Login
                  </button>
               </>
            )}
         </div>
      </div>
   );
};

Navbar.propTypes = {
   text: PropTypes.string,
   setText: PropTypes.func,
};

export default Navbar;
