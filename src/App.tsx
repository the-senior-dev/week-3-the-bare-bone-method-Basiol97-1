import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./views/MainPage";
import MoviePage from "./views/MoviePage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { DarkModeContext, Theme, themeList, ThemeName } from "./store/context";
import AppContainer from "./components/styled/AppContainer";

export default function App() {
  const [activeTheme, setActiveTheme] = useState(themeList.light);

  return (
    <DarkModeContext.Provider
      value={{
        theme: activeTheme,
        setTheme: (themeKey: ThemeName) => {
          setActiveTheme(themeList[themeKey] as Theme);
        },
      }}
    >
      <AppContainer>
        <Header></Header>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/movie/:id" element={<MoviePage />}></Route>
          </Routes>
        </Router>
        <Footer></Footer>
      </AppContainer>
    </DarkModeContext.Provider>
  );
}
