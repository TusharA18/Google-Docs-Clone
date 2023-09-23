import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { createDocument, getAllDocuments } from "../api/api";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContextProvider";
import Document from "./Document";
import RenameDocumentModal from "./RenameDocumentModal";

const Home = () => {
   const navigate = useNavigate();

   const { user, showModal, deleteFlag } = useContext(UserContext);

   const [text, setText] = useState("");
   const [documents, setDocuments] = useState();

   useEffect(() => {
      document.title = "Google Docs";
   }, []);

   useEffect(() => {
      if (!user) {
         return;
      }

      const fetchData = async () => {
         const data = await getAllDocuments({
            token: sessionStorage.getItem("auth-token"),
            userId: user._id,
         });

         const newData = data.sort((a, b) => {
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);

            return bDate.getTime() - aDate.getTime();
         });

         const filteredData = newData.filter((d) => {
            return d?.name?.includes(text);
         });

         setDocuments(filteredData);
      };

      fetchData();
   }, [user, showModal, deleteFlag, text]); // eslint-disable-line

   const handleNewDocument = async () => {
      const data = await createDocument({
         token: sessionStorage.getItem("auth-token"),
         document: { name: "Untitled document", value: {}, userId: user?._id },
      });

      if (data._id) {
         navigate(`/document/${data._id}`);
      }
   };

   return (
      <div className="">
         <Navbar text={text} setText={setText} />
         <div className="bg-gray-100 pt-[4rem]">
            <div className="px-48 py-5">
               <h1 className="my-4 text-xl">Start a new document</h1>
               <img
                  onClick={handleNewDocument}
                  className="w-36 h-48 cursor-pointer border border-gray-200 hover:border hover:border-blue-200"
                  src="/assets/blank-page.png"
                  alt=""
               />
               <p className="text-lg mt-2 font-semibold">Blank</p>
            </div>
         </div>
         <div>
            <div className="px-48 py-5">
               <h1 className="text-xl my-5">Recent documents</h1>
               {documents && documents?.length !== 0 ? (
                  <div className="flex flex-wrap gap-4">
                     {documents.map((doc) => (
                        <Document key={doc._id} document={doc} />
                     ))}
                  </div>
               ) : (
                  <div
                     className="border border-gray-100 shadow-md 
               mt-5 py-7"
                  >
                     <h1 className="text-center text-xl">
                        No text document yet
                     </h1>
                     <p className="text-center text-lg text-gray-500">
                        Click + to create a new document.
                     </p>
                  </div>
               )}
            </div>
         </div>
         {showModal && <RenameDocumentModal />}
      </div>
   );
};

export default Home;
