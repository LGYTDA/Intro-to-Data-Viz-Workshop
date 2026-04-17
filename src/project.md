---
title: Project Sketches
---

# Project Sketches
<details>
  <summary>Click to see image</summary>

![my image](./puppy.jpeg)
</details>

<div class="grid grid-cols-3">
  <div class="card" style="color: steelblue;">A</div>
  <div class="card" style="color: coral;">B</div>
  <div class="card" style="color: cyan;">C</div>
  <div class="card grid-colspan-3" style="text-align: center;">D</div>
  <div class="card" style="color: coral;">E</div>
  <div class="card" style="color: steelblue;">F</div>
  <div class="card" style="color: cyan;">G</div>
</div>

```js
const words = "Hey! Do you wanna see something super awesome? Click the drop down arrow above the grid ".split(" ")
```

```js
const n = view(Inputs.range([1, words.length], {step: 1, value: 5, label: "Number of words"}))
```

```js
display(words.slice(0, n).join(" "))
```
```js
const gapminder = FileAttachment("./data/gapminder.zip").zip()
```

```js
display(gapminder.filenames)
```
```js
const continents = await gapminder.file("gapminder/continents.csv").csv({typed: true})
```

```js
display(Inputs.table(continents))
```
```js
display(continents.map(d => d.Entity))
```
```js
const life2010 = FileAttachment("./data/life-2010.csv").csv({typed: true})
```

```js
display(Inputs.table(life2010))
```
```js
const gdp2010 = FileAttachment("./data/gdp-2010.csv").csv({typed: true})
```

```js
display(Inputs.table(gdp2010))
```
```js
const color = view(Inputs.radio(["steelblue", "coral", "cyan"], {label: "Dot color", value: "steelblue"}))
```
```js
import * as d3 from "npm:d3";
```

```js
const joined = life2010.map(d => {
  const gdp = gdp2010.find(g => g.Entity === d.Entity)
  return {...d, gdp: gdp ? gdp["GDP per capita"] : null}
}).filter(d => d.gdp != null)
```

```js
const chart = () => {
  const width = 800, height = 400, margin = {top: 20, right: 20, bottom: 40, left: 50}

  const x = d3.scaleLog()
    .domain(d3.extent(joined, d => d.gdp))
    .range([margin.left, width - margin.right])

  const y = d3.scaleLinear()
    .domain(d3.extent(joined, d => d["Life expectancy"]))
    .range([height - margin.bottom, margin.top])

  const svg = d3.create("svg").attr("width", width).attr("height", height)

  svg.append("g").attr("transform", `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x))
  svg.append("g").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y))

  svg.selectAll("circle")
    .data(joined)
    .join("circle")
    .attr("cx", d => x(d.gdp))
    .attr("cy", d => y(d["Life expectancy"]))
    .attr("r", 4)
    .attr("fill", color)
    .attr("opacity", 0.7)

  return svg.node()
}

display(chart())
```