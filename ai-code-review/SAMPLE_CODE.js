// Sample code file for testing the AI Code Review Platform
// This file contains intentional code issues to demonstrate the analyzer

// Issue 1: Using var instead of let/const
var globalCounter = 0;
var debugMode = true;

// Issue 2: Unused variables
var unusedConfig = {
  timeout: 5000,
  retries: 3,
};

const unusedHelper = () => {
  return "This function is never called";
};

// Issue 3: Long function
function processUserData(userData) {
  console.log("Processing user data");
  let users = [];
  
  // Nested loops - Performance issue
  for (let i = 0; i < userData.length; i++) {
    for (let j = 0; j < userData[i].permissions.length; j++) {
      if (userData[i].permissions[j] === "admin") {
        console.log("Admin found");
      }
      if (userData[i].permissions[j] === "user") {
        console.log("User found");
      }
      if (userData[i].permissions[j] === "guest") {
        console.log("Guest found");
      }
    }
  }

  // Complex conditional logic
  if (userData.length > 0) {
    if (userData[0].active === true) {
      if (userData[0].verified === true) {
        if (userData[0].premium === true) {
          console.log("Premium user");
        } else {
          console.log("Regular user");
        }
      }
    }
  }

  return users;
}

// Issue 4: Magic numbers
function calculateDiscount(price) {
  if (price > 1000) {
    return price * 0.15;
  }
  if (price > 500) {
    return price * 0.10;
  }
  if (price > 100) {
    return price * 0.05;
  }
  return price;
}

// Better approach (for reference):
// const DISCOUNT_TIERS = {
//   PREMIUM: { minPrice: 1000, rate: 0.15 },
//   STANDARD: { minPrice: 500, rate: 0.10 },
//   BASIC: { minPrice: 100, rate: 0.05 },
// };

// Missing error handling
function parseJSON(jsonString) {
  const data = JSON.parse(jsonString);
  return data.user.profile.name;
}

// Issue 5: Multiple console.log statements
console.log("Initializing app");
console.log("Loading configuration");
console.log("Starting services");

module.exports = {
  processUserData,
  calculateDiscount,
  parseJSON,
  globalCounter,
  debugMode,
};
