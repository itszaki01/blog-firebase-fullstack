import { PostType } from "../../../types/Post.type";
import "./PostCard.scss";
import ImgAvatar from "/src/assets/img_avatar.png";
import { useNavigate } from "react-router-dom";
import PostActionMenu from "../PostActionMenu/PostActionMenu";
import moment from "moment";
import { useAuth } from "../../../hooks/auth/useAuth";
import DefualtPostImg from "/src/assets/default_image.png";
type PostItemProps = {
    postData: PostType
};

export default function PostCard({ postData }: PostItemProps) {
    const navigate = useNavigate();
    const { currentUserData } = useAuth();

    return (
        <div className="post-card-container">
            <div className="post-card-header">
                <div className="info-section">
                    <img src={postData.author?.photoURL || ImgAvatar} className="avatar-45" />
                    <div className="info">
                        <h2>{postData.author.name}</h2>
                        {postData.isEdited ? (
                            <p>
                                <span>(Edited)</span> {moment(postData.updatedAt.toDate()).fromNow()}
                            </p>
                        ) : (
                            <p>{moment(postData.createdAt.toDate()).fromNow()}</p>
                        )}
                    </div>
                </div>
                <div className="menu-section">{currentUserData?.uid === postData.author.id && <PostActionMenu postData={postData} />}</div>
            </div>
            <hr />

            <div className="post-card-body">
                <p>{postData.content}</p>
                <img src={postData.photo || DefualtPostImg} />
                <h2>{postData.title}</h2>
                <button className="btn-primary" onClick={() => navigate(`/post-details/${postData.id}/${postData.title}`)}>
                    Read More
                </button>
            </div>
        </div>
    );
}
