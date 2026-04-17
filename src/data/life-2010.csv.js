import {csvParse, csvFormat} from "d3-dsv";

const response = await fetch("https://datavis.cs.columbia.edu/files/data/gapminder/life-expectancy.csv");
const text = await response.text();
const data = csvParse(text);
const filtered = data.filter(d => d.Year === "2010");
process.stdout.write(csvFormat(filtered));