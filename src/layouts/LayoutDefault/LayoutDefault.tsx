import { Outlet } from "react-router-dom";
import './LayoutDefault.scss'
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
export default function LayoutDefault() {
    return (
        <>
            <div className="default-app-layout">
                <NavBar />
                <Outlet />
                <Footer />
            </div>
        </>
    );
}
