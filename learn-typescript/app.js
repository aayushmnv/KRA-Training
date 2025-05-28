"use strict";
// interface Admin extends User {
//     admin : string
// }
let obj = {
    name: "aaush",
    email: "sss",
    password: "sdjjj"
};
// 1. number, string, boolean
let age = 25;
let username = "Aayush";
let isOnline = true;
// 2 . unknown – like any, but safer
let data = "could be anything";
if (typeof data === "string") {
    console.log(data.toUpperCase());
}
// 3.  void – no return value
function logMessage(message) {
    console.log(message);
}
// 4. object
let person = {
    name: "Aayush",
    age: 22,
};
// 5.   Arrays
let scores = [90, 85, 88];
let names = ["Aayush", "Pandey"];
// 6. Tuples
let user = ["Aayush", 23]; // order matters (like fixed what we set)
// 7. Enums 
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
let move = Direction.Left; // value = 2
// 8. Union Types
let value = "hello";
value = 42;
let userInfo = {
    name: "Aayush",
    age: 23,
};
