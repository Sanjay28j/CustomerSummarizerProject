// SentimentDistributionChart.jsx
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const defaultData = [
  { label: "Positive", value: 120 },
  { label: "Neutral", value: 80 },
  { label: "Negative", value: 48 },
];

const colors = { Positive: "#28a745", Neutral: "#f0ad4e", Negative: "#dc3545" };

const SentimentDistributionChart = ({ data = defaultData }) => {
  const ref = useRef();

  useEffect(() => {
    const container = ref.current;
    d3.select(container).selectAll("*").remove();
    const { width: outerWidth } = container.getBoundingClientRect();
    const width = Math.max(outerWidth, 650);
    const height = 300;
    const radius = Math.min(width, height) / 2 - 20;

    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3
      .pie()
      .value((d) => d.value)
      .sort(null);
    const arc = d3
      .arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius);

    const arcs = svg.selectAll("arc").data(pie(data)).enter().append("g");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => colors[d.data.label] || "#888")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1);

    // center label
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("y", -6)
      .style("font-size", "18px")
      .style("font-weight", 600)
      .text(d3.sum(data, (d) => d.value));

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("y", 18)
      .style("font-size", "12px")
      .style("fill", "#666")
      .text("Total");

    // legend to the side (render below chart in narrow widths)
    const legend = d3
      .select(container)
      .append("div")
      .style("display", "flex")
      .style("justify-content", "center")
      .style("gap", "12px")
      .style("margin-top", "2px");

    data.forEach((d) => {
      const item = legend
        .append("div")
        .style("display", "flex")
        .style("align-items", "center")
        .style("gap", "6px");
      item
        .append("div")
        .style("width", "12px")
        .style("height", "12px")
        .style("background", colors[d.label] || "#888")
        .style("border-radius", "2px");
      item
        .append("div")
        .style("font-size", "13px")
        .style("color", "#333")
        .text(`${d.label} (${d.value})`);
    });
  }, [data]);

  return <div ref={ref} style={{ width: "100%" }} />;
};

export default SentimentDistributionChart;
