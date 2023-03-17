const express = require("express");
const csv = require("csv-parser");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());
const port = 3000;
const months = {
  Jan: "01",
  Feb: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  Aug: "08",
  Sep: "09",
  October: "10",
  Nov: "11",
  Dec: "12",
};

app.get("/fetch-csv", (req, res) => {
  const month = req.query.month;
  const year = req.query.year;
  const filePath = "./data/Asurint-SOW-wise-Milestones.csv"; // Update this to point to your CSV file
  const fileStream = fs.createReadStream(filePath);

  var lines = [];
  fileStream
    .pipe(csv())
    .on("data", data => lines.push(data))
    .on("end", () => {
      let ans = [];
      {
        lines.map(e => {
          var dates1 = Object.values(e)[4];
          if (dates1.includes("-")) {
            const dates = dates1.toString().split("-");
            //console.log(dates);
            var month1;
            var year1;
            if (dates[1] && isNaN(dates[1])) {
              const sd = dates[1];
              month1 = months[sd];
              year1 =
                dates[2]?.length > 2 ? dates[2] : !dates[2] ? " " : dates[2];
            } else {
              month1 =
                dates[0]?.length === 1
                  ? `0${dates[0]}`
                  : !dates[0]
                  ? " "
                  : dates[0];
              year1 =
                dates[2]?.length > 2 ? dates[2] : !dates[2] ? " " : dates[2];
            }
            if (month === month1 && year === year1) {
              ans.push(e);
            } else {
              const dates = dates1.toString().split("/");
              //console.log(dates);
              var month1;
              var year1;
              if (dates[1] && isNaN(dates[1])) {
                const sd = dates[1];
                month1 = months[sd];
                year1 =
                  dates[2]?.length > 2 ? dates[2] : !dates[2] ? " " : dates[2];
              } else {
                month1 =
                  dates[0]?.length === 1
                    ? `0${dates[0]}`
                    : !dates[0]
                    ? " "
                    : dates[0];
                year1 =
                  dates[2]?.length > 2 ? dates[2] : !dates[2] ? " " : dates[2];
              }
              if (month === month1 && year === year1) {
                ans.push(e);
              }
            }
          }
        });
      }
      res.send(ans);
    });
});

app.post("/upload-csv-file", (req, res) => {
  const lines = req.body;
  const month = req.query.month;
  const year = req.query.year;
  let ans = [];
  {
    lines.data.map(e => {
      var dates1 = Object.values(e)[4];
      if (dates1.includes("-")) {
        const dates = dates1.toString().split("-");
        //console.log(dates);
        var month1;
        var year1;
        if (dates[1] && isNaN(dates[1])) {
          const sd = dates[1];
          month1 = months[sd];
          year1 = dates[2]?.length > 2 ? dates[2] : !dates[2] ? " " : dates[2];
        } else {
          month1 =
            dates[0]?.length === 1
              ? `0${dates[0]}`
              : !dates[0]
              ? " "
              : dates[0];
          year1 = dates[2]?.length > 2 ? dates[2] : !dates[2] ? " " : dates[2];
        }
        if (month === month1 && year === year1) {
          ans.push(e);
        }
      } else {
        const dates = dates1.toString().split("/");
        //console.log(dates);
        var month1;
        var year1;
        if (dates[1] && isNaN(dates[1])) {
          const sd = dates[1];
          month1 = months[sd];
          year1 = dates[2]?.length > 2 ? dates[2] : !dates[2] ? " " : dates[2];
        } else {
          month1 =
            dates[0]?.length === 1
              ? `0${dates[0]}`
              : !dates[0]
              ? " "
              : dates[0];
          year1 = dates[2]?.length > 2 ? dates[2] : !dates[2] ? " " : dates[2];
        }
        if (month === month1 && year === year1) {
          ans.push(e);
        }
      }
    });
  }

  res.send(ans);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
