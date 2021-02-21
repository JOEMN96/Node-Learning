// console.log(__dirname);
// console.log(__filename);

// const os = require("os");

// console.log(os.hostname);

// const fs = require("fs");
// const { read } = require("fs/promises");

// fs.readFile("./doc.txt", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data.toString());
// });

// fs.writeFile("./doc2.txt", "Hello pp", () => {
//   console.log("Done");
// });

// if (!fs.existsSync("./doc.txt")) {
//   fs.writeFile("./doc.txt", "Hello", (err, data) => {
//     if (err) {
//       return console.log(err);
//     }
//     console.log("file created");
//   });
// } else {
//   if (fs.existsSync("./doc.txt")) {
//     fs.unlink("doc.txt", (err) => {
//       err ? console.log(err) : "";
//     });
//   }
// }

// if (fs.existsSync("./doc.txt")) {
//   fs.unlink("./doc.txt", (err) => {
//     console.log(err);
//   });
// }

// const readSteam = fs.createReadStream("./doclg.txt", { encoding: "utf-8" });
// const newWritestrm = fs.createWriteStream("./doc4.txt");

// readSteam.on("data", (chunk) => {
//   newWritestrm.write(chunk);
// });

const http = require("http");

const server = http.createServer((req, res) => {
  console.log("req done");
  res.setHeader("Content-Type", "text/html");
  res.write("Hello Joe");
  res.end();
});

server.listen(3000, "localhost", () => {
  console.log("lisitining on port 3000");
});
