import inquirer from "inquirer";
import fs from "fs";
import qr from "qr-image";

inquirer
  .prompt([{ message: "Enter your URL: ", name: "URL" }])
  .then((answers) => {
    const URL = answers.URL;
    const qrPng = qr.image(URL);
    qrPng.pipe(fs.createWriteStream("qr_image.png"));

    fs.writeFile("URL.txt", URL, (err) => {
      if (err) throw err;
      console.log("The file has been saved successfully");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Handle TTY error
    } else {
      // Handle other errors
    }
  });
