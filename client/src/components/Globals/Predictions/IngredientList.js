import React, { useState, useEffect } from "react";
import axios from "axios";

import "../../Styles/Ingredients.css";
import * as d3 from "d3";
function IngredientList({ match }) {
  /* -------------- INGREDIENTS -----------------*/
  const [ingredient, setIngredient] = useState([]);
  const [id, setId] = useState("");
  /* -------------- NUTRITION -----------------*/
  const keysAllowed = ["FAT", "SUGAR", "CHOCDF", "FIBTG", "PROCNT"];
  let getNutritionData;

  useEffect(() => {
    setId(match.params.id.replace(/-/g, " ").toLowerCase());
    let id = match.params.id.replace(/-/g, " ").toLowerCase();
    axios
      .get(`/api/virtualchef/edamam/${id}`)
      .then((res) => {
        // SET INGREDIENTS
        setIngredient(res.data.data.hits);

        //NUTRITION
        let param = res.data.data.hits[0].recipe.totalNutrients;
        getNutritionData(param);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getNutritionData, match.params.id]);

  getNutritionData = (params) => {
    let nutritiontypearray = [];
    let quantityarr = [];
    let unitarr = [];
    let data = [];
    const filteredNutritionObj = Object.keys(params)
      .filter((key) => keysAllowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = params[key];
        return obj;
      }, {});
    keysAllowed.map((i) => {
      nutritiontypearray.push(filteredNutritionObj[i].label);
      quantityarr.push(
        Math.round(filteredNutritionObj[i].quantity * 100) / 100
      );
      unitarr.push(filteredNutritionObj[i].unit);

      let label = filteredNutritionObj[i].label;
      let quantity = Math.round(filteredNutritionObj[i].quantity * 100) / 100;
      let value = { labels: label, quantities: quantity };
      data.push(value);
    });
    drawSvg(data, unitarr);
  };

  function drawSvg(data, unit) {
    //d3js
    const margin = { top: 40, right: 40, bottom: 40, left: 50 };
    const width = 380 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    const x = d3.scaleBand().range([0, width]).padding(0.3);

    const y = d3.scaleLinear().range([height, 0]);
    const container = d3
      .select(".d3-bar-chart")
      .append("div")
      .attr("class", "graph");

    container
      .append("h3")
      .text(`Nutritional Values`)
      .attr("class", "ingredient-h3");
    const svg = container
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom + 40)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("class", "graph-svg");

    const tip = d3
      .select(".d3-bar-chart")
      .append("div")
      .attr("class", "tooltip");

    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class", "x-axis")
      .call(d3.axisBottom(y));
    svg.append("g").attr("class", "y-axis").call(d3.axisLeft(y));

    update(data, unit, margin, width, height, x, y, container, svg, tip);
  }

  function update(
    data,
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
    x.domain(
      data.map((d) => {
        console.log(d.labels);
        return d.labels;
      })
    );

    console.log(data.quantities);
    y.domain([
      0,
      d3.max(data, (d) => {
        return d.quantities;
      }),
    ]);

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("fill", "#196d4c")
      .attr("x", (d) => {
        return x(d.labels);
      })
      .attr("width", x.bandwidth())
      .attr("y", (d) => {
        return y(d.quantities);
      })
      .attr("height", (d) => {
        return height - y(d.quantities);
      })
      .on("mousemove", (d) => {
        tip
          .style("position", "absolute")
          .style("left", `${d3.event.pageX + 10}px`)
          .style("top", `${d3.event.pageY + 20}px`)
          .style("display", "inline-block")
          .style("opacity", "1")
          .html(
            `<h3><strong>${d.labels}</strong></h3> <div>${d.quantities} ${unit[0]}</div>`
          );
      })
      .on("mouseout", () => tip.style("display", "none"));

    //Create X axis label
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom)
      .style("text-anchor", "middle")
      .text("Type of Nutrition");

    //Create Y axis label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Grams (g)");

    // update the x-axis
    svg.select(".x-axis").call(d3.axisBottom(x));

    // update the y-axis
    svg.select(".y-axis").call(d3.axisLeft(y));
  }

  return (
    <div className="ingredient-list">
      <h3 className="ingredient-h3-id">{id.toLocaleUpperCase()}</h3>
      <div className="d3-bar-chart"></div>
      <ul className="recipes">
        <div className="grid-container">
          {ingredient.map((obj) => (
            <div className="grid-item">
              <img className="ingredient-img" src={obj.recipe.image}></img>
              <li>
                <h3 className="label">{obj.recipe.label.toLowerCase()}</h3>
                <ul>
                  {obj.recipe.ingredientLines.map((ngrdnt) => (
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
