import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./components/Home";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContextProvider";
import { fetchUserData } from "./api/api";
import TextEditor from "./components/TextEditor";
import "./styles.css";
import "./App.css";

const App = () => {
   const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

   const navigate = useNavigate();

   const { user, setUser } = useContext(UserContext);

   useEffect(() => {
      if (sessionStorage.getItem("auth-token") && !user) {
         const fetchData = async () => {
            const data = await fetchUserData(
               sessionStorage.getItem("auth-token")
            );

            setUser(data);
         };

         fetchData();
      }
   }, []); // eslint-disable-line

   useEffect(() => {
      if (!sessionStorage.getItem("auth-token")) {
         navigate("/login");
      }
   }, [navigate]); // eslint-disable-line

   return (
      <>
         <GoogleOAuthProvider clientId={clientId}>
            <Routes>
               <Route path="/" element={<Navigate to="/document" replace />} />
               <Route exact path="/document" element={<Home />} />
               <Route exact path="/login" element={<Login />} />
               <Route exact path="/document/:id" element={<TextEditor />} />
               <Route
                  exact
                  path="*"
                  element={<Navigate to="/document" replace />}
               />
            </Routes>
         </GoogleOAuthProvider>
      </>
   );
};

export default App;
