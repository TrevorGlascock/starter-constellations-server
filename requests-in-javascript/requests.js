const axios = require("axios");

const url = "http://localhost:5000/constellations";
let didSomething = false;

/************  DO THIS 1    *************
 * Write code to print the same data we
 * saw from postman to the console!
 ***************************************/

//doThis1(); //uncomment this line to run example

function doThis1() {
  axios
    .get(url)
    .then((response) => {
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
  didSomething = true;
}
/**/

/*********       DO THIS 2           *********** 
 * try writing code that will print out an 
 * array of only those constellations where the 
 * starsWithPlanets value is less than 10. 
/***********************************************/

doThis2(); //uncomment this line to run solution

function doThis2() {
  axios
    .get(url)
    .then((response) => {
      console.log(response.status);
      console.log(response.statusText);
      printStars(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  printStars = (data, planetCount = 10) => {
    console.log(
      `Below is a list of all the constellations with less than ${planetCount} planets:\n`
    );
    dataArray = data.filter((item) => item["starsWithPlanets"] < planetCount);
    console.log(dataArray);
  };

  didSomething = true;
}
/**/

if (!didSomething)
  console.log(
    "You didn't read my code, did you?\n" +
      "Just take a quick look and you'll find large comment blocks with single line comments beneath them.\n" +
      "Uncomment some of these single line comments to do stuff!"
  );
