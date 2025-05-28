"use strict";
/*
Enums—TypeScript’s way of giving nice names to sets of numeric or string
constants. They’re super useful when you have a fixed set of related values and
want your code to be more readable, safer, and more expressive.
*/
/* Enums allow you to define a named set of constants.
 Think of them like labeled categories.*/
// Numeric Enums (Default)
var Status;
(function (Status) {
    Status[Status["Pending"] = 0] = "Pending";
    Status[Status["InProgress"] = 1] = "InProgress";
    Status[Status["Completed"] = 2] = "Completed"; // 2
})(Status || (Status = {}));
let taskStatus = Status.InProgress;
console.log(taskStatus); // 1
// we can also start from a custom number:
var Code;
(function (Code) {
    Code[Code["Success"] = 200] = "Success";
    Code[Code["NotFound"] = 404] = "NotFound";
    Code[Code["ServerError"] = 500] = "ServerError";
})(Code || (Code = {}));
// string enums 
var Role;
(function (Role) {
    Role["Admin"] = "ADMIN";
    Role["User"] = "USER";
    Role["Guest"] = "GUEST";
})(Role || (Role = {}));
const currentUser = Role.User;
console.log(currentUser); // "USER"
