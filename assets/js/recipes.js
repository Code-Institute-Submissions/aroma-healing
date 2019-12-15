//Tutorial from: https://www.d3-graph-gallery.com/graph/barplot_button_data_hard.html-->
var data1 = [
    { group: "A", value: 4 },
    { group: "B", value: 16 },
    { group: "C", value: 8 }
];

var data2 = [
    { group: "A", value: 7 },
    { group: "B", value: 1 },
    { group: "C", value: 20 },
    { group: "D", value: 10 }
];

var data3 = [
    { group: "A", value: 19 },
    { group: "B", value: 1 },
    { group: "C", value: 3 },
    { group: "D", value: 6 }
];

var data4 = [
    { group: "A", value: 15 },
    { group: "B", value: 12 },
    { group: "C", value: 4 },
    { group: "D", value: 9 }
];

var data5 = [
    { group: "A", value: 20 },
    { group: "B", value: 13 },
    { group: "C", value: 5 },
    { group: "D", value: 18 }
];

var data6 = [
    { group: "A", value: 17 },
    { group: "B", value: 4 },
    { group: "C", value: 14 },
    { group: "D", value: 6 }
];

// set the dimensions and margins of the graph
var margin = { top: 90, right: 10, bottom: 20, left: 60 },
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


var svg = d3.select("#recipe-graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Initialize the X axis
var x = d3.scaleBand()
    .range([0, width])
    .padding(0.2);
var xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")

// Initialize the Y axis
var y = d3.scaleLinear()
    .range([height, 0]);
var yAxis = svg.append("g")
    .attr("class", "myYaxis")


// A function that create / update the plot for a given variable:
function update(data) {

    // Update the X axis
    x.domain(data.map(function (d) { return d.group; }))
    xAxis.call(d3.axisBottom(x))

    // Update the Y axis
    y.domain([0, d3.max(data, function (d) { return d.value })]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));

    // Create the u variable
    var u = svg.selectAll("rect")
        .data(data)

    u
        .enter()
        .append("rect") // Add a new rect for each new elements
        .merge(u) // get the already existing elements as well
        .transition() // and apply changes to all of them
        .duration(1000)
        .attr("x", function (d) { return x(d.group); })
        .attr("y", function (d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.value); })
        .attr("fill", "#CEDDC9")

    // If less group in the new dataset, I delete the ones not in use anymore
    u
        .exit()
        .remove()
}

// Initialize the plot with the first dataset
update(data1)