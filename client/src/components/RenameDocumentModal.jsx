import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";
import { updateDocument } from "../api/api";

const RenameDocumentModal = () => {
   const { setShowModal, modalData, setModalData } = useContext(UserContext);

   const handleToggle = () => {
      setShowModal(false);
   };

   const handleChange = (e) => {
      setModalData((prev) => ({ ...prev, name: e.target.value }));
   };

   const handleKeyDown = (e) => {
      const code = e.key || e.which;

      if (code === 13 || code === "Enter") {
         handleClick();
      }
   };

   const handleClick = async () => {
      const data = await updateDocument({
         token: sessionStorage.getItem("auth-token"),
         doc: modalData,
      });

      setModalData(data);

      setShowModal(false);
   };

   return (
      <div className="fixed z-30 top-0 bottom-0 right-0 left-0 bg-transparent h-auto">
         <div
            onClick={handleToggle}
            className="absolute top-0 bottom-0 right-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-50"
         />
         <div className="absolute top-[35%] left-[35%] bg-white z-20 px-10 py-10 rounded-lg flex-col space-y-3 w-[30rem]">
            <div className="flex-col space-y-3">
               <h1 className="text-2xl">Rename</h1>
               <p className="text-gray-600">
                  Please enter a new name for the item:
               </p>
            </div>
            <div>
               <input
                  type="text"
                  className="w-full border border-gray-600 rounded-md px-2 py-[3px] focus:outline focus:outline-blue-400"
                  value={modalData?.name}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  required
               />
            </div>
            <div className="flex items-center justify-end space-x-5">
               <button
                  onClick={handleToggle}
                  className="w-24 py-1 px-2 rounded-md border border-gray-400 text-blue-500 font-medium hover:bg-blue-50"
               >
                  Cancel
               </button>
               <button
                  disabled={modalData?.name.length === 0}
                  onClick={handleClick}
                  className={`w-24 py-1 px-2 rounded-md border border-gray-400 font-medium text-white ${
                     modalData?.name.length === 0
                        ? "bg-blue-300"
                        : "bg-blue-500 hover:bg-blue-600"
                  }`}
               >
                  OK
               </button>
            </div>
         </div>
      </div>
   );
};

export default RenameDocumentModal;
