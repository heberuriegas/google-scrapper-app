import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Hook accessor to AuthContext
 * @returns {AuthContext}
 */
export const useAuth = () => useContext(AuthContext);
