import { Navigate, Outlet } from "react-router-dom";
import "../LayoutDefault/LayoutDefault";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { useAuthContext } from "../../contexts/AuthContext";

export default function ProtectedRoutesLayout() {
    const { isAuth } = useAuthContext();

    return isAuth ? (
        <>
            <div className="default-app-layout">
                <NavBar />
                <Outlet />
                <Footer />
            </div>
        </>
    ) : (
        <Navigate to={"/login"} />
    );
}
