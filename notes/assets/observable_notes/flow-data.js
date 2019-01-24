// URL: https://beta.observablehq.com/@mschmidty/flow-data-by-year
// Title: Flow Data By Year
// Author: mschmidty (@mschmidty)
// Version: 397
// Runtime version: 1

const m0 = {
  id: "36600ad28efa0c12@397",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`
# Flow Data By Year
This chart uses the USGS [average flow rates API](https://waterservices.usgs.gov/rest/DV-Test-Tool.html) to look at river flows over time. I relied heavily on Mike Bostock's Example of a [multi-line chart](https://beta.observablehq.com/@mbostock/d3-multi-line-chart) to make it (the hover effects are copied from his example).

### Step 1: Select a river
`
)})
    },
    {

    },
    {
      name: "viewof riverInput",
      inputs: ["select","parseRiver"],
      value: (function(select,parseRiver){return(
select({
  title: "Select a river",
  description: "Please select a river in the dropdown.",
  options: parseRiver,
  value: "Colorado River"
})
)})
    },
    {
      name: "riverInput",
      inputs: ["Generators","viewof riverInput"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md","riverInput"],
      value: (function(md,riverInput){return(
md`### Step 2 - Mouse over the chart to explore individual years

You are currently viewing the <span class="important-text"> ${riverInput} </span>
`
)})
    },
    {
      name: "chart",
      inputs: ["d3","DOM","width","height","xAxis","yAxis","riverInput","margin","data","line","hover"],
      value: (function(d3,DOM,width,height,xAxis,yAxis,riverInput,margin,data,line,hover)
{
  const svg = d3.select(DOM.svg(width, height));

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  svg.append('text')
          .text(`Historic River Flows for the ${riverInput}`)
          .attr('transform', 'translate('+ (margin.left-45) +','+ (margin.top-20)+')')
          .attr('font-weight', 'bold')
          .attr('font-size', '25px');

  const path = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-opacity", 0.2)
    .selectAll("path")
    .data(data.series)
    .enter().append("path")
      .style("mix-blend-mode", "multiply")
      .attr("d", d => line(d.value))
      .attr("class",  d => "year_" + d.key );

  svg.call(hover, path);

  return svg.node();
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`
### Step 3 - Check out how it all works
If you are interested in that sort of stuff.
ToDo:

[ ] - Add in a key of labels
[X] - Add in a title
[X] - Work on the Colors.
[X] - Figure out how to get the right timeseries values.  If you use the below json 'query' it takes you to the first value in timeseries, which is streamflow for some rivers, but temperuature for others.
`
)})
    },
    {
      name: "height",
      value: (function(){return(
600
)})
    },
    {
      name: "margin",
      value: (function(){return(
{top: 70, right: 30, bottom: 30, left: 60}
)})
    },
    {
      name: "x",
      inputs: ["d3","data","margin","width"],
      value: (function(d3,data,margin,width){return(
d3.scaleTime()
    .domain(d3.extent(data.dates))
    .range([margin.left, width - margin.right])
)})
    },
    {
      name: "y",
      inputs: ["d3","data","height","margin"],
      value: (function(d3,data,height,margin){return(
d3.scaleLinear()
    .domain([0, d3.max(data.series, d => d3.max(d.value))]).nice()
    .range([height - margin.bottom, margin.top])
)})
    },
    {
      name: "xAxis",
      inputs: ["height","margin","d3","x","width"],
      value: (function(height,margin,d3,x,width){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
)})
    },
    {
      name: "yAxis",
      inputs: ["margin","d3","y"],
      value: (function(margin,d3,y){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text("Flow Rate in CFS"))
)})
    },
    {
      name: "line",
      inputs: ["d3","x","data","y"],
      value: (function(d3,x,data,y){return(
d3.line()
    .defined(d => !isNaN(d))
    .x((d, i) => x(data.dates[i]))
    .y(d => y(d))
)})
    },
    {
      name: "yearFormat",
      value: (function(){return(
function yearFormat(x){
 let splits = (x).split('-')
 return splits[0]
}
)})
    },
    {
      name: "today",
      value: (function(){return(
new Date()
)})
    },
    {
      name: "formatDate",
      value: (function(){return(
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
)})
    },
    {
      name: "formatToday",
      inputs: ["formatDate","today"],
      value: (function(formatDate,today){return(
formatDate(today)
)})
    },
    {
      name: "data",
      inputs: ["selectedRiver","formatToday","yearFormat","d3","getDates"],
      value: (async function(selectedRiver,formatToday,yearFormat,d3,getDates){return(
Object.assign( await fetch(`https://waterservices.usgs.gov/nwis/dv/?format=json&sites=${selectedRiver}&startDT=1900-11-01&endDT=${formatToday}&siteType=ST&siteStatus=all`)
  .then(function(response){
    return response.json();
  }).then(function(myJson){
    let timeSeries = myJson.value.timeSeries
    for(let ii=0; ii<= timeSeries.length;ii++) {
      if(timeSeries[ii].variable.variableName.includes("Streamflow")){
        return timeSeries[ii].values[0].value.map(({dateTime, value})=>({year:yearFormat(dateTime), cfs:parseFloat(value)}))
      }
    }
  }).then(function(dd){
    return d3.nest()
      .key(function(ddd){ return ddd.year})
      .rollup(function(vv){return vv.map(({cfs})=>cfs)})
      .entries(dd)
  }).then(function(d){
    return {
      series:d,
      dates: getDates(new Date(1900,0,1), new Date(1900,11,31))
    }
  }

  )

)
)})
    },
    {
      name: "riverData",
      value: (function(){return(
[
  {
    "river": "Colorado River",
    "id": "09380000"
  },
  {
    "river": "Dolores River - Dolores",
    "id": "09166500"
  },
  {
    "river": "San Juan River",
    "id": "09379500"
  },
  {
    "river": "Salmon River",
    "id": 13317000
  },
  {
    "river": "Henry's Fork",
    "id": 13042500
  },
  {
    "river": "Animas River",
    "id": "09361500"
  },
  {
    "river": "Chama River",
    "id": "08285500"
  },
  {
    "river": "North Platte River",
    "id": "06620000"
  },
  {
    "river": "Dolores River - Slick Rock",
    "id": "09168730"
  },
  {
    "river": "Provo",
    "id": "10163000"
  }
]
)})
    },
    {
      name: "riverIdQuery",
      inputs: ["riverData"],
      value: (function(riverData){return(
function(x){
  for(let i = 0; i<= riverData.length; i++){
    if(riverData[i].river == x){
      return riverData[i].id
    }
  }
}
)})
    },
    {
      name: "selectedRiver",
      inputs: ["riverIdQuery","riverInput"],
      value: (function(riverIdQuery,riverInput){return(
riverIdQuery(riverInput)
)})
    },
    {
      name: "parseRiver",
      inputs: ["riverData"],
      value: (function(riverData){return(
riverData.map(({river})=>river)
)})
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require("d3@5")
)})
    },
    {
      name: "getDates",
      value: (function(){return(
function(startDate, endDate) {
  var dates = [],
      currentDate = startDate,
      addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
}
)})
    },
    {
      name: "hover",
      inputs: ["d3","y","x","data"],
      value: (function(d3,y,x,data){return(
function hover(svg, path) {
  svg
      .style("position", "relative");

  if ("ontouchstart" in document) svg
      .style("-webkit-tap-highlight-color", "transparent")
      .on("touchmove", moved)
      .on("touchstart", entered)
      .on("touchend", left)
  else svg
      .on("mousemove", moved)
      .on("mouseenter", entered)
      .on("mouseleave", left);

  const dot = svg.append("g")
      .attr("display", "none");

  dot.append("circle")
      .attr("r", 2.5);

  dot.append("text")
      .style("font", "10px sans-serif")
      .attr("text-anchor", "middle")
      .attr("y", -8);

  function moved() {
    d3.event.preventDefault();
    const ym = y.invert(d3.event.layerY);
    const xm = x.invert(d3.event.layerX);
    const i1 = d3.bisectLeft(data.dates, xm, 1);
    const i0 = i1 - 1;
    const i = xm - data.dates[i0] > data.dates[i1] - xm ? i1 : i0;
    const s = data.series.reduce((a, b) => Math.abs(a.value[i] - ym) < Math.abs(b.value[i] - ym) ? a : b);
    path.attr("stroke", d => d === s ? null : "#ddd").filter(d => d === s).raise();
    dot.attr("transform", `translate(${x(data.dates[i])},${y(s.value[i])})`);
    dot.select("text").text(s.key);
  }

  function entered() {
    path.style("mix-blend-mode", null).attr("stroke", "#ddd");
    dot.attr("display", null);
  }

  function left() {
    path.style("mix-blend-mode", "multiply").attr("stroke", null);
    dot.attr("display", "none");
  }
}
)})
    },
    {
      name: "currentYear",
      inputs: ["today"],
      value: (function(today){return(
today.getFullYear()
)})
    },
    {
      inputs: ["html","currentYear"],
      value: (function(html,currentYear){return(
html`
<style>
  .year_${currentYear} {
    stroke-width:2 !important;
    stroke:#BD568E !important;
    mix-blend-mode: normal !important;
    stroke-opacity:1 !important;
  }
  .important-text{
    font-weight:bold;
    color:#BD568E;
  }
</style>
`
)})
    },
    {
      from: "@jashkenas/inputs",
      name: "input",
      remote: "input"
    },
    {
      from: "@jashkenas/inputs",
      name: "select",
      remote: "select"
    }
  ]
};

const m1 = {
  id: "@jashkenas/inputs",
  variables: [
    {
      name: "input",
      inputs: ["html","d3format"],
      value: (function(html,d3format){return(
function input(config) {
  let {
    form,
    type = "text",
    attributes = {},
    action,
    getValue,
    title,
    description,
    format,
    display,
    submit,
    options
  } = config;
  if (!form)
    form = html`<form>
	<input name=input type=${type} />
  </form>`;
  const input = form.input;
  Object.keys(attributes).forEach(key => {
    const val = attributes[key];
    if (val != null) input.setAttribute(key, val);
  });
  if (submit)
    form.append(
      html`<input name=submit type=submit style="margin: 0 0.75em" value="${
        typeof submit == "string" ? submit : "Submit"
      }" />`
    );
  form.append(
    html`<output name=output style="font: 14px Menlo, Consolas, monospace; margin-left: 0.5em;"></output>`
  );
  if (title)
    form.prepend(
      html`<div style="font: 700 0.9rem sans-serif;">${title}</div>`
    );
  if (description)
    form.append(
      html`<div style="font-size: 0.85rem; font-style: italic;">${description}</div>`
    );
  if (format) format = d3format.format(format);
  if (action) {
    action(form);
  } else {
    const verb = submit
      ? "onsubmit"
      : type == "button"
        ? "onclick"
        : type == "checkbox" || type == "radio"
          ? "onchange"
          : "oninput";
    form[verb] = e => {
      e && e.preventDefault();
      const value = getValue ? getValue(input) : input.value;
      if (form.output)
        form.output.value = display
          ? display(value)
          : format
            ? format(value)
            : value;
      form.value = value;
      if (verb !== "oninput")
        form.dispatchEvent(new CustomEvent("input", { bubbles: true }));
    };
    if (verb !== "oninput")
      input.oninput = e => e && e.stopPropagation() && e.preventDefault();
    if (verb !== "onsubmit") form.onsubmit = e => e && e.preventDefault();
    form[verb]();
  }
  return form;
}
)})
    },
    {
      name: "d3format",
      inputs: ["require"],
      value: (function(require){return(
require("d3-format")
)})
    },
    {
      name: "select",
      inputs: ["input","html"],
      value: (function(input,html){return(
function select(config = {}) {
  let {
    value: formValue,
    title,
    description,
    submit,
    multiple,
    size,
    options
  } = config;
  if (Array.isArray(config)) options = config;
  options = options.map(
    o => (typeof o === "object" ? o : { value: o, label: o })
  );
  const form = input({
    type: "select",
    title,
    description,
    submit,
    getValue: input => {
      const selected = Array.prototype.filter
        .call(input.options, i => i.selected)
        .map(i => i.value);
      return multiple ? selected : selected[0];
    },
    form: html`
      <form>
        <select name="input" ${
          multiple ? `multiple size="${size || options.length}"` : ""
        }>
          ${options.map(({ value, label }) => Object.assign(html`<option>`, {
              value,
              selected: Array.isArray(formValue)
                ? formValue.includes(value)
                : formValue === value,
              textContent: label
            }))}
        </select>
      </form>
    `
  });
  form.output.remove();
  return form;
}
)})
    },
    {
      name: "input",
      inputs: ["html","d3format"],
      value: (function(html,d3format){return(
function input(config) {
  let {
    form,
    type = "text",
    attributes = {},
    action,
    getValue,
    title,
    description,
    format,
    display,
    submit,
    options
  } = config;
  if (!form)
    form = html`<form>
	<input name=input type=${type} />
  </form>`;
  const input = form.input;
  Object.keys(attributes).forEach(key => {
    const val = attributes[key];
    if (val != null) input.setAttribute(key, val);
  });
  if (submit)
    form.append(
      html`<input name=submit type=submit style="margin: 0 0.75em" value="${
        typeof submit == "string" ? submit : "Submit"
      }" />`
    );
  form.append(
    html`<output name=output style="font: 14px Menlo, Consolas, monospace; margin-left: 0.5em;"></output>`
  );
  if (title)
    form.prepend(
      html`<div style="font: 700 0.9rem sans-serif;">${title}</div>`
    );
  if (description)
    form.append(
      html`<div style="font-size: 0.85rem; font-style: italic;">${description}</div>`
    );
  if (format) format = d3format.format(format);
  if (action) {
    action(form);
  } else {
    const verb = submit
      ? "onsubmit"
      : type == "button"
        ? "onclick"
        : type == "checkbox" || type == "radio"
          ? "onchange"
          : "oninput";
    form[verb] = e => {
      e && e.preventDefault();
      const value = getValue ? getValue(input) : input.value;
      if (form.output)
        form.output.value = display
          ? display(value)
          : format
            ? format(value)
            : value;
      form.value = value;
      if (verb !== "oninput")
        form.dispatchEvent(new CustomEvent("input", { bubbles: true }));
    };
    if (verb !== "oninput")
      input.oninput = e => e && e.stopPropagation() && e.preventDefault();
    if (verb !== "onsubmit") form.onsubmit = e => e && e.preventDefault();
    form[verb]();
  }
  return form;
}
)})
    },
    {
      name: "d3format",
      inputs: ["require"],
      value: (function(require){return(
require("d3-format")
)})
    }
  ]
};

const notebook = {
  id: "36600ad28efa0c12@397",
  modules: [m0,m1]
};

export default notebook;
