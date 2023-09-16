import { Navigate } from "react-router-dom";

const PrivateLayoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return children;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default PrivateLayoute;
