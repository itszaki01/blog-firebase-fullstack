import { Menu, MenuItem, MenuButton, MenuDivider } from "@szhsin/react-menu";
import "./PostActionMenu.scss";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { useNavigate } from "react-router-dom";
import { faEdit, faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PostType } from "../../../types/Post.type";
import { useDeletePost } from "../../../hooks/post/postMutations";

export default function PostActionMenu({ postData }: { postData: PostType }) {
    const navigate = useNavigate();
    const { mutateAsync } = useDeletePost(postData);
    
    return (
        <Menu
            transition
            initialMounted
            menuButton={
                <MenuButton>
                    <FontAwesomeIcon icon={faEllipsisVertical} style={{ marginRight: "10px" }} />
                </MenuButton>
            }
        >
            <MenuItem onClick={() => navigate(`/update-post/${postData.id}`)}>
                <FontAwesomeIcon icon={faEdit} style={{ marginRight: "10px" }} />
                Edite
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={()=> mutateAsync()} className={"delete-icon"}>
                <FontAwesomeIcon icon={faTrash} style={{ marginRight: "10px" }} />
                Remove
            </MenuItem>
        </Menu>
    );
}
