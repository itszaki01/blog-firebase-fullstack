import "./PostsList.scss";
import PostCard from "../PostCard/PostCard";
import { PostType } from "../../../types/Post.type";

export default function PostsList({data}:{data:PostType[]}) {

    return (
        <div className="posts-list-container">
            {data?.map((post, idx) => {
                return <PostCard key={idx} postData={post} />;
            })}
        </div>
    );
}
