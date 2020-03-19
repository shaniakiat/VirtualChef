import React, { useState, useEffect } from "react";
import axios from "axios";

import NutritionalGraphs from "../D3Graphs/NutritionalGraphs";

import "../../Styles/App.css";

function IngredientList({ match }) {
  /* -------------- INGREDIENTS -----------------*/
  const [ingredient, setIngredient] = useState([]);
  const [id, setId] = useState("");

  /* -------------- NUTRITION -----------------*/
  const keysAllowed = ["FAT", "SUGAR", "CHOCDF", "FIBTG", "PROCNT"];
  const [nutrition, setNutrition] = useState();
  const [nutritionType, setNutritionType] = useState([]);
  const [quantityData, setQuanityData] = useState([]);
  const [unit, setUnit] = useState([]);

  let getNutritionData;

  useEffect(() => {
    const base = "https://api.edamam.com/search";
    const YOUR_APP_ID = "d9383e24";
    const YOUR_APP_KEY = "d76bf79039ba4df599b7902b99cb0630";
    setId(match.params.id.replace(/-/g, " ").toLowerCase());
    console.log("id= " + match.params.id.replace(/-/g, "+").toLowerCase());
    axios
      .get(
        `${base}?q=${match.params.id
          .replace(/-/g, "+")
          .toLowerCase()}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`
      )
      .then(res => {
        // SET INGREDIENTS
        setIngredient(res.data.hits);

        //NUTRITION
        let param = res.data.hits[0].recipe.totalNutrients;
        setNutrition(res.data.hits[0].recipe.totalNutrients);
        getNutritionData(param);
      })
      .catch(err => {
        console.log(err);
      });
  }, [getNutritionData, id, ingredient, match.params.id]);

  getNutritionData = params => {
    console.log("in the function");
    let nutritiontypearray = [];
    let quantityarr = [];
    let unitarr = [];
    const filteredNutritionObj = Object.keys(params)
      .filter(key => keysAllowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = params[key];
        return obj;
      }, {});
    keysAllowed.map(i => {
      nutritiontypearray.push(filteredNutritionObj[i].label);
      quantityarr.push(
        Math.round(filteredNutritionObj[i].quantity * 100) / 100
      );
      unitarr.push(filteredNutritionObj[i].unit);
    });
    setNutritionType(nutritiontypearray);
    setQuanityData(quantityarr);
    setUnit(unitarr);
  };

  return (
    <div>
      <h3 className="idFood1">You have clicked on </h3>
      <h3 className="idFood2">{id}</h3>
      <ul>
        <div class="grid-container">
          {ingredient.map(obj => (
            <div class="grid-item">
              <li>
                <h3 className="label">{obj.recipe.label.toLowerCase()}</h3>
                <ul>
                  {obj.recipe.ingredientLines.map(ngrdnt => (
                    <li className="ingredients">{ngrdnt.toLowerCase()}</li>
                  ))}
                </ul>
              </li>
            </div>
          ))}
        </div>
      </ul>
      <NutritionalGraphs
        nutrition={nutrition}
        nutritionType={nutritionType}
        quantityData={quantityData}
        unit={unit}
      />
    </div>
  );
}

export default IngredientList;
