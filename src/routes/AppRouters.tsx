import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutDefault from "../layouts/LayoutDefault/LayoutDefault";
import HomePage from "../pages/home/HomePage";
import PostDetailsPage from "../pages/post-details/PostDetailsPage";
import ProfilePage from "../pages/profile/ProfilePage";
import LoginPage from "../pages/login/LoginPage";
import SignUpPage from "../pages/signup/SignUpPage";
import ResetPasswordPage from "../pages/reset-password/ResetPasswordPage";
import ErrorPage from "../pages/error/ErrorPage";
import UpdatePostPage from "../pages/update-post/UpdatePostPage";
import CreatePostPage from "../pages/create-post/CreatePostPage";
import ProtectedRoutesLayout from "../layouts/ProtectedRoutes/ProtectedRoutesLayout";
import ProtectedRoutesAuthTrue from "../layouts/ProtectedRoutes/ProtectedRoutesAuthTrue";
export default function AppRouters() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayoutDefault />}>
                    <Route index element={<HomePage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/post-details/:postId/:postTitle" element={<PostDetailsPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Route>

                {/* PROTECTED ROUTES isAuth == true */}
                <Route element={<ProtectedRoutesAuthTrue/>}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                </Route>

                {/* PROTECTED ROUTES isAuth == false */}
                <Route element={<ProtectedRoutesLayout/>}>
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/update-post/:postId" element={<UpdatePostPage />} />
                    <Route path="/create-post" element={<CreatePostPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
