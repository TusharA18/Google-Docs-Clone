import Navbar from "./Navbar";

const Home = () => {
   return (
      <div className="">
         <Navbar />
         <div className="bg-gray-100 pt-[4rem]">
            <div className="px-48 py-5">
               <h1 className="my-4 text-xl">Start a new document</h1>
               <img
                  className="w-36 h-48 cursor-pointer border border-gray-200 hover:border hover:border-blue-200"
                  src="/assets/blank-page.png"
                  alt=""
               />
               <p className="text-lg mt-2 font-semibold">Blank</p>
            </div>
         </div>
         <div>
            <div className="px-48 py-5">
               <h1 className="text-xl">Recent documents</h1>
               <div
                  className="border border-gray-100 shadow-md 
               mt-5 py-7"
               >
                  <h1 className="text-center text-xl">No text document yet</h1>
                  <p className="text-center text-lg text-gray-500">
                     Click + to create a new document.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Home;
