import { GoogleLogin } from "@react-oauth/google";
import decode from "jwt-decode";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContextProvider";
import { loginUser } from "../api/api";
import Navbar from "./Navbar";

const Login = () => {
   const navigate = useNavigate();

   const { setUser } = useContext(UserContext);

   useEffect(() => {
      document.title = "Login - Google Docs";
   }, []);

   useEffect(() => {
      if (sessionStorage.getItem("auth-token")) {
         navigate("/document");
      }
   }, [navigate]); // eslint-disable-line

   const handleSuccess = async (res) => {
      const data = decode(res.credential);

      const userData = await loginUser(data);

      setUser(userData.user);

      sessionStorage.setItem("auth-token", userData.token);

      navigate("/document");
   };

   const handleError = (err) => {
      console.log("Error while login in", err);
   };

   return (
      <div className="h-[100vh] bg-[url('/assets/login-background.jpg')] bg-cover">
         <Navbar />
         <div className="flex flex-col items-center space-y-4 bg-white rounded-xl w-[40rem] absolute top-[35vh] left-[34vw] p-10">
            <h1 className="text-5xl text-center">Welcome to Google Docs</h1>
            <p className="text-center text-xl">
               Write, Share and Collaborate at <q>REAL-TIME</q>
            </p>
            <GoogleLogin
               size="large"
               shape="pill"
               theme="filled_blue"
               onSuccess={handleSuccess}
               onError={handleError}
            />
         </div>
      </div>
   );
};

export default Login;
