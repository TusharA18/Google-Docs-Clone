import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
   const [user, setUser] = useState({});
   const [token, setToken] = useState();

   return (
      <UserContext.Provider value={{ user, setUser, token, setToken }}>
         {children}
      </UserContext.Provider>
   );
};

UserProvider.propTypes = {
   children: PropTypes.node,
};

export default UserProvider;
