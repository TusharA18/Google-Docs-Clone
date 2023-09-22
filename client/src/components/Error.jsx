import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
   const navigate = useNavigate();

   useEffect(() => {
      document.title = "Page not found";
   }, []);

   return (
      <div className="mx-96 my-10 text-gray-500">
         <div className="flex items-center">
            <img src="/assets/logo.png" alt="" />
            <h1 className="text-2xl">
               <span className="font-semibold">Google</span> Docs
            </h1>
         </div>
         <div className="mt-24 space-y-4 text-center">
            <h1 className="text-6xl">Error</h1>
            <p className="text-4xl">404 Not Found</p>
         </div>
         <div className="my-24 text-center">
            <button
               onClick={() => navigate("/document")}
               className="bg-blue-600 text-white text-2xl px-6 py-2 rounded-lg hover:bg-blue-800"
            >
               Go to homepage
            </button>
         </div>
      </div>
   );
};

export default Error;
