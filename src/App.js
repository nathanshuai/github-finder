import Search from "./components/Search";
import User from "./pages/User";
import './style/index.css'
import { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  useEffect(() => {
    const body = document.querySelector("body");
    if (location.pathname === "/") {
      body.classList.add("search-page");
    } else {
      body.classList.remove("search-page");
    }
  }, [location.pathname]);

  return (
    <>
      <main>
        <Routes>
          <Route exact path="/" element={<Search  />}/>
          <Route exact path="/user/:username" element={<User />}/>
        </Routes>
      </main>
    </>  
  );
}

export default App;
