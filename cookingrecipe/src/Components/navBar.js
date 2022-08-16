import React from "react";
import "../css/nav.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function NavBar({ props }) {
  const cutlery = <FontAwesomeIcon className="gold" icon={faUtensils} />;
  const signin = <FontAwesomeIcon className="black" icon={faSignIn} />;
  const addRecipe = <FontAwesomeIcon className="black" icon={faBook} />;
  const left = <FontAwesomeIcon className="black" icon={faArrowLeft} />;
  function handleSignOut() {
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("currentUserName");
  }
  function reloadPage() {
    window.location.reload();
  }
  if (props === 1)
    return (
      <div className="navCont">
        <nav>
          <span className="left">
            <ul className="heading"> {cutlery}RecipeBook</ul>
          </span>
          <span className="right">
            <Link
              to={`/myrecipes/${localStorage
                .getItem("currentUserId")
                .toString()}`}
            >
              <ul className="navelements">{addRecipe}Your Recipes</ul>
            </Link>
            <Link to={"/signin"}>
              {" "}
              <ul className="navelements" onClick={handleSignOut}>
                {signin}Sign Out
              </ul>
            </Link>
          </span>
        </nav>
      </div>
    );
  if (props === 4)
    return (
      <div className="navCont">
        <nav>
          <span className="left">
            <span onClick={reloadPage}>{left}</span>
            <ul className="heading"> {cutlery}RecipeBook</ul>
          </span>
          <span className="right">
            <Link
              to={`/userHome/${localStorage
                .getItem("currentUserId")
                .toString()}`}
            >
              <ul className="navelements">{left}Dashboard</ul>
            </Link>
            <Link to={"/signin"}>
              {" "}
              <ul className="navelements" onClick={handleSignOut}>
                {signin}Sign Out
              </ul>
            </Link>
          </span>
        </nav>
      </div>
    );
  if (props === 3)
    return (
      <div className="navCont">
        <nav>
          <span className="left">
            <Link
              to={`/userHome/${localStorage
                .getItem("currentUserId")
                .toString()}`}
            >
              {left}
            </Link>
            <ul className="heading"> {cutlery}RecipeBook</ul>
          </span>
          <span className="right">
            <Link
              to={`/myrecipes/${localStorage
                .getItem("currentUserId")
                .toString()}`}
            >
              <ul className="navelements">{addRecipe}Your Recipes</ul>
            </Link>
            <Link to={"/signin"}>
              {" "}
              <ul className="navelements" onClick={handleSignOut}>
                {signin}Sign Out
              </ul>
            </Link>
          </span>
        </nav>
      </div>
    );
  if (props === 2)
    return (
      <div className="navCont">
        <nav>
          <span className="left">
            <ul className="heading">{cutlery}RecipeBook</ul>
          </span>
          <span className="right"></span>
        </nav>
      </div>
    );
}
