import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();
const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState("dark");

    useEffect(()=>{
        if(theme === "dark"){
            document.documentElement.classList.add("dark");
        }
        else{
            document.documentElement.classList.remove("dark");
        }
    },[theme]);
    const toggleTheme =()=>{
        setTheme(theme === "light" ? "dark" : "light");
    }
    const themeInfo = {
        theme,
        toggleTheme
    }
    return (
        <ThemeContext.Provider  value={themeInfo}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;