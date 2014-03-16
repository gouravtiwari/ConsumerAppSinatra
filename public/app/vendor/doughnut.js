/*
 * Gourav Tiwari: https://github.com/gouravtiwari/sleek_charts
*/
// options: it is a map, which accepts below values
//
// selector:    selector to which donut chart will be added, default is 'body'
//              e.g. 'div#donut-chart'
// data:        data in JSON object, which contains label and value to create bar chart
//              e.g. [{'label': 'weather-day', 'value': 35.1}, {'label': 'weather-night', 'value': 30.2}]
// width:       width of svg element
// height:      height of svg element
// margin:      margin of svg element and accepts in a map
//              {top: 10, right: 20, bottom: 20, left:10}
// innerRadius: innerRadius for inner edge of donut
// outerRadius: outerRadius for outer edge of donut
// color:       color platter, default is d3.scale.category20c()
// xDomain:     x-axis domain, default is 'label'
// yDomain:     y-axis domain, default is 'value'
// tipLabel:    tipText which you want to display in tip, default is ''
// tipValue:    tipValue, for each bar, default is 'value'
// tipText:     tipText which you want to display with 'label' and 'value', default is ''
// totalLabel:  totalLabel to add a label for sum e.g. ' Views'
// legend:     default set to true to show legends

function mergeConfigOptions(defaults,options){
    var mergedConfig = {};
    for (var attrname in defaults) { mergedConfig[attrname] = defaults[attrname]; }
    for (var attrname in options)  { mergedConfig[attrname] = options[attrname]; }
    return mergedConfig;
}

function donutTip(options){
    console.log(options);
    var defaults = {
        selector:       'body',
        data:           [{'label': 'weather-morning', 'value': 29.1}, {'label': 'weather-afternoon', 'value': 33.2},
                        {'label': 'weather-evening', 'value': 32.1}, {'label': 'weather-night', 'value': 30.2}],
        width:          500,
        height:         500,
        margin:         {top: 10, right: 20, bottom: 20, left:10},
        innerRadius:    90,
        outerRadius:    180,
        color:          d3.scale.category20c(),
        xDomain:        'label',
        yDomain:        'value',
        tipLabel:       '',
        tipValue:       'value',
        tipText:        '',
        totalLabel:     '',
        legend:         true
    };

    var config = (options) ? mergeConfigOptions(defaults,options) : defaults;

    var width = config.width - config.margin.left - config.margin.right,
        height = config.height - config.margin.top - config.margin.bottom,
        total = d3.sum(config.data, function (d) {
            return d3.sum(d3.values(d));
        });

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var vis = d3.select(config.selector)
                .append("svg:svg") //create the SVG element inside the <body>    
                .data([config.data]) //associate our data with the document
                .attr("width", width + config.margin.left + config.margin.right)
                .attr("height", height + config.margin.top + config.margin.bottom)
                .append("svg:g") //make a group to hold our pie chart
                .attr("transform", "translate(" + config.outerRadius * 1.5 + "," + config.outerRadius * 1.5 + ")");
    
    var textTop = vis.append("text")
                .attr("dy", ".35em")
                .style("text-anchor", "middle")
                .attr("class", "textTop")
                .text("TOTAL")
                .attr("y", -10),
        textBottom = vis.append("text")
                .attr("dy", ".35em")
                .style("text-anchor", "middle")
                .attr("class", "textBottom")
                .text(total + " Views")
                .attr("y", 10);

    var arc = d3.svg.arc()
                .innerRadius(config.innerRadius)
                .outerRadius(config.outerRadius);
    var arcOver = d3.svg.arc()
                .innerRadius(config.innerRadius + 5)
                .outerRadius(config.outerRadius + 5);

    var pie = d3.layout.pie() //this will create arc data for us given a list of values
                .value(function (d) {
                    return d[config.yDomain];
                }); //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice") //this selects all <g> elements with class slice (there aren't any yet)
                .data(pie) //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
                .enter() //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
                .append("svg:g") //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice") //allow us to style things in the slices (like text)
                .on('mousemove', function (d, i) {
                    label = d[config.tipLabel] == undefined ? "" : " " + d[config.tipLabel];
                    d3.select(this).select("path").transition()
                    .duration(200)
                    .attr("d", arcOver);
                    
                    textTop.text(d3.select(this).datum().data[config.xDomain])
                    .attr("y", -10);
                textBottom.text(d3.select(this).datum().data[config.yDomain] + " " +config.totalLabel)
                    .attr("y", 10);
                    
                    div.transition()
                    .duration(200)
                    .style("opacity", 0.9);
                    div.html("<strong>" + config.tipText + label+ "</strong> <span style='color:red'>" + d.data[config.tipValue] + "</span>")
                    .style("left", (d3.event.pageX - 57) + "px")
                    .style("top", (d3.event.pageY - 50) + "px")
                    .style("z-index", 10000)
                })
                .on("mouseout", function (d) {
                    d3.select(this).select("path").transition()
                    .duration(100)
                    .attr("d", arc);
        
                    textTop.text("TOTAL")
                    .attr("y", -10);
                    textBottom.text(total + " " + config.totalLabel);
                    
                    div.transition()
                    .duration(500)
                    .style("opacity", 0);
                });

    arcs.append("svg:path")
        .attr("fill", function (d, i) {
            return config.color(i);
        }) //set the color for each slice to be chosen from the color function defined above
        .attr("d", arc); //this creates the actual SVG path using the associated data (pie) with the arc drawing function
    if(config.legend){
        var legend = d3.select(config.selector).append("svg")
            .attr("class", "legend")
            .attr("width", config.outerRadius)
            .attr("height", config.outerRadius * 2)
            .selectAll("g")
            .data(config.data)
            .enter().append("g")
            .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
        });
        
        legend.append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function (d, i) {
            return config.color(i);
        });
        
        legend.append("text")
            .attr("x", 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .text(function (d) {
                return d[config.xDomain];
        });
    }
}
