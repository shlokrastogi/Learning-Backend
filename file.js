const fs = require("fs");

// Synchronous way to create a file and write data into it
fs.writeFileSync(
  "./text.text",
  "hey, this is the file created by nodejs by using file system module",
);

// Asynchronous way to create a file and write data into it
fs.writeFile(
  "./text2.text",
  "hey, this is the file created by nodejs by using file system module in asynchronous way",
  (err) => {
    if (err) {
      console.log("error while creating file", err);
    }
  },
);

const result = fs.readFileSync("test.text", "utf-8");
console.log(result);

// fs.readFile("test.text", "utf-8", (err, data) => {
//   if (err) {
//     console.log("Error: ", err);
//   } else {
//     console.log(data);
//   }
// });

// Append data to a file
fs.appendFileSync("./test.text", new Date().toLocaleString() + "\n");

// Copy a file
fs.cpSync("./test.text", "./textCopy.text");

// Rename a file
fs.renameSync("./textCopy.text", "./textCopyRenamed.text");

// Delete a file
// fs.unlinkSync("./textCopyRenamed.text");

// Check if a file exists
if (fs.existsSync("./textCopyRenamed.text")) {
  console.log("File exists");
} else {
  console.log("File does not exist");
}

// Get the stats of a file
// const stats = fs.statSync("./text.text");
// console.log(stats);

// Create a directory
// fs.mkdirSync("./myDirectory");

// Check if a directory exists
// if (fs.existsSync("./myDirectory")) {
//   console.log("Directory exists");
// } else {
//   console.log("Directory does not exist");
// }

// Delete a directory
// fs.rmdirSync("./myDirectory");

// Get the list of files in a directory
// const files = fs.readdirSync("./");
// console.log(files);
