import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "./views/MainPage";
import MoviePage from "./views/MoviePage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { DarkModeProvider } from "./store/context";
import AppContainer from "./components/styled/AppContainer";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <DarkModeProvider>
      <AppContainer>
        <Router>
          <Header></Header>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/movie/:id" element={<MoviePage />}></Route>
          </Routes>
          <ScrollToTop />
        </Router>
        <Footer></Footer>
      </AppContainer>
    </DarkModeProvider>
  );
}
