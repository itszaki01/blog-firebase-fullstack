import { PostType } from "../types/Post.type";

export const postsData: PostType[] = [
    {
        id: "1",
        title: "Dummy Title",
        content:
            "This is dummy post content This is dummy post content This is dummy post contentThis is dummy post content This is dummy post contentThis is dummy post contentThis is dummy post contentThis is dummy post content",
        photo: "https://fancycrave.com/wp-content/uploads/2020/10/time1-1024x684.jpg",
        author: {
            id: "3241dsb",
            name: "user",
            photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyGNr2qL63Sfugk2Z1-KBEwMGOfycBribew&usqp=CAU",
        },
        createdAt: "10 days ago",
        updatedAt: "2 minutes ago",
        isEdited: true,
    },
    {
        id: "2",
        title: "Dummy Title",
        content: "This is dummy post content",
        photo: "https://designingidea.com/wp-content/uploads/2021/11/beige-sofa-in-cosy-living-room-interior-with-gold-paintings-on-green-wall-with-black-stool-at-desk-is.jpg",
        author: {
            id: "5241dsb",
            name: "user2",
            photoURL: "",
        },
        createdAt: "an hour ago",
        updatedAt: "an hour ago",
        isEdited: false,
    },
    {
        id: "3",
        title: "Dummy Title",
        content: "This is dummy post content",
        photo: "https://fancycrave.com/wp-content/uploads/2020/10/time1-1024x684.jpg",
        author: {
            id: "3241dsb",
            name: "user",
            photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyGNr2qL63Sfugk2Z1-KBEwMGOfycBribew&usqp=CAU",
        },
        createdAt: "3 days ago",
        updatedAt: "3 days ago",
        isEdited: false,
    },
];
