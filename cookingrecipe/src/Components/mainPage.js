import React from "react";
import "../css/main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBar from "./navBar";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function MainPage() {
  const id = localStorage.getItem("currentUserId").toString();
  const search = <FontAwesomeIcon className="search" icon={faArrowRight} />;
  const [active, setActive] = React.useState(false);
  const [activecheck, setActiveCheck] = React.useState(true);
  const [records, setRecords] = React.useState([]);
  const [data, setData] = React.useState();
  let check = false;
  const [form, setForm] = React.useState({
    searchItem: "",
    searchKey: "Food",
  });

  const [printdata, setprintdata] = React.useState(<p></p>);

  React.useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/recipeRecord/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return;
  }, [records.length]);
  console.log(records);
  function handleChange(event) {
    setActive(false);
    setData(undefined);
    const { name, value, type, checked } = event.target;
    setForm((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function handleSearch() {
    setActiveCheck(false);
    setActive(true);
    if (form.searchKey === "Food") {
      records.map((x) => {
        if (x.name.toLowerCase() === form.searchItem.toLowerCase()) {
          if (!check) {
            setData([x]);
            check = true;
          } else setData((pre) => [...pre, x]);
        }
      });
    }
    if (form.searchKey === "Ingredient") {
      records.map((x) => {
        x.ingredients.map((ingredient) => {
          if (ingredient.toLowerCase() === form.searchItem.toLowerCase()) {
            if (!check) {
              setData([x]);
              check = true;
            } else setData((pre) => [...pre, x]);
          }
        });
      });
    }
  }
  React.useEffect(() => {
    if (data) {
      setprintdata(
        data.map((food, index) => {
          return (
            <>
              <div key={food._id} className="searchViewCont">
                <h2 className="searchResultHead">
                  {index + 1}. {food.name}
                </h2>
                <Link to={`/findrecipe/${id}/${food._id}`}>
                  <p className="recipeLink">{search}View Recipe</p>
                </Link>
              </div>
              <br />
              <p className="searchResultdesc">{food.description}</p>
              <br />
            </>
          );
        })
      );
    } else if (!data) {
      setprintdata(<h2 className="searchResultHead">Not Found</h2>);
    }
  }, [data]);
  console.log(form);
  return (
    <div id="pg-two" className="signpage">
      <NavBar props={1} />
      <div className="searchCont">
        <div className="searchBarCont">
          <input
            placeholder="What's on your mind, chef?"
            type={"text"}
            className="searchBar"
            name="searchItem"
            value={form.searchItem}
            onChange={handleChange}
          />
          <span className="searchbg" onClick={handleSearch}>
            {" "}
            GO
          </span>
        </div>
        <br />
        <span className="searchFilter">
          Search By:
          <input
            type="radio"
            name="searchKey"
            onChange={handleChange}
            value="Food"
            id="food"
            checked
          />
          <label htmlFor="food">Food</label>
          <input
            type="radio"
            name="searchKey"
            value="Ingredient"
            id="Ingredient"
            onChange={handleChange}
          />
          <label htmlFor="Ingredient">Ingredient</label>
          <br />
        </span>
        <br />

        {active && <div className="searchResult">{printdata}</div>}
      </div>
    </div>
  );
}
