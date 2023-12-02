import "./PostDetailsPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import ImgAvatar from "/src/assets/img_avatar.png";
import moment from "moment";
import { useGetPost } from "../../hooks/post/postQueries";
import Spiner from "../../components/Spiner/Spiner";
import DefualtPostImg from "/src/assets/default_image.png";
import { Toast } from "../../Swal/Mixins";

export default function PostDetailsPage() {
    const { postId } = useParams();
    const { data: post, isLoading, isError } = useGetPost(postId || "");
    const navigate = useNavigate()
    scrollTo(0, 0);
    if (isError) {
        
        Toast.fire({
            title: "Post Not Found",
            icon: "error",
            timer:4000
        });
        navigate('/')
    }
    if (isLoading || !post) {
        return (
            <main style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Spiner />
            </main>
        );
    }

    return (
        <>
            <main className="post-details-container">
                <div className="post-info">
                    <h2>
                        <img src="" alt="" />
                    </h2>
                    <img src={post?.author?.photoURL || ImgAvatar} alt="profile image" className="avatar-60" />
                    <div>
                        <h2>{post?.author.name}</h2>
                        {post?.isEdited ? (
                            <p>
                                {moment(post?.updatedAt.toDate()).fromNow()} <b>Edited</b>
                            </p>
                        ) : (
                            <p>{moment(post?.createdAt.toDate()).fromNow()}</p>
                        )}
                    </div>
                </div>
                <h1>{post?.title}</h1>
                <img src={post?.photo || DefualtPostImg} alt="" className="post-img" />
                <p>{post?.content}</p>
            </main>
        </>
    );
}
