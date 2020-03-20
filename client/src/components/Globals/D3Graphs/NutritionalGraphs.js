import React, { useRef, useState, useEffect } from "react";
import rd3 from "react-d3-library";
import * as d3 from "d3";

const NutritionalGraphs = ({
  nutrition,
  nutritionType,
  quantityData,
  unit
}) => {
  useEffect(() => {
    if (quantityData) {
      drawSvg();
      return;
    } else {
      // alert("no data");
    }
  }, [quantityData]);

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

  container.append("h1").text(`Nutritional Values for :${nutrition}`);

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

  console.log(quantityData);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "x-axis")
    .call(d3.axisBottom(x));

  function update(quantityData) {
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
      .attr("fill", "orange")
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

  function drawSvg() {
    svg
      .append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(y));
    update(quantityData);
  }

  return (
    //ref={refElement}
    <div>
      {/* <div>{quantityData ? <div>empty</div> : <div></div>}</div> */}
    </div>
  );
};
export default NutritionalGraphs;
