const fs = require("fs");
const os = require("os");

// No of threads in the thread pool
// console.log(os.cpus().length);

// Synchronous way to create a file and write data into it  // Blocking code
// fs.writeFileSync(
//   "./text.text",
//   "hey, this is the file created by nodejs by using file system module",
// );

// Asynchronous way to create a file and write data into it // Non-blocking code
// fs.writeFile(
//   "./text2.text",
//   "hey, this is the file created by nodejs by using file system module in asynchronous way",
//   (err) => {
//     if (err) {
//       console.log("error while creating file", err);
//     }
//   },
// );

// const result = fs.readFileSync("test.text", "utf-8");
// console.log(result);

// fs.readFile("test.text", "utf-8", (err, data) => {
//   if (err) {
//     console.log("Error: ", err);
//   } else {
//     console.log(data);
//   }
// });

// Append data to a file
// fs.appendFileSync("./test.text", new Date().toLocaleString() + "\n");

// Copy a file
// fs.cpSync("./test.text", "./textCopy.text");

// Rename a file
// fs.renameSync("./textCopy.text", "./textCopyRenamed.text");

// Delete a file
// fs.unlinkSync("./textCopyRenamed.text");

// Check if a file exists
// if (fs.existsSync("./textCopyRenamed.text")) {
//   console.log("File exists");
// } else {
//   console.log("File does not exist");
// }

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
// fs.rmdirSync("./myDirectory");ddd

// Get the list of files in a directory
// const files = fs.readdirSync("./");
// console.log(files);

// change the permissions of a file
// fs.chmodSync("./text.text", 0o777);

// Non-blocking request  //We shold always prefer non-blocking code in nodejs as it will not block the event loop and will allow other requests to be processed while waiting for the file to be read
fs.readFile("./test.text", "utf-8", (err, data) => {
  if (err) {
    console.log("Error: ", err);
  } else {
    console.log(data);
  }
});
console.log("This will be printed before the file is read");

// Non-Blocking request
const data = fs.readFileSync("./test.text", "utf-8");
console.log(data);
console.log("This will be printed after the file is read");
