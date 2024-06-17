const express = require('express');
const jwt = require('jsonwebtoken');
const books = require("./booksdb.js");
const regd_users = express.Router();
let users = [];

// Function to check if a username is valid (placeholder function)
const isValid = (username) => {
  return users.some(user => user.username === username);
}

// Function to authenticate user credentials (placeholder function)
const authenticatedUser = (username, password) => {
  // console.log(user.username);
  return users.some(user => user.username === username && user.password === password);
}

// Task 7: Endpoint for user login 
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required"
    });
  }

  // Check if the user exists and credentials are valid
  if (authenticatedUser(username, password)) {
    // Create and sign a JWT token
    const token = jwt.sign({ username }, 'fingerprint_customer', { expiresIn: '1h' });

    // Store the token in session
    req.session.token = token;
    console.log(token);

    res.status(200).json({
      message: "Login successful", token
    });
  } else {
    res.status(401).json({
      message: "Invalid username or password"
    });
  }
});

// Task 8: Endpoint to add or modify a review for a book
regd_users.put("/auth/review/:isbn", (req, res) => {
  const username = req.user.username; // Access user data
  const { isbn } = req.params;
  const { review } = req.body;

  let bookReviews = books[isbn].reviews;

  if (bookReviews.hasOwnProperty(username)) {
    // If the user has already reviewed, update the review
    bookReviews[username] = review;
    return res.status(200).json({
      message: "Review modified successfully",
      bookReviews
    });
  } else {
    // If the user hasn't reviewed yet, add a new review
    bookReviews[username] = review;
    return res.status(200).json({
      message: "Review added successfully",
      bookReviews
    });
  }
});

// Task 9: Endpoint to delete a review for a book
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const username = req.user.username;

  let bookReviews = books[isbn].reviews;

  // Delete the review
  delete bookReviews[username];

  res.status(200).json({
    message: "Review deleted successfully",
    bookReviews
  });
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
