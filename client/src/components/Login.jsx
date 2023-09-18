import { GoogleLogin } from "@react-oauth/google";
import decode from "jwt-decode";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContextProvider";
import { loginUser } from "../api/api";

const Login = () => {
   const navigate = useNavigate();

   const { setUser } = useContext(UserContext);

   useEffect(() => {
      if (sessionStorage.getItem("auth-token")) {
         navigate("/");
      }
   }, [navigate]); // eslint-disable-line

   return (
      <>
         <GoogleLogin
            onSuccess={async (res) => {
               const data = decode(res.credential);

               const userData = await loginUser(data);

               setUser(userData.user);

               sessionStorage.setItem("auth-token", userData.token);

               navigate("/");
            }}
            onError={(err) => {
               console.log("Error while login in", err);
            }}
         />
      </>
   );
};

export default Login;
