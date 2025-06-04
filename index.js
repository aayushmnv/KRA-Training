function inputValidation(name, age, dob) {

  try {
    if (typeof name !== "string") {
      throw new Error("name must be a string");
    }

    if (name.length > 40) {
      throw new Error("name must be 40 characters or less.");
    }

    for (let i = 0; i < name.length; i++) {
      const char = name[i];
      const charCode = char.charCodeAt(0);
      const isAlpha =
        (charCode >= 65 && charCode <= 90) ||
        (charCode >= 97 && charCode <= 122);
      const isSpace = char === " ";
      if (!isAlpha && !isSpace) {
        throw new Error("name Only alphabets and single spaces allowed");
      }
    }

    if (name.includes("  ")) {
      throw new Error("Multiple consecutive spaces are not allowed.");
    }

    if(typeof age!== "number" || isNaN(age)){
        throw new Error("Age must be a number")
    }

    if ( age < 1 || age > 110) {
      throw new Error("age must be in between 1 and 110.");
    }

    const dobDate = new Date(dob);
    // console.log(dobDate)
    if (isNaN(dobDate.getTime())) {
      throw new Error("Please enter a valid date.");
    }

    const today = new Date();
    const minDOB = new Date();
    minDOB.setFullYear(today.getFullYear() - 15);

    if (dobDate > minDOB) {
      throw new Error("you must be at least 15 years old.");
    }

    console.log("all inputs are valid!");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

inputValidation("Aayush", 26, "2000-09-12");

