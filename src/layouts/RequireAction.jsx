import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const RequireAction = () => {
    const { auth } = useAuth();
    useEffect(() => {
        console.log("RequireAction", auth);
    }, [auth]);
    return (
        auth?.email && auth?.password ? <Navigate to="/" replace /> : <Outlet />
    );
}

export default RequireAction;