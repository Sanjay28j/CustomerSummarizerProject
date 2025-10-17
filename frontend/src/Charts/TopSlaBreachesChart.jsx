// TopSlaBreachesChart.jsx
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

/**
 * Expected data shape:
 * [
 *   { agent: "John Doe", breaches: 15, avgDelay: 4.2, details: [...] },
 *   ...
 * ]
 */

const defaultData = [
  { agent: "John Doe", breaches: 15, avgDelay: 4.2 },
  { agent: "Priya Sharma", breaches: 10, avgDelay: 3.8 },
  { agent: "Ali Khan", breaches: 8, avgDelay: 5.1 },
  { agent: "Maya Singh", breaches: 6, avgDelay: 2.5 },
  { agent: "Carlos M", breaches: 4, avgDelay: 1.8 },
];

const TopSlaBreachesChart = ({ data = defaultData, onBarClick = () => {} }) => {
  const ref = useRef();

  useEffect(() => {
    const container = ref.current;
    d3.select(container).selectAll("*").remove();

    const margin = { top: 12, right: 25, bottom: 30, left: 100 };
    const { width: outerWidth } = container.getBoundingClientRect();
    const width = Math.max(outerWidth, 600) - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`
      )
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const dataset = data
      .slice()
      .sort((a, b) => b.breaches - a.breaches)
      .slice(0, 5);

    const y = d3
      .scaleBand()
      .domain(dataset.map((d) => d.agent))
      .range([0, height])
      .padding(0.2);

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, (d) => d.breaches) || 1])
      .range([0, width]);

    // bars
    svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("y", (d) => y(d.agent))
      .attr("height", y.bandwidth())
      .attr("x", 0)
      .attr("width", (d) => x(d.breaches))
      .attr("fill", "#2a3182")
      .style("cursor", "pointer")
      .on("click", (event, d) => onBarClick(d.agent));

    // labels for count at end of bar
    svg
      .selectAll(".label")
      .data(dataset)
      .enter()
      .append("text")
      .attr("x", (d) => x(d.breaches) + 8)
      .attr("y", (d) => y(d.agent) + y.bandwidth() / 2 + 4)
      .text((d) => d.breaches)
      .style("font-size", "12px")
      .style("fill", "#333");

    // y axis (agent names, no lines)
    svg
      .append("g")
      .call(d3.axisLeft(y).tickSize(0)) // no tick marks
      .selectAll("text")
      .style("font-size", "13px");

    svg.selectAll(".domain").remove(); // remove axis lines

    // x axis (ticks only, no line)
    const xAxis = svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(4));

    // remove all lines from x-axis but keep tick text
    xAxis.selectAll(".domain").remove();
    xAxis.selectAll("line").remove();
    xAxis.selectAll("text").style("font-size", "12px").style("fill", "#666");

    // subtle hover behaviour
    svg
      .selectAll("rect")
      .on("mouseenter", function () {
        d3.select(this).attr("fill", "#1a1f5c");
      })
      .on("mouseleave", function () {
        d3.select(this).attr("fill", "#2a3182");
      });
  }, [data, onBarClick]);

  return <div ref={ref} style={{ width: "100%" }} />;
};

export default TopSlaBreachesChart;
