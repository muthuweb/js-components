/* console.log("testing");
console.log(console);
console.log(location); */
/* 
if (location.search) {
  console.log(true);
} else {
  console.log(false);
} */

/* console.log("History :", history);
console.log("Navigator :", navigator); */

/*
Create a self invoke function and store to a variable
to call any of it's properties from global
*/
/*jslint devel: true */
var app = (function () {
  "use strict";
  function init(message) {
    console.log("This is from init function, available from", message);
  }
  //This function will be available in local only
  function verify() {
    console.log("This is verify function");
  }

  return {
    init:init, // equivalent of init:init, this will be available for global scope.
  };
}());
