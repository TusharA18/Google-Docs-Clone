import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
   const [user, setUser] = useState();
   const [token, setToken] = useState();
   const [showModal, setShowModal] = useState(false);
   const [modalData, setModalData] = useState();
   const [deleteFlag, setDeleteFlag] = useState(false);
   const [showShareModal, setShowShareModal] = useState(false);

   return (
      <UserContext.Provider
         value={{
            user,
            setUser,
            token,
            setToken,
            showModal,
            setShowModal,
            modalData,
            setModalData,
            deleteFlag,
            setDeleteFlag,
            showShareModal,
            setShowShareModal,
         }}
      >
         {children}
      </UserContext.Provider>
   );
};

UserProvider.propTypes = {
   children: PropTypes.node,
};

export default UserProvider;
