import React from "react";
import NavBar from "./navBar";
import "../css/myRecipes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function MyRecipes() {
  let author = localStorage.getItem("currentUserName").toString();
  console.log(author);
  const plus = <FontAwesomeIcon className="search" icon={faPlus} />;
  const edit = <FontAwesomeIcon className="search" icon={faEdit} />;
  const deleteItem = <FontAwesomeIcon className="search" icon={faTrashCan} />;
  const [records, setRecords] = React.useState([
    {
      name: "",
      steps: [],
      ingredients: [],
    },
  ]);
  const [newrecords, setNewRecords] = React.useState({
    name: "",
    description: "",
    image: "",
    steps: [],
    ingredients: [],
    author: localStorage.getItem("currentUserName").toString(),
    _id: undefined,
  });
  const [active, setActive] = React.useState(false);
  const [formVis, setFormVis] = React.useState(false);
  const [ingredients, setIngredients] = React.useState([]);
  const [steps, setStep] = React.useState([]);
  const params = useParams();
  const navigate = useNavigate();
  let ingredientsArr;
  function addIngs(e) {
    e.preventDefault();
    setIngredients((pre) => [""]);
  }
  function addSteps(e) {
    e.preventDefault();
    setStep((pre) => [""]);
  }

  function handleRecipeChange(event) {
    setIngredients((pre) => [event.target.value]);
  }
  function handleStepChange(event) {
    setStep((pre) => [event.target.value]);
  }

  function handleChange(event) {
    setNewRecords((prevForm) => {
      return {
        ...prevForm,
        [event.target.name]: event.target.value,
      };
    });
  }

  function ingSubmit(e) {
    e.preventDefault();
    let temp = newrecords.ingredients;
    temp.push(ingredients[ingredients.length - 1]);
    setNewRecords((pre) => ({ ...pre, ingredients: [...temp] }));
    console.log(newrecords, ingredients);
  }

  function stepSubmit(e) {
    e.preventDefault();
    let temp = newrecords.steps;
    temp.push(steps[steps.length - 1]);
    setNewRecords((pre) => ({ ...pre, steps: [...temp] }));
    console.log(newrecords, steps);
  }

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:5000/recipesRecord/${author}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record not found`);
        navigate("/");
        return;
      }

      setRecords(record);
    }
    setActive(true);
    fetchData();

    return;
  }, []);

  function displayForm(event) {
    records.map((x) => {
      if (x._id === event.target.id) {
        setNewRecords(x);
      }
    });
    setFormVis(true);
  }

  async function deleteRecord(event) {
    await fetch(`http://localhost:5000/${event.target.id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== event.target.id);
    setRecords(newRecords);
    window.location.reload();
  }

  console.log(records);
  async function onSubmit(e) {
    e.preventDefault();
    console.log(newrecords);
    const newrecipe = { ...newrecords };
    if (newrecords._id === undefined) {
      await fetch("http://localhost:5000/reciperecord/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newrecipe),
      }).catch((error) => {
        window.alert(error);
        return;
      });
      window.location.reload();
    } else if (newrecords._id !== undefined) {
      await fetch(`http://localhost:5000/recipeupdate/${newrecords._id}`, {
        method: "POST",
        body: JSON.stringify(newrecipe),
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location.reload();
    }
  }

  return (
    <div id="pg-two" className="signpage">
      <NavBar props={4} />
      <div className="yourRecipes">
        {!formVis && (
          <>
            <button className="yourAddButton" onClick={displayForm}>
              {plus} Add Recipe
            </button>
            <br />
            <br />
          </>
        )}

        {!formVis && <h4 className="yourrecipesHead">Your Recipes:</h4>}
        {formVis && (
          <h4 className="yourrecipesHead middle">
            Share your <i>Masterdish!</i>
          </h4>
        )}
        <br />
        {formVis && (
          <form className="yourform" action="submit">
            <input
              name="name"
              value={newrecords.name}
              onChange={handleChange}
              placeholder="Enter Recipe Name"
              className="yourformInput"
            />
            <textarea
              name="description"
              value={newrecords.description}
              onChange={handleChange}
              placeholder="Enter Recipe Description"
              className="yourformInput textarsea"
            />

            {/*Enter Ingredients */}

            {ingredients.map((item, index) => (
              <span className="noob">
                {" "}
                <input
                  type={"text"}
                  name="ingredient"
                  className="yourformInput youringredient"
                  placeholder="Enter Ingredient"
                  value={item}
                  onChange={handleRecipeChange}
                />
                <button className="newbutton" onClick={ingSubmit}>
                  Add
                </button>
              </span>
            ))}
            <br />
            <span className="ingList">
              <button className="youringbutton" onClick={addIngs}>
                ADD NEW INGREDIENT
              </button>
            </span>
            <br />

            <h4 className="yoursubheading">Ingredients</h4>
            <br />
            <div className="ingListItems">
              {newrecords.ingredients.map((item, index) => (
                <>
                  <ul>
                    {index + 1}. {item}
                  </ul>
                </>
              ))}
            </div>
            <br />

            <br />
            <hr />
            <br />
            <br />
            <input
              name="image"
              value={newrecords.image}
              onChange={handleChange}
              placeholder="Provide an Image URL"
              className="yourformInput"
            />

            {/*Enter Steps */}

            {steps.map((item, index) => (
              <span className="noob">
                {" "}
                <textarea
                  type={"text"}
                  name="steps"
                  className="yourformInput youringredient textarsea"
                  placeholder="Enter Step"
                  value={item}
                  onChange={handleStepChange}
                />
                <button className="newbutton" onClick={stepSubmit}>
                  Add
                </button>
              </span>
            ))}
            <br />
            <span className="ingList">
              <button className="youringbutton" onClick={addSteps}>
                ADD NEW STEP
              </button>
            </span>
            <br />
            <br />
            <h4 className="yoursubheading">Steps</h4>
            <br />
            <div className="stepListItems">
              {newrecords.steps.map((item, index) => (
                <ul>
                  {index + 1}. {item}
                </ul>
              ))}
            </div>
            <br />
            <br />
            <hr />
            <br />
            <br />
            <button className="yoursubmit" onClick={onSubmit}>
              Submit
            </button>
          </form>
        )}
        {!formVis &&
          records.map((item) => (
            <span className="authRecipes">
              <p className="authRecipesspan">{item.name}</p>
              <span className="authRecipesspan">
                <span
                  id={item._id}
                  className="deleteRecipe"
                  onClick={deleteRecord}
                >
                  {deleteItem} Delete{" "}
                </span>
                <span id={item._id} onClick={displayForm}>
                  {edit} Edit{"   "}
                </span>
              </span>
            </span>
          ))}
      </div>
    </div>
  );
}
