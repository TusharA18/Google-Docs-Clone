import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./components/Home";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContextProvider";
import { fetchUserData } from "./api/api";

const App = () => {
   const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

   const navigate = useNavigate();

   const { user, setUser } = useContext(UserContext);

   useEffect(() => {
      if (
         sessionStorage.getItem("auth-token") &&
         Object.keys(user).length === 0
      ) {
         const fetchData = async () => {
            const data = await fetchUserData(
               sessionStorage.getItem("auth-token")
            );

            console.log(1);

            console.log(data);

            setUser(data);
         };

         fetchData();
      }
   }, [user]);

   useEffect(() => {
      if (sessionStorage.getItem("auth-token")) {
         navigate("/");
      } else {
         navigate("/login");
      }
   }, [navigate]); // eslint-disable-line

   return (
      <>
         <GoogleOAuthProvider clientId={clientId}>
            <Routes>
               <Route exact path="/" element={<Home />} />
               <Route exact path="/login" element={<Login />} />
            </Routes>
         </GoogleOAuthProvider>
      </>
   );
};

export default App;
