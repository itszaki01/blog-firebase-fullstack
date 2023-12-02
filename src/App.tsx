import "./App.scss";
import ThemeProvider from "./contexts/ThemeContext";
import PostsDataProvider from "./contexts/PostsDataContext";
import AppRouters from "./routes/AppRouters";
import { AuthContextPorvider } from "./contexts/AuthContext";

function App() {

    return (
        <>
            <ThemeProvider>
                <AuthContextPorvider>
                    <PostsDataProvider>
                        <AppRouters />
                    </PostsDataProvider>
                </AuthContextPorvider>
            </ThemeProvider>
        </>
    );
}

export default App;
