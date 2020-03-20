import React, { useState, useEffect } from "react";
import axios from "axios";

import "../../Styles/App.css";
import * as d3 from "d3";

function IngredientList({ match }) {
  /* -------------- INGREDIENTS -----------------*/
  const [ingredient, setIngredient] = useState([]);
  const [id, setId] = useState("");

  /* -------------- NUTRITION -----------------*/
  const keysAllowed = ["FAT", "SUGAR", "CHOCDF", "FIBTG", "PROCNT"];
  const [nutrition, setNutrition] = useState();
  // const [nutritionType, setNutritionType] = useState([]);
  // const [quantityData, setQuanityData] = useState([]);
  // const [unit, setUnit] = useState([]);

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
  }, [getNutritionData, match.params.id]);

  getNutritionData = params => {
    console.log("in the getNutritionData function");
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
    // setNutritionType(nutritiontypearray);
    // setQuanityData(quantityarr);
    // setUnit(unitarr);
    drawSvg(nutritiontypearray, quantityarr, unitarr);
  };

  function update(
    type,
    quantityData,
    unit,
    margin,
    width,
    height,
    x,
    y,
    container,
    svg,
    tip
  ) {
    // Scale the range of the data in the x axis
    x.domain(
      quantityData.map(d => {
        return d;
      })
    );

    // Scale the range of the data in the y axis
    y.domain([
      0,
      d3.max(quantityData, d => {
        return d + 200;
      })
    ]);
    // Select all bars on the graph, take them out, and exit the previous data set.
    // Enter the new data and append the rectangles for each object in the poll array
    svg
      .selectAll(".bar")
      .remove()
      .exit()
      .data(quantityData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("fill", "green")
      .attr("x", d => {
        return x(d);
      })
      .attr("width", x.bandwidth())
      .attr("y", d => {
        return y(d);
      })
      .attr("height", d => {
        return height - y(d);
      })
      .on("mousemove", d => {
        tip
          .style("position", "absolute")
          .style("left", `${d3.event.pageX + 10}px`)
          .style("top", `${d3.event.pageY + 20}px`)
          .style("display", "inline-block")
          .style("opacity", "0.9")
          .html(
            `<div><strong>${d}${unit[0]}</strong></div> <span>${d} ${unit[0]}</span>`
          );
      })
      .on("mouseout", () => tip.style("display", "none"));

    // update the x-axis
    svg.select(".x-axis").call(d3.axisBottom(x));

    // update the y-axis
    svg.select(".y-axis").call(d3.axisLeft(y));
  }
  function drawSvg(nutritiontypearray, quantityarr, unitarr) {
    //d3js
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    // set the ranges for the graph
    const x = d3
      .scaleBand()
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear().range([height, 0]);
    // append the container for the graph to the page
    const container = d3
      .select("body")
      .append("div")
      .attr("class", "container");

    container.append("h1").text(`Nutritional Values for :${id}`);
    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = container
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Create a skeleton structure for a tooltip and append it to the page
    //investigate in this bullshit
    const tip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip");

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class", "x-axis")
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(y));
    update(
      nutritiontypearray,
      quantityarr,
      unitarr,
      margin,
      width,
      height,
      x,
      y,
      container,
      svg,
      tip
    );
  }

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
    </div>
  );
}

export default IngredientList;
