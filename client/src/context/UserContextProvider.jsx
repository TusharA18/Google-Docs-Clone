import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
   const [user, setUser] = useState();
   const [token, setToken] = useState();
   const [doc, setDoc] = useState({
      name: "Untitled document",
      data: "",
   });

   return (
      <UserContext.Provider
         value={{ user, setUser, token, setToken, doc, setDoc }}
      >
         {children}
      </UserContext.Provider>
   );
};

UserProvider.propTypes = {
   children: PropTypes.node,
};

export default UserProvider;
