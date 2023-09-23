import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContextProvider";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import { IconButton } from "@mui/material";

const ShareLinkModal = () => {
   const { setShowShareModal } = useContext(UserContext);

   const [copy, setCopy] = useState(false);
   const [copyFlag, setCopyFlag] = useState(false);

   useEffect(() => {
      if (copy === false) {
         return;
      }

      const timeout = setTimeout(() => setCopy(false), 3000);

      return () => {
         clearTimeout(timeout);
      };
   }, [copy, copyFlag]);

   const handleToggle = () => {
      setShowShareModal(false);
   };

   const handleClick = () => {
      setCopy(true);

      setCopyFlag(!copyFlag);

      navigator.clipboard.writeText(window.location.href);
   };

   return (
      <div className="fixed z-30 top-0 bottom-0 right-0 left-0 bg-transparent h-auto">
         <div
            onClick={handleToggle}
            className="absolute top-0 bottom-0 right-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-50"
         />
         <div className="absolute top-[35%] left-[35%] bg-white z-20 px-10 pt-10 pb-7 rounded-lg flex-col space-y-3 w-[40rem]">
            <div className="flex-col space-y-3">
               <h1 className="text-2xl">Share Link</h1>
               <p className="text-gray-600">
                  Copy the link to start collaborating:
               </p>
               <div className="flex items-center space justify-between border border-gray-500 rounded-lg px-2 py-1">
                  <div className="pl-1">{window.location.href}</div>
                  <IconButton onClick={handleClick}>
                     {copy ? <DoneIcon /> : <ContentCopyIcon />}
                  </IconButton>
               </div>
            </div>
            <div className="flex pt-2 items-center justify-end space-x-5">
               <button
                  onClick={handleToggle}
                  className="w-24 py-1 px-2 rounded-md border border-gray-400 text-blue-500 font-medium hover:bg-blue-50"
               >
                  Cancel
               </button>
            </div>
         </div>
      </div>
   );
};

export default ShareLinkModal;
