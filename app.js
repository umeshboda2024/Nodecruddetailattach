const express = require("express");
const app = express();
const fs = require("fs");
// const path = require("path");

let setdata = [];

const readFile = fs.readFileSync("json/data.json", "utf-8");
if (readFile !== "") {
  setdata = JSON.parse(readFile);
}

app.get("/", (req, res) => {
  res.render("index.ejs", { setdata });
});

app.get("/CreateData", (req, res) => {
  const data = req.query;
  setdata.push(data);
  fs.writeFileSync("json/data.json", JSON.stringify(setdata));
  res.redirect("/");
});

app.get("/Editdata/:id", (req, res) => {
  const editid = req.params.id;
  const Editdata = setdata[editid];
  res.render("product.ejs", { Editdata, setdata });
});

app.listen(3000, () => {
  console.log("Server running on 3000");
});
