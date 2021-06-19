const axios = require("axios");

const url = "http://localhost:5000/constellations";
let didSomething = false;

/************  DO THIS 1    *************
 * Write code to print the same data we
 * saw from postman to the console!
 ***************************************/

//
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

//
//doThis2(); //uncomment this line to run solution

function doThis2() {
  axios
    .get(url)
    .then((response) => {
      console.log(response.status);
      console.log(response.statusText);
      _printStars(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  const _printStars = (data, planetCount = 10) => {
    console.log(
      `Below is a list of all the constellations with less than ${planetCount} planets:\n`
    );
    dataArray = data.filter((star) => star["starsWithPlanets"] < planetCount);
    console.log(dataArray);
  };

  didSomething = true;
}
/**/

/****************       DO THIS 3           ****************** 
 * 1) Create a new Constellation with Axios
 * 2) Print that Constellation
 * 3) Delete that Constellation 
 * 4) Tell me it has been deleted
 * 5) Attempt to access deleted Constellation -- Expect a 404
/*************************************************************/

//
doThis3(); //uncomment this line to access, add, and delete some data!

function doThis3() {
  //start of "main()"
  /////////////////////////////////////////////////////////////////////////////////////////////////////

  //Let's make sure we have the URL and can access it
  axios
    // *** //  ACCESS STARS  // *** //
    .get(url)
    .then((allStars) => {
      //Did we access the URL correctly?
      console.log(`${allStars.status}: ${allStars.statusText}`);
      const accessed =
        allStars.status === 200
          ? `You have successfully accessed ${url}`
          : `we could not access ${url}`;
      console.log(accessed, "\n");

      // *** //  ADD A NEW STAR  // *** //
      _addStar()
        //After adding the star, let's print all the constellations
        .then((myStar) => {
          console.log(`List of all Constellations:`);
          console.log(allStars.data, "\n");

          const starURL = `${url}/${myStar.id}`;
          // *** //  DELETE THE NEWLY ADDED STAR // *** //
          _deleteStar(starURL, myStar)
            //after deleting the one we just added, attempt to access it and expect a 404
            .then(() => {
              console.log(
                `We will now attempt to access the deleted ${myStar.name} @ ${myStar.id}`
              );
              //And finally, let's check to see if we get a 404 with a get request to the deleted url
              return _getDeletedStar(starURL)
                .then(() => console.log("You shouldn't see this message..."))
                .catch((error) => `Error: ${error}`);
            })
            //If we bodge the delete, we nee to error catch
            .catch((error) => {
              console.log(
                `We could not delete "${myStar.name}" @ ${myStar.id}\nError: ${error}`
              );
            });
        });
    })
    //If we cannot access the URL, we need to error catch
    .catch((error) =>
      console.log(`Could not retrieve ${url}\nError :${error}`)
    );

  //End of "main"
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //Helper function which will post  myConstellation to the provided URL
  function _addStar(_url = url) {
    // A Star Platinum constellation obj that we will add
    const myConstellation = {
      name: "Star Platinum",
      meaning: "Punch",
      starsWithPlanets: 6,
      quadrant: "SC2",
    };
    //post our new obj at the provided url and return it's data
    return axios.post(_url, myConstellation).then((response) => {
      //did we successful create a new Constellation?
      console.log(`${response.status}: ${response.statusText}`);
      const posted =
        response.status === 201
          ? `You have successfully added "${response.data.name}" @ id: ${response.data.id}`
          : `we could not post "${response.data.name}" to ${url}`;
      console.log(posted, "\n");
      //return our newly posted star as a promise
      return response.data;
    });
  }

  //Helper function to delete data at a given url
  function _deleteStar(_url, myStar) {
    //Let's make sure the params are all good before we go deleting all willy-nilly, mm'kay?
    if (!_url || !myStar) {
      console.log(
        "Please provide the _deleteStar helper function with a url to send the delete request to, and a promise with the star we are deleting!"
      );
      return -1;
    }
    console.log(`Now attempting to delete "${myStar.name}" @ ${myStar.id}...`);
    //delete the obj at the provided url, tell the console it has been deleted, then return the whole promise
    return axios.delete(_url).then((deleted) => {
      console.log(
        `You have successfully deleted "${myStar.name}" @ ${myStar.id}!\n`
      );
      return deleted;
    });
  }

  function _getDeletedStar(_url) {
    return axios.get(_url).then((response) => {
      //If everything went according to plan we should get a 404 error
      console.log(`${response.status}: ${response.statusText}`);
      return response;
    });
  }

  //Unused helper function to get the last constellation for testing purposes.
  function _findLastStar(allStars) {
    const myStar = allStars.data[allStars.data.length - 1];
    console.log(
      `The last Constellation added was "${myStar.name}" @ id: ${myStar.id}`
    );
    return myStar;
  }

  didSomething = true;
}

/**************************************
 * END OF THE ROAD BUB!
 * Hope you uncommented something,
 *  or you're in for a rude awakening!
 **************************************/

if (!didSomething)
  console.log(
    "You didn't read my code, did you?\n" +
      "Just take a quick look and you'll find large comment blocks with single line comments beneath them.\n" +
      "Uncomment some of these single line comments to do stuff!"
  );
