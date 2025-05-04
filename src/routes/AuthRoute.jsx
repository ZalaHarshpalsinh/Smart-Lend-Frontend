import { Navigate } from "react-router-dom";
import { getToken, getUserRoleFromToken } from "../services/authService";

export default function AuthRoute({ children }) {
    const role = getUserRoleFromToken();
    return getToken() ? <Navigate to={`/${role}-dashboard`} replace /> : children;
}