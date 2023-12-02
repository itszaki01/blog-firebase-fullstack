import { Timestamp } from "firebase/firestore";

export type PostType = {
    id: string;
    title: string;
    content: string;
    photo: string;
    author: {
        id: string;
        name: string;
        photoURL: string;
    };
    createdAt: Timestamp;
    updatedAt: Timestamp;
    isEdited: boolean;
};
