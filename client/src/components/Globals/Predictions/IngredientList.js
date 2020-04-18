import React, { useState, useEffect } from "react";
import axios from "axios";

import UAParser from "ua-parser-js";
import Fade from "react-reveal/Fade";

import Carousel from "react-multi-carousel";

import "../../Styles/Ingredients.css";
import * as d3 from "d3";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    paritialVisibilityGutter: 0,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    paritialVisibilityGutter: 0,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 0,
  },
};

function IngredientList({ match, deviceType }) {
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
      .then((res) => {
        // SET INGREDIENTS
        setIngredient(res.data.hits);

        //NUTRITION
        let param = res.data.hits[0].recipe.totalNutrients;
        setNutrition(res.data.hits[0].recipe.totalNutrients);
        getNutritionData(param);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getNutritionData, match.params.id]);
  console.log(nutrition);

  getNutritionData = (params) => {
    console.log("in the getNutritionData function");
    let nutritiontypearray = [];
    let quantityarr = [];
    let unitarr = [];
    let data = [];
    //let data: { labels: string; quantities: number}[] = [];
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
    const margin = { top: 40, right: 50, bottom: 40, left: 60 };
    const width = 350 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    // set the ranges for the graph
    const x = d3.scaleBand().range([0, width]).padding(0.3);

    // const xScale = d3
    //   .scale()
    //   .ordinal()
    //   .domain(
    //     nutritiontypearray.map(function(d) {
    //       return d;
    //     })
    //   )
    //   .rangeRoundBands([0, width], 0.05);

    // var xAxis = d3.svg
    //   .axis()
    //   .scale(xScale)
    //   .orient("bottom");

    const y = d3.scaleLinear().range([height, 0]);
    // append the container for the graph to the page
    const container = d3
      .select(".d3-bar-chart")
      .append("div")
      .attr("class", "graph");

    container
      .append("p")
      .text(`Nutritional Values`)
      .attr("class", "ingredient-h3");
    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = container
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom + 40)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("class", "graph-svg");

    // .attr("class", "ingredient-h3");

    // Create a skeleton structure for a tooltip and append it to the page
    //investigate in this bullshit
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
    // Scale the range of the data in the x axis
    // console.log(data.labels);
    x.domain(
      data.map((d) => {
        console.log(d.labels);
        return d.labels;
      })
    );

    // Scale the range of the data in the y axis
    console.log(data.quantities);
    y.domain([
      0,
      d3.max(data, (d) => {
        return d.quantities;
      }),
    ]);
    // Select all bars on the graph, take them out, and exit the previous data set.
    // Enter the new data and append the rectangles for each object in the poll array
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
          .style("left", `${d3.event.pageX + 20}px`)
          .style("top", `${d3.event.pageY - 60}px`)
          .style("display", "inline-block")
          .style("opacity", "1")
          .html(
            `<h3><strong>${d.labels}</strong></h3> <div>${d.quantities} ${unit[0]}</div>`
          );
      })
      .on("mouseout", () => tip.style("display", "none"));

    // .attr("x", nutritiontypearray.map());
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
      .attr("dy", "0.8em")
      .style("text-anchor", "middle")
      .text("Grams (g)");

    // update the x-axis
    svg.select(".x-axis").call(d3.axisBottom(x));

    // update the y-axis
    svg.select(".y-axis").call(d3.axisLeft(y));
  }

  return (
    <div className="ingredient-list">
      {/* <h3 className="ingredient-h3">You have clicked on </h3> */}
      <Fade up delay={50}>
        <h2 className="ingredient-h3-id">{id.toLocaleUpperCase()}</h2>
        <div className="d3-bar-chart"></div>
      </Fade>
      <Fade up delay={100}>
        <Carousel
          ssr={true}
          partialVisbile
          swipeable={true}
          deviceType={deviceType}
          responsive={responsive}
          keyBoardControl={true}
          /* dotListClass="custom-dot-list-style"
          removeArrowOnDeviceType={["tablet", "mobile"]} */
        >
          {/* <div className="grid-container"> */}
          {ingredient.map((obj) => (
            <div className="grid-item">
              <div className="list-container">
                <div className="list-grid-img">
                  <img className="ingredient-img" src={obj.recipe.image}></img>
                </div>
                <div className="list-grid-ings">
                  <li>
                    <h3 className="label">{obj.recipe.label}</h3>

                    <p className="ingredients-p">Ingredients</p>
                    <ul className="ingredients-ul">
                      {obj.recipe.ingredientLines.map((ngrdnt) => (
                        <li className="ingredients">{ngrdnt.toLowerCase()}</li>
                      ))}
                    </ul>
                  </li>
                </div>
              </div>
            </div>
          ))}
          {/* </div> */}
        </Carousel>
      </Fade>
    </div>
  );
}

IngredientList.getInitialProps = ({ req }) => {
  let userAgent;
  if (req) {
    userAgent = req.headers["user-agent"];
  } else {
    userAgent = navigator.userAgent;
  }
  const parser = new UAParser();
  parser.setUA(userAgent);
  const result = parser.getResult();
  const deviceType = (result.device && result.device.type) || "desktop";
  return { deviceType };
};

export default IngredientList;
