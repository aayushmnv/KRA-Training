 /* 
 Enums—TypeScript’s way of giving nice names to sets of numeric or string 
 constants. They’re super useful when you have a fixed set of related values and
 want your code to be more readable, safer, and more expressive. 
 */

 /* Enums allow you to define a named set of constants.
  Think of them like labeled categories.*/

  // Numeric Enums (Default)

   enum Status {
  Pending,    // 0
  InProgress, // 1
  Completed   // 2
}

let taskStatus: Status = Status.InProgress;
console.log(taskStatus); // 1

// we can also start from a custom number:

enum Code {
  Success = 200,
  NotFound = 404,
  ServerError = 500
}


// string enums 

enum Role {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST"
}

const currentUser: Role = Role.User;
console.log(currentUser); // "USER"
