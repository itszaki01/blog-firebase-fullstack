import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostType } from "../../types/Post.type";
import { PostsApiCall } from "../../api/PostsApiCalls";
import { Toast } from "../../Swal/Mixins";
import { useNavigate } from "react-router-dom";

//Create Post
export function useCreatePost() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (postData: PostType) => PostsApiCall.createPost(postData),
        onSuccess: () => {
            Toast.fire({
                title: "Post Create Successfuly",
                icon: "success",
            });
            navigate("/");
        },
        onError: (error) => {
            console.log(error.message);
        },
    });
}

//Update Post
export function useUpdatePost() {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: (updatedPost: PostType) => PostsApiCall.updatePost(updatedPost),
        onSuccess: () => {
            Toast.fire({
                title: "Post Update Successfuly",
                icon: "success",
            });
            navigate('/')
        },
        onError: (err) => {
            Toast.fire({
                title: err.message,
                icon: "error",
            });
        },
    });
}
//Delete Post

export function useDeletePost(postsData: PostType) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => PostsApiCall.deletePost(postsData),
        onSuccess: () => {
            Toast.fire({ title: "Post Delete Successfuly", icon: "success" });
            //Refetch All Posts & invalid Query After Succes Delete
            queryClient.invalidateQueries({queryKey:['post']})
        },
        onError: (err) => {
            Toast.fire({
                title: "Delete Error" + err.message,
                icon: "error",
            });
        },
    });
}
