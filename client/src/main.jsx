import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import UserProvider from "./context/UserContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
   <UserProvider>
      <Router>
         <App />
      </Router>
   </UserProvider>
);
