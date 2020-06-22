// Define SVG area dimensions
var svgWidth = 800;
var svgHeight = 600;

// ------------ CHART FORMATTING ------------
// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 80,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
  .classed("chart",true);


// ------------ ADD DATA ------------
// Load data 
d3.csv("assets/data/data.csv").then(function(data) {

  // Print the data
  console.log(data);

  // Format the data
  data.forEach(function(d) {
    d.age = +d.age;
    d.smokes = +d.smokes;
    d.abbr = d.abbr;
  });

    // ------------ AXES ------------
    //x scale
    var x = d3.scaleLinear()
    .range([0, chartWidth])
    .domain([d3.min(data,d=>d.age - 1), d3.max(data, d => d.age +1)]);
    // y scale
    var y = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([d3.min(data,d=>d.smokes - 1), d3.max(data, d => d.smokes +1)]);

    // Axes
    var bottomAxis = d3.axisBottom(x);
    var leftAxis = d3.axisLeft(y);

    // Left axis
    chartGroup.append("g")
    // .classed("axis", true)
    .call(leftAxis);
    // Bottom axis
    chartGroup.append("g")
    // .classed("axis", true)
    .attr("transform", "translate(0, " + chartHeight + ")")
    .call(bottomAxis);

    // ------------ DATA (DOTS) ------------
    // Add dots
    chartGroup.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
        .attr("cx", d=> x(d.age) )
        .attr("cy", d => y(d.smokes) )
        .attr("r", 7)
        .classed("stateCircle",true);

    // add text in middle of dots
    chartGroup.append("g")
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
            .attr("font-size", "7px")
            .attr("x",d => x(d.age))
            .attr("y",d => y(d.smokes)+2)
            .text(d => d.abbr)
            .classed("stateText",true);

    // ------------ LABELS ------------
    // x label
    chartGroup.append("text")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.bottom/2 +10})`)
      .classed("aText", true)
      .text("Age");
    // y label
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 10)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .classed("aText", true)
      .text("Smokes(%)");

    // ------------ LEGEND ------------
    chartGroup.append("circle")
    .attr("cx", chartWidth / 2 -25)
    .attr("cy", chartHeight + margin.bottom -15)
    .attr("r", 7)
    .classed("stateCircle",true);

    chartGroup.append("text")
    .attr("font-size", "15px")
    .attr("x",chartWidth / 2 -15)
    .attr("y",chartHeight + margin.bottom -10)
    .text("State");
    // .classed("stateText",true);


}).catch(function(error) {
    console.log(error);
});
