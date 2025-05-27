// ECMA Script 6 - All Features =>

// 1. let and const keywords : 

// a. Enables the users to define variables and on the other
// b. Let variables and constants have block scope which is 
// surrounded by curly-braces “{}” and cannot be used before
// declaration.
// c. Let can be re-assigned but cannot be re-declared 
// d. Const cannot be re-assigned neither re-declared

{
    // block of code

    // declare variable with let
    let name = "Peter";

    // can be accessed here
    console.log(name); // Peter
}

// can't be accessed here
console.log(name);
//Peter
// ERROR!
// ...
// ReferenceError: name is not defined

// 2. Arrow Functions

//  It provides a more concise syntax for writing 
//  function expressions by removing the “function” 
//  and “return” keywords.

//  Arrow functions are defined using the fat arrow (=>) notation.

// function expression
{ let product = function(x, y) {
  return x * y;
};

result = product(5, 10);

console.log(result);  } // 50

// function expression using arrow function
let product = (x, y) => x * y;

result = product(5, 10);

console.log(result);  // 50

// 3. Default Parameters

//  In ES6, users can provide the default values right in the signature
//  of the functions. 
// function to find sum of two numbers
function sum(numA, numB = 5) {

  // default value of numB is 5
  console.log(numA + numB);
};

// pass 10 to numA but
// don't pass value to numB
// numB takes default value 5
sum(10);  // 15

// pass 5 to numA and 15 to numB 
sum(5, 15);  // 20

// 4. Template Literals

//  ES6 introduces very simple string templates along with placeholders for 
//  the variables. The syntax for using the string template is ${PARAMETER} 
//  and is used inside of the back-ticked string.

const firstName = "Jack";
const lastName = "Sparrow";

console.log("Hello " + firstName + " " + lastName);

// Output: Hello Jack Sparrow

// 5. Destructuring 

//  The destructuring assignment is an expression that makes it easy to extract 
//  values from arrays, or properties from objects, into distinct variables.

const hospital = {
  doctors: 23,
  patients: 44,
};

let { doctors, patients } = hospital;

console.log(doctors);  // 23
console.log(patients);  // 44
// 6. Promises in JavaScript are objects that represent the eventual outcome of 
//  an asynchronous operation. They are a way to handle asynchronous code, making
//  it more manageable and readable compared to traditional callback functions.

//  Key Concepts:
// States:
// A promise can be in one of three states:
// Pending: The initial state, neither fulfilled nor rejected.
// Fulfilled (Resolved): The operation completed successfully,
// and a value is available.
// Rejected: The operation failed, and an error is available.
 
// Creation:
// Promises are created using the Promise constructor,
// which takes a function with resolve and reject parameters.
// Consumption:
// Promises are consumed using the then() method for success and
// the catch() method for failure. 
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const randomNumber = Math.random();
    if (randomNumber > 0.5) {
      resolve("Success: " + randomNumber);
    } else {
      reject("Failure: " + randomNumber);
    }
  }, 1000);
});

myPromise
  .then((message) => {
    console.log(message); // Handle success
  })
  .catch((error) => {
    console.error(error); // Handle failure
  })
  .finally(() => {
    console.log("Operation completed."); // Run always
  });

// 7. Classes 
//   Classes are Syntactic sugar over constructor functions ,are introduced
//   in ES6 which looks similar to classes in other object-oriented languages
 
//   we can declare a class using the new “class” keyword followed by the name of the class.

 // define a class named 'Person'
class Person {
  // class constructor to initialize the 'name' and 'age' properties
  constructor(name, age) {
      this.name = name;
      this.age = age;
  }
  
  // method to display a message
  greet() {
      console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

// create two instances of the Person class
let person1 = new Person("Jack", 30);
let person2 = new Person("Tina", 33);

// call greet() method on two instances 
person1.greet();
person2.greet();
