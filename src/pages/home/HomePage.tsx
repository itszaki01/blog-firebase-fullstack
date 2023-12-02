import NoPostsYet from "../../components/NoPostsYet/NoPostsYet";
import NewPostBtn from "../../components/Post-Components/NewPostBtn/NewPostBtn";
import PostsList from "../../components/Post-Components/PostsList/PostsList";
import Spiner from "../../components/Spiner/Spiner";
import { useAuthContext } from "../../contexts/AuthContext";
import { useAllPosts } from "../../hooks/post/postQueries";
import "./HomePage.scss";
export default function HomePage() {
    const { data, isLoading } = useAllPosts();
    const { isAuth } = useAuthContext();
    if (isLoading) {
        return (
            <main style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Spiner />
            </main>
        );
    } else {
        if (data) {
            return (
                <main>
                    {data?.length >= 1 ? (
                        <>
                            {isAuth && <NewPostBtn />} <PostsList data={data} />
                        </>
                    ) : (
                        <NoPostsYet />
                    )}
                </main>
            );
        } else {
            return (
                <main>
                    <NoPostsYet />
                </main>
            );
        }
    }
}
