import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";

const Navbar = () => {
   const { user } = useContext(UserContext);

   return (
      <div className="flex items-center justify-between bg-white px-5 py-2 fixed w-full h-16">
         <div className="flex items-center justify-center">
            <img className="w-9" src="/assets/logo.png" alt="docs logo" />
            <p className="text-lg">Docs</p>
         </div>
         <div className="flex items-center justify-start text-black bg-gray-100 p-3 w-[35rem] rounded-lg space-x-3 focus-within:bg-white focus-within:border focus-within:shadow-md">
            <img className="" src="/assets/search.svg" alt="" />
            <input
               className="bg-transparent text-black border-none outline-none"
               type="text"
               placeholder="Search..."
            />
         </div>
         <div className="flex items-center space-x-4 mr-1">
            <img className="w-7" src="/assets/menu-app.svg" alt="" />
            <div>
               <img
                  src={
                     user?.photo ? user?.photo : "/assets/anonymous-user.webp"
                  }
                  className="w-9 rounded-3xl"
                  alt=""
               />
               <button>Sign Out</button>
            </div>
         </div>
      </div>
   );
};

export default Navbar;
