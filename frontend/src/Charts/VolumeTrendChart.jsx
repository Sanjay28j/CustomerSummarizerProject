// VolumeTrendChart.jsx
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const defaultData = [
  { date: "2025-09-01", count: 20 },
  { date: "2025-09-02", count: 34 },
  { date: "2025-09-03", count: 28 },
  { date: "2025-09-04", count: 45 },
  { date: "2025-09-05", count: 30 },
  { date: "2025-09-06", count: 50 },
  { date: "2025-09-07", count: 38 },
];

const VolumeTrendChart = ({ data = defaultData }) => {
  const ref = useRef();

  useEffect(() => {
    if (!data || !data.length) return;
    const container = ref.current;
    const margin = { top: 20, right: 20, bottom: 40, left: 48 };

    const render = () => {
      // clear old chart
      d3.select(container).selectAll("*").remove();
      const { width: outerWidth } = container.getBoundingClientRect();
      const width = Math.max(outerWidth, 1350) - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      // detect format automatically
      const hasDay = data[0].date.split("-").length === 3;
      const parse = hasDay ? d3.timeParse("%Y-%m-%d") : d3.timeParse("%Y-%m");

      // parse dataset
      const dataset = data.map((d) => ({
        date: parse(d.date),
        count: +d.count,
      }));

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

      // scales
      const x = d3
        .scaleTime()
        .domain(d3.extent(dataset, (d) => d.date))
        .range([0, width]);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(dataset, (d) => d.count) * 1.1])
        .nice()
        .range([height, 0]);

      // area + line
      const area = d3
        .area()
        .x((d) => x(d.date))
        .y0(height)
        .y1((d) => y(d.count))
        .curve(d3.curveMonotoneX);

      const line = d3
        .line()
        .x((d) => x(d.date))
        .y((d) => y(d.count))
        .curve(d3.curveMonotoneX);

      // axes
      const isMonthly = !hasDay;
      const xAxis = d3
        .axisBottom(x)
        .ticks(isMonthly ? d3.timeMonth.every(1) : d3.timeDay.every(1))
        .tickFormat(isMonthly ? d3.timeFormat("%b") : d3.timeFormat("%d %b"))
        .tickSize(0) // remove x-axis lines
        .tickSizeOuter(0);

      const yAxis = d3
        .axisLeft(y)
        .ticks(5) // ✅ limit y-axis to 5 ticks
        .tickSize(0); // remove y-axis lines

      // draw axes
      const xAxisGroup = svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis)
        .call((g) => g.select(".domain").remove()); // remove x axis line

      if (!isMonthly) {
        xAxisGroup
          .selectAll("text")
          .attr("transform", "rotate(-45)")
          .style("text-anchor", "end")
          .style("font-size", "10px");
      }

      svg
        .append("g")
        .call(yAxis)
        .call((g) => g.select(".domain").remove()); // remove y axis line

      // Draw area
      svg.append("path").datum(dataset).attr("fill", "#cfe9ff").attr("d", area);

      // Draw line
      svg
        .append("path")
        .datum(dataset)
        .attr("fill", "none")
        .attr("stroke", "#2a3182")
        .attr("stroke-width", 2)
        .attr("d", line);

      // Tooltip setup
      const tooltip = d3
        .select(container)
        .append("div")
        .style("position", "absolute")
        .style("pointer-events", "none")
        .style("background", "#fff")
        .style("border", "1px solid #ddd")
        .style("padding", "6px")
        .style("border-radius", "4px")
        .style("display", "none");

      // Dots + tooltip
      svg
        .selectAll("circle")
        .data(dataset)
        .join("circle")
        .attr("cx", (d) => x(d.date))
        .attr("cy", (d) => y(d.count))
        .attr("r", 4)
        .attr("fill", "#2a3182")
        .on("mouseenter", (event, d) => {
          tooltip
            .style("display", "block")
            .html(
              `<strong>${d3.timeFormat(hasDay ? "%b %d, %Y" : "%b %Y")(
                d.date
              )}</strong><div>Tickets: ${d.count}</div>`
            );
        })
        .on("mousemove", (event) => {
          tooltip
            .style("left", event.offsetX + 12 + "px")
            .style("top", event.offsetY - 28 + "px");
        })
        .on("mouseleave", () => {
          tooltip.style("display", "none");
        });
    };

    render();
    const handle = () => render();
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, [data]);

  return <div ref={ref} style={{ position: "relative", width: "100%" }} />;
};

export default VolumeTrendChart;
