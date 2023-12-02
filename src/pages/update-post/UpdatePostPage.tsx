import React, { useEffect } from "react";
import DefaultPostImg from "../../assets/default_image.png";
import Spiner from "../../components/Spiner/Spiner";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAllPosts } from "../../hooks/post/postQueries";
import { useUpdatePost } from "../../hooks/post/postMutations";
import { PostType } from "../../types/Post.type";
import { serverTimestamp } from "firebase/firestore";

type Inputs = {
    title: string;
    content: string;
    image: HTMLInputElement;
};
export default function UpdatePostPage() {
    //Get Post
    const { data, isLoading } = useAllPosts();
    const { postId } = useParams();
    const [post] = data ? data.filter((post) => post.id === postId) : [];
    const { mutateAsync } = useUpdatePost();

    //Hook From
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<Inputs>({
        mode: "onChange",
    });

    useEffect(() => {
        if (!isLoading) {
            setValue("title", post.title);
            setValue("content", post.content);
            setValue("image", post.photo);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    if (isLoading) {
        return (
            <main style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Spiner />
            </main>
        );
    }

    function Submit(data: PostType) {
        mutateAsync({
            ...post,
            title: data.title,
            content: data.content,
            isEdited: true,
            updatedAt: serverTimestamp(),
        });
    }

    return (
        <main className="create-post-container">
            <form className="create-post-inputs" onSubmit={handleSubmit(Submit)}>
                <input
                    type="text"
                    placeholder="Title"
                    {...register("title", {
                        minLength: {
                            value: 15,
                            message: "Please provide a title with more than 15 character",
                        },
                        required: "Title is Required",
                    })}
                />
                <span style={{ color: "red" }}>{errors.title?.message}</span>
                <textarea
                    placeholder="Write Content"
                    {...register("content", {
                        required: "Content is Required",
                    })}
                ></textarea>
                <span style={{ color: "red" }}>{errors.content?.message}</span>

                <img src={watch("image") || DefaultPostImg} alt="" width={"50%"} />
                <button type="submit" className="btn-primary">
                    Update Post
                </button>
            </form>
        </main>
    );
}
