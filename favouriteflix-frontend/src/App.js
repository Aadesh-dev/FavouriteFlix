import React, { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import PageNotFound from "./components/PageNotFound";
import ListWrapper from "./components/ListWrapper";

export const UserContext = createContext();

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    !!localStorage.getItem("token"),
  );
  const [isSignPage, setIsSignPage] = useState(false);
  const [is404, setIs404] = useState(false);
  const [movies, setMovies] = useState([]);

  return (
    <UserContext.Provider value={isUserLoggedIn}>
      <div className={`App d-flex flex-column ${isSignPage ? "showBg" : ""}`}>
        <Header
          isUserLoggedIn={isUserLoggedIn}
          setIsUserLoggedIn={setIsUserLoggedIn}
          isSignPage={isSignPage}
          is404={is404}
          setMovies={setMovies}
        />
        <main>
          <Routes>
            <Route
              exact
              path={"/"}
              element={
                isUserLoggedIn ? (
                  <ListWrapper
                    movies={movies}
                  />
                ) : (
                  <SignIn
                    setIsUserLoggedIn={setIsUserLoggedIn}
                    isUserLoggedIn={isUserLoggedIn}
                    setIsSignPage={setIsSignPage}
                  />
                )
              }
            />
            <Route
              path={"/home"}
              element={
                <ListWrapper
                  movies={movies}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <SignIn
                  setIsUserLoggedIn={setIsUserLoggedIn}
                  isUserLoggedIn={isUserLoggedIn}
                  setIsSignPage={setIsSignPage}
                />
              }
            />
            <Route
              path="/signup"
              element={<SignUp setIsSignPage={setIsSignPage} />}
            />
            <Route path="*" element={<PageNotFound setIs404={setIs404} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
