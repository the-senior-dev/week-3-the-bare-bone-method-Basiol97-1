import React, { useContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./views/MainPage";
import MoviePage from "./views/MoviePage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import { DarkModeContext } from "./store/context";

export default function App() {
  const { theme } = useContext(DarkModeContext);
  console.log('theme', theme);

  return (
    <ThemeProvider theme={theme}>
    <AppContainer>
      <Router>
          <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/movie/:id" element={<MoviePage />}></Route>
        </Routes>
        <ScrollToTop />
      </Router>
        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
}

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
	background-color: ${({ theme }) => theme.background};
  position: relative;
`;
