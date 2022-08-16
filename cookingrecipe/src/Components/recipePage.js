import React from "react";
import "../css/Recipe.css";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./navBar";

export default function RecipePage() {
  const [records, setRecords] = React.useState({
    name: "",
    steps: [],
    ingredients: [],
  });
  const [active, setActive] = React.useState(false);

  const params = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    async function fetchData() {
      const id = params.recipeid.toString();
      const response = await fetch(
        `http://localhost:5000/recipeRecord/${params.recipeid.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setRecords(record);
    }
    setActive(true);
    fetchData();

    return;
  }, [params.recipeid, navigate]);

  console.log(records);
  return (
    <div id="pg-two" className="signpage">
      <NavBar props={3} />
      <div className="displayRecipe">
        <h2 className="recipeHeading">{records.name}</h2>
        <span className="recipeDesc">
          <h4>{records.description}</h4>

          <img
            src={records.image}
            className="recipeImage"
            width={"475px"}
            height={"350px"}
            alt="No Image"
          />
        </span>
        <br />
        <br />
        <hr />
        <br />

        <h4 className="recipeIngHead">Ingredients</h4>
        {active && (
          <span className="recipeIngItems">
            {records.ingredients.map((item, index) => {
              return (
                <ul key={item}>
                  {index + 1}. {item}
                </ul>
              );
            })}
          </span>
        )}
        <br />
        <br />
        <hr />
        <br />
        <h4 className="recipestepHead">Steps</h4>
        {active && (
          <span className="recipestepItems">
            {records.steps.map((item, index) => {
              return (
                <ul key={item}>
                  {index + 1}. {item}
                </ul>
              );
            })}
          </span>
        )}
        <br />
        <hr />
      </div>
    </div>
  );
}
