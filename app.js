const express = require("express");
const app = express();
const fs = require("fs");

let setdata = [];

// read file
const readFile = fs.readFileSync("json/data.json", "utf-8");
if (readFile !== "") {
  setdata = JSON.parse(readFile);
}

app.get("/", (req, res) => {
  res.render("index.ejs", { setdata });
});

/* ================= CREATE + UPDATE ================= */
app.get("/CreateData", (req, res) => {
  const data = req.query;

  if (data.id) {
    const UPDATEID = setdata.findIndex((item) => item.id == data.id);
    setdata[UPDATEID] = data;
  } else {
    data.id = Date.now(); // unique id
    setdata.push(data);
  }

  fs.writeFileSync("json/data.json", JSON.stringify(setdata, null, 2));
  res.redirect("/");
});

/* ================= ADD PAGE ================= */
app.get("/add", (req, res) => {
  res.render("app.ejs", { Updatedata: null });
});

/* ================= EDIT PAGE ================= */
app.get("/Updatedata/:id", (req, res) => {
  const Updatedata = setdata.find((item) => item.id == req.params.id);
  res.render("app.ejs", { Updatedata });
});
app.get("/Detailsdata/:id", (req, res) => {
  const editid = req.params.id;
  const Detailsdata = setdata[editid];
  res.render("product.ejs", { Detailsdata, setdata });
});
/* ================= DELETE ================= */
app.get("/Deletedata/:id", (req, res) => {
  const Deletedata = req.params.id;
  setdata.splice(Deletedata, 1);

  fs.writeFileSync("json/data.json", JSON.stringify(setdata, null, 2));
  res.redirect("/");
});
app.get("/Searchdata", (req, res) => {
  const search = req.query.q?.toLowerCase() || "";
  const filtered = setdata.filter((item) =>
    item.productName?.toLowerCase().includes(search),
  );

  res.render("index.ejs", { setdata: filtered });
});
app.listen(3002, () => {
  console.log("Server running on 3002");
});
