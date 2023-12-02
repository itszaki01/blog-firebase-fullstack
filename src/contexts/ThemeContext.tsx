import { ReactNode, SetStateAction, createContext, useContext, useState } from "react";

type themeType = "default-theme" | "dark-theme";

type ThemeContextType = {
    theme: themeType;
    setTheme: React.Dispatch<SetStateAction<themeType>>;
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export default function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<themeType>("default-theme");

    document.body.className = theme
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
