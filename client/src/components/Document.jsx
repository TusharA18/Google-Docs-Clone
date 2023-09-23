import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import RenameIcon from "@mui/icons-material/TextFields";
import { IconButton } from "@mui/material";
import { UserContext } from "../context/UserContextProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { deleteDocument } from "../api/api";
import { formatDate } from "../utils/dateFormat";

const Document = ({ document }) => {
   const navigate = useNavigate();

   const { setShowModal, setModalData, deleteFlag, setDeleteFlag } =
      useContext(UserContext);

   const handleDocument = () => {
      navigate(`/document/${document._id}`);
   };

   const handleToggle = () => {
      setModalData(document);

      setShowModal(true);
   };

   const handleDelete = async () => {
      await deleteDocument({
         token: sessionStorage.getItem("auth-token"),
         docId: document._id,
      });

      setDeleteFlag(!deleteFlag);
   };

   return (
      <div className="flex-col items-end bg-gray-200 border border-gray-200 h-80 w-54 cursor-pointer">
         <div
            onClick={handleDocument}
            className="h-[74.5%] bg-gradient-to-t from-blue-50 to-white flex items-center justify-center"
         >
            <h1 className="text-gray-500">Click to continue...</h1>
         </div>
         <div className="flex-col bg-white px-3 py-2">
            <div onClick={handleDocument} className="">
               <h1 className="text-gray-600 text-md">{document?.name}</h1>
            </div>
            <div className="flex justify-between items-center">
               <div
                  onClick={handleDocument}
                  className="flex items-center justify-center"
               >
                  <img className="w-6 h-6" src="/assets/logo.png" alt="" />
                  <p className="text-[13px] text-gray-600">
                     {formatDate(new Date(document.date))}
                  </p>
               </div>
               <div className="flex items-center justify-center">
                  <IconButton onClick={handleToggle}>
                     <RenameIcon />
                  </IconButton>
                  <IconButton onClick={handleDelete}>
                     <DeleteIcon />
                  </IconButton>
               </div>
            </div>
         </div>
      </div>
   );
};

Document.propTypes = {
   document: PropTypes.object,
};

export default Document;
