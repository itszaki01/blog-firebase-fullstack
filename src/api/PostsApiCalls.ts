import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db, storage } from "../firebase/firebase.config";
import { PostType } from "../types/Post.type";
import { deleteObject, ref } from "firebase/storage";
class PostsApiCalls {
    async getAllPosts() {
        try {
            // 1: Select The Collection To Fetch
            const postCollection = collection(db, "posts");

            // 2: Get Docs And Sort Them by Date With Query Function
            // des من الأحدث إلى الأقدم
            // asc من الأقدم إلى الأحدث
            // query(postCollection,orderBy('updatedAt','desc'))
            const { docs } = await getDocs(query(postCollection, orderBy("updatedAt", "desc")));

            // 3: Save Fetched Data to Varible
            const posts = docs.map((doc) => ({ ...doc.data(), id: doc.id } as PostType));
            return posts;
        } catch (error) {
            console.log(error);
            const _error = error as { message: string };
            throw Error("Get Posts Error: " + _error.message);
        }
    }

    //Create Post
    async createPost(postData: PostType) {
        const postCollectionRef = collection(db, "posts");
        return await addDoc(postCollectionRef, postData);
    }

    //Delete Post
    async deletePost(postData: PostType) {
        const docRef = doc(db, "posts", postData.id);
        const postPhotoRef = ref(storage, postData.photo);
        try {
            await deleteObject(postPhotoRef);
            await deleteDoc(docRef);
        } catch (error) {
            console.log(error);
            const _error = error as { message: string };
            throw Error("Delete Error: " + _error.message);
        }
    }

    // Get Post By ID
    async getPost(id: string): Promise<PostType | void> {
        try {
            const postRef = doc(db, "posts", id);
            const postData = await getDoc(postRef);
            const post = postData.data(); // Function Should Be Called With the Parent Object
            return post as PostType;
        } catch (error) {
            console.log(error);
        }
    }

    //Update Post
    async updatePost(updatedPost: PostType) {
        const postRef = doc(db, "posts", updatedPost.id);
        try {
            await updateDoc(postRef, updatedPost);
        } catch (error) {
            console.log(error);
            const _error = error as { message: string };
            throw Error("Update Error: " + _error.message);
        }
    }

    //Get Related Posts
    async getRelatedPosts(UserId: string) {
        try {
            const q = query(collection(db, "posts"), where("author.id", "==", UserId), orderBy("updatedAt", "desc"));
            const { docs } = await getDocs(q);
            const relatedPost = docs.map((doc) => doc.data() as PostType);
            return relatedPost;
        } catch (error) {
            const _error = error as { message: string };
            console.log(error);
            throw Error("Related Posts: " + _error.message);
            
        }
    }
}

export const PostsApiCall = new PostsApiCalls();
