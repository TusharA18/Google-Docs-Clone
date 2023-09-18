import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectEmail } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ Component }) => {
   const { email } = useSelector(selectEmail);

   const navigate = useNavigate();

   useEffect(() => {
      if (!email) {
         navigate("/login");
      }
   }, []); // eslint-disable-line

   return <Component />;
};

ProtectedRoute.propTypes = {
   Component: PropTypes.func,
};

export default ProtectedRoute;
