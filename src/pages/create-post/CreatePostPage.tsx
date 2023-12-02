import React from "react";
import "./CreatePostPage.scss";
import DefaultPostImg from "../../assets/default_image.png";
import { useForm } from "react-hook-form";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/firebase.config";
import { useAuth } from "../../hooks/auth/useAuth";
import Spiner from "../../components/Spiner/Spiner";
import { PostType } from "../../../types/Post.type";
import { serverTimestamp } from "firebase/firestore";
import { useCreatePost } from "/src/hooks/post/postMutations";
type Inputs = {
    title: string;
    content: string;
    image: HTMLInputElement;
};
export default function CreatePostPage() {
    //UploadStatus
    const [isUploading, setIsUploading] = React.useState<boolean>(false);

    //PhotoUrl
    const [photoUrl, setPhotoUrl] = React.useState<string>("");

    //UseFrom
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        formState: { isValid },
    } = useForm<Inputs>({
        mode: "onChange",
    });

    //UserAuth Data
    const { currentUserData } = useAuth();

    async function uploadPhoto(photo:File) {
        const storageRef = ref(storage, `posts/${currentUserData?.displayName}/${Date.now() + photo.name}`);
        const uploadTask = uploadBytesResumable(storageRef, photo);
        //Upload Status
        uploadTask.on(
            "state_changed",
            //On Uploading
            () => {
                setIsUploading(true);
            },
            //On Error Upload
            (error) => {
                setIsUploading(false);
                const _error = error as { message: string };
                throw Error("Upload Error: " + _error.message);
            },
            // On Succes Upload
            async () => {
                setIsUploading(false);
                const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                setPhotoUrl(downloadUrl);
            }
        );
    }

    //The Mutate Function
    const { mutateAsync } = useCreatePost();
    //FormSumbit
    function Submit(data:PostType) {
        const postData: PostType = {
            ...data,
            photo: photoUrl,
            author: {
                id: currentUserData?.uid,
                name: currentUserData?.displayName,
                photoURL: currentUserData?.photoURL,
            },
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            isEdited: false,
        };
        mutateAsync(postData)
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

                <img src={photoUrl || DefaultPostImg} alt="" width={"50%"} />
                <div className="select-img-section">
                    <label>Select Image: </label>
                    <input type="file" accept="image/*" {...register("photo")} onChange={(e) => uploadPhoto(e.target.files[0])} />
                    {isUploading && <Spiner />}
                </div>
                <button type="submit" className="btn-primary" disabled={!isValid}>
                    Create Post
                </button>
            </form>
        </main>
    );
}
