import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useInput
} from "react";
import rd3 from "react-d3-library";
import * as d3 from "d3";
import PredictionHooks from "../../Predictions/PredictionHooks";
import { map } from "d3";

const NutritionalGraphs = ({ nutrition }) => {
  // https://observablehq.com/@d3/sortable-bar-chart
  // https://www.freecodecamp.org/news/how-to-get-started-with-d3-and-react-c7da74a5bd9f/
  const xData = ["x", "y", "z"];
  const yData = [10, 2, 8];

  const refElement = useRef();

  const drawBarChart = params => {
    const canvasHeight = 400;
    const canvasWidth = 600;
    const scale = 20;

    const svgCanvas = d3
      .select(refElement.current)
      .append("svg")
      .attr("width", 600)
      .attr("height", 400)
      .style("border", "1px solid black");
    svgCanvas
      .selectAll("rect")
      .data(yData)
      .enter()
      .append("rect")
      .attr("width", 40)
      .attr("height", datapoint => datapoint * 20)
      .attr("fill", "orange")
      .attr("x", (datapoint, iteration) => iteration * 45)
      .attr("y", datapoint => canvasHeight - datapoint * scale);

    svgCanvas
      .selectAll("text")
      .data(yData)
      .enter()
      .append("text")
      .attr("x", (dataPoint, i) => i * 45 + 10)
      .attr("y", (dataPoint, i) => canvasHeight - dataPoint * scale - 10)
      .text(dataPoint => dataPoint);
  }; // ending bracket for function
  drawBarChart(yData);
  console.log(nutrition);
  return (
    <div ref={refElement}>
      <div>{nutrition ? <div>empty</div> : <div>{nutrition}</div>}</div>
    </div>
  );
};
export default NutritionalGraphs;
