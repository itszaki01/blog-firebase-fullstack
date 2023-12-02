import { Menu, MenuItem, MenuButton, MenuDivider } from "@szhsin/react-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faRightFromBracket, faSun, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
//Styling
import ImgAvatar from "/src/assets/img_avatar.png";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "./ReactMenu.scss";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../hooks/auth/useAuth";
import { FBaseAuthCall } from "../../api/FBaseAuthCalls";
import { useAuthContext } from "../../contexts/AuthContext";
import { Toast } from "../../Swal/Mixins";
export default function NavBarMenu() {
    const { currentUserData } = useAuth();
    const navigate = useNavigate();
    const { setTheme, theme } = useTheme();
    const { setIsAuth } = useAuthContext();
    return (
        <>
            <div className="nav-bar-menu-container">
                <p>Hi, {currentUserData?.displayName}</p>
                <Menu
                    transition
                    initialMounted
                    align="center"
                    menuButton={
                        <MenuButton>
                            <img src={currentUserData?.photoURL || ImgAvatar} alt="avatar" className="avatar-50" />
                        </MenuButton>
                    }
                >
                    <MenuItem onClick={() => navigate("/profile")}>
                        <FontAwesomeIcon icon={faUser} style={{ marginRight: "10px" }} />
                        Profile
                    </MenuItem>

                    {/* CHANGE THEME CONDITION */}
                    {theme === "default-theme" ? (
                        <MenuItem onClick={() => setTheme("dark-theme")}>
                            <FontAwesomeIcon icon={faMoon} style={{ marginRight: "10px" }} />
                            Dark Theme
                        </MenuItem>
                    ) : (
                        <MenuItem onClick={() => setTheme("default-theme")}>
                            <FontAwesomeIcon icon={faSun} style={{ marginRight: "10px" }} />
                            Light Theme
                        </MenuItem>
                    )}

                    <MenuDivider />

                    <MenuItem
                        onClick={() => {
                            FBaseAuthCall.signOutUser().then(() => {
                                setIsAuth(false);
                                Toast.fire({
                                    title: "Logged Out Successfuly",
                                    icon: "success",
                                });
                                navigate("/login");
                            });
                        }}
                    >
                        <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: "10px" }} />
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        </>
    );
}
