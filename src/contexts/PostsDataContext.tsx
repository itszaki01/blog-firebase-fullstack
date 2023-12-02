import { ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { PostType } from "../types/Post.type";
import { postsData as postsDataMock } from "../data/postsData";
import { useTheme } from "./ThemeContext";
import Swal from "sweetalert2";

type PostsDataContext = {
    postsData:PostType[],
    setPostsData:React.Dispatch<SetStateAction<PostType[]>>,
    handleDeletPostClick():void
}
const PostsDataContext = createContext<PostsDataContext>({} as PostsDataContext)

export default function PostsDataProvider({children}:{children:ReactNode}) {
    const [postsData,setPostsData] = useState<PostType[]>(postsDataMock)
    const style = getComputedStyle(document.body);
    const { theme } = useTheme();
    const [primaryColor, setPrimaryColor] = useState<string>(style.getPropertyValue("--theme-primary"));

    useEffect(() => {
        setPrimaryColor(style.getPropertyValue("--theme-primary"));        
    }, [theme]);

    function handleDeletPostClick() {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: primaryColor,
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        });
    }
    

  return (
    <PostsDataContext.Provider value={{postsData,setPostsData,handleDeletPostClick}}>
        {children}
    </PostsDataContext.Provider>
  )
}


// eslint-disable-next-line react-refresh/only-export-components
export const usePostsData = ()=> useContext(PostsDataContext)