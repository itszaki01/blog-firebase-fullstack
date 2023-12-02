import { SignInTypes, SignUPInputsTypes } from "../types/AuthInputs.type";
import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth, db, provider, storage } from "../firebase/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getError } from "../utils/firebaseErrors";

class FBaseAuthCalls {
    async signUpUser(inputsData: SignUPInputsTypes) {
        // Destruct Data Geted From mutateFunction
        const email = inputsData.email;
        const username = inputsData.username;
        const password = inputsData.password;
        const image = inputsData.image[0];

        try {
            // 1: Register User To Db
            const { user } = await createUserWithEmailAndPassword(auth, email, password);

            // 2: Select the userRef from db
            const userRef = doc(db, "users", user.uid);

            //3: Check If Image Attached
            if (typeof image === "object") {
                //1: Define The Storage Function
                const storageRef = ref(storage, `users/${username}/${Date.now() + image.name}`);

                //2: Upload The Image to the Storage
                const uploadTask = uploadBytesResumable(storageRef, image);

                //Upload Status
                uploadTask.on(
                    "state_changed",
                    //On Uploading
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log("Upload is " + progress + "% done");
                        switch (snapshot.state) {
                            case "paused":
                                console.log("Upload is paused");
                                break;
                            case "running":
                                console.log("Upload is running");
                                break;
                        }
                    },
                    //On Error Upload
                    (error) => {
                        const _error = error as { message: string };
                        throw Error("Upload Error: " + _error.message);
                    },
                    // On Succes Upload
                    async () => {
                        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

                        //1: Update Profile
                        await updateProfile(user, {
                            displayName: username,
                            photoURL: downloadUrl,
                        });

                        //2: Save Profile To db
                        await setDoc(userRef, {
                            uid: user.uid,
                            email,
                            displayName: username,
                            photoUrl: downloadUrl,
                        });
                    }
                );
            } else {
                // Else If No Image Provided

                //Update Profile With Username And Defuilt Image
                await updateProfile(user, {
                    displayName: username,
                    photoURL:
                        "https://firebasestorage.googleapis.com/v0/b/blog-app-projec.appspot.com/o/images%2Fimg_avatar.png?alt=media&token=73f92c71-93e0-482f-b2cd-fa6bdfa6bd68",
                });

                //2: Save Profile To Db
                await setDoc(userRef, {
                    uid: user.uid,
                    email,
                    displayName: username,
                    photoURL:
                        "https://firebasestorage.googleapis.com/v0/b/blog-app-projec.appspot.com/o/images%2Fimg_avatar.png?alt=media&token=73f92c71-93e0-482f-b2cd-fa6bdfa6bd68",
                });
            }
        } catch (error) {
            const _error = error as { message: string };
            throw Error(getError(_error.message));
        }
    }

    //Sign In Mthod
    async signInUser({ email, password }: SignInTypes) {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            const _error = error as { message: string };
            throw Error(getError(_error.message));
        }
    }

    //Sign Out Method
    async signOutUser() {
        await signOut(auth);
    }

    //SignIn With Google

    async signInWithGoogle() {
        await signInWithPopup(auth, provider);
    }

    //Reset Passwrod
    async resetPasswordEmail(userEmail: string) {
        try {
            await sendPasswordResetEmail(auth, userEmail);
        } catch (error) {
            const _error = error as { message: string };            
            throw Error(getError(_error.message));
        }
    }
}

export const FBaseAuthCall = new FBaseAuthCalls();
