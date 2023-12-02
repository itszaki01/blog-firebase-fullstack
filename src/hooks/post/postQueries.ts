import { useQuery } from "@tanstack/react-query";
import { PostsApiCall } from "../../api/PostsApiCalls";
import { useAuth } from "../auth/useAuth";

//GET ALL POSTS
export function useAllPosts() {
    return useQuery({
        queryKey: ["post"],
        queryFn: () => PostsApiCall.getAllPosts(),
    });
}

// GET SINGLE POST
export function useGetPost(id: string) {
    return useQuery({
        queryKey: ["getPost", id],
        queryFn: () => PostsApiCall.getPost(id),
    });
}

//GET POST RELATED TO USER
export function useGetRelatedPosts() {
    const { currentUserData } = useAuth();    
    
    return useQuery({
        queryKey: ["GetRelatedPosts", currentUserData?.displayName],
        queryFn: () => PostsApiCall.getRelatedPosts(currentUserData?.uid),
    });
}
