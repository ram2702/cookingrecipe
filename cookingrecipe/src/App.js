import React from "react";
import SignUp from "./Components/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./css/signupStyle.css";
import NavBar from "./Components/navBar";
import MainPage from "./Components/mainPage";
import RecipePage from "./Components/recipePage";
import MyRecipes from "./Components/myRecipes";
console.log(document.all);

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route index element={<SignUp />} />
        <Route path="/signin" element={<SignUp props={false} />} />
        <Route path="/userHome/:id" element={<MainPage />} />
        <Route path="/findrecipe/:id/:recipeid" element={<RecipePage />} />
        <Route path="/myrecipes/:id" element={<MyRecipes />} />
      </Routes>
    </BrowserRouter>
  );
}
