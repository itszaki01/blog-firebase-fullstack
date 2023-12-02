import ImgAvatar from "/src/assets/img_avatar.png";

import "./ProfilePage.scss";
import NewPostBtn from "../../components/Post-Components/NewPostBtn/NewPostBtn";
import { useAuth } from "../../hooks/auth/useAuth";
import PostsList from "../../components/Post-Components/PostsList/PostsList";
import { useGetRelatedPosts } from "../../hooks/post/postQueries";
import Spiner from "../../components/Spiner/Spiner";
export default function ProfilePage() {
    const { currentUserData } = useAuth();

    
    const { data, isLoading } = useGetRelatedPosts();
    if (isLoading) {
        return (
            <main style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Spiner />
            </main>
        );
    }
    return (
        <main className="pofile-page-container">
            <form className="profile-info-card">
                <img src={currentUserData?.photoURL || ImgAvatar} alt="" />

                <div className="info-section">
                    <h3>Username:</h3>
                    <h4>@{currentUserData?.displayName}</h4>
                </div>

                <div className="info-section">
                    <h3>Email:</h3>
                    <h4>{currentUserData?.email}</h4>
                </div>
            </form>
            <h1>My Posts</h1>
            <NewPostBtn />
            <PostsList data={data!} />
        </main>
    );
}
