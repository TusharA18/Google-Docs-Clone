import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContextProvider";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
   const { user, setUser } = useContext(UserContext);

   const navigate = useNavigate();

   useEffect(() => {
      if (!user) {
         return;
      }

      const element = document.querySelector(".profile");

      const handleEvent = () => {
         setTimeout(() => {
            element.querySelector("button").style.display = "hidden";
         }, 1000);

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
      <div className="flex items-center justify-between bg-white px-5 py-2 fixed w-full h-16 shadow-lg">
         <Link to="/">
            <div className="flex items-center justify-center cursor-pointer">
               <img className="w-9" src="/assets/logo.png" alt="docs logo" />
               <p className="text-lg">Docs</p>
            </div>
         </Link>
         {user && (
            <div className="flex items-center justify-start text-black bg-gray-100 p-3 w-[35rem] rounded-lg space-x-3 focus-within:bg-white focus-within:border focus-within:shadow-md">
               <img className="" src="/assets/search.svg" alt="" />
               <input
                  className="bg-transparent w-full text-black border-none outline-none"
                  type="text"
                  placeholder="Search..."
               />
            </div>
         )}
         <div className="flex items-center space-x-4 mr-1">
            <img className="w-7" src="/assets/menu-app.svg" alt="" />
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
   );
};

export default Navbar;
