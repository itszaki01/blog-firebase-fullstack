import "./NavBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import NavBarMenu from "./NavBarMenu";
import { useAuthContext } from "../../contexts/AuthContext";
export function NavBar() {
    const { isAuth } = useAuthContext();
    const navigate = useNavigate();
    return (
        <>
            <nav>
                <div className="nav-bar-container">
                    {/* LOGO SCTION */}
                    <Link to={"/"} className="logo-section-1">
                        <FontAwesomeIcon icon={faBlog} fontSize={30} />
                        <h2 className="text-4xl">Blog</h2>
                    </Link>

                    {/* SECTION TWO */}
                    <div className="profile-section-2">
                        {isAuth ? (
                            <NavBarMenu />
                        ) : (
                            <button className="btn-primary" onClick={() => navigate("/login")}>
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
export default NavBar;
