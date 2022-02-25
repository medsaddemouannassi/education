const app = require("./backend/app");

app.use(express.static(__dirname + "./dist/education"));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "./dist/education/index.html"));
});

app.listen(process.env.PORT || 3000, () => {});