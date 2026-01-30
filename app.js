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
  data.id=setdata.length
  if (data.id) {
    const updataid=setdata.findupdateid(item => item.id == data.id)
    setdata[updataid] =data
  }
  else{
   setdata.push(data);
  }
  

  fs.writeFileSync("json/data.json", JSON.stringify(setdata));
  res.redirect("/");
});
app.get("/add", (req, res) => {
  res.render("app.ejs", {setdata });
});

app.get("/Editdata/:id", (req, res) => {
  const editid = req.params.id;
  const Editdata = setdata[editid];
  res.render("product.ejs", { Editdata, setdata });
});
app.get("/Deletedata/:id", (req, res) => {
  const Deletedata = req.params.id;
  setdata.splice(Deletedata, 1);

  fs.writeFileSync("json/data.json", JSON.stringify(setdata));
  res.redirect("/");
});
app.get("/Updatedata/:id" ,(req,res) =>{
  const Updatedata= setdata.find(item => item.id == req.params.id)
   res.render("app.ejs", { Updatedata });

})


app.listen(3002, () => {
  console.log("Server running on 3000");
});
