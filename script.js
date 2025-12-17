// Select the form
const form = document.getElementById("registration-form");

// Select the feedback div
const feedbackDiv = document.getElementById("feedback");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Retrieve user inputs
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  let isValid = true;
  let messages = [];

  // Username validation
  if (username.length < 3) {
    isValid = false;
    messages.push("Username must be at least 3 characters long.");
  }

  // Email validation
  if (!email.includes("@")) {
    isValid = false;
    messages.push("Please enter a valid email address.");
  }

  // Password validation
  if (password.length < 8) {
    isValid = false;
    messages.push("Password must be at least 8 characters long.");
  }

  // Feedback display logic (VERY IMPORTANT FOR ALX)
  feedbackDiv.style.display = "block";

  if (isValid) {
    feedbackDiv.textContent = "Registration successful!";
    feedbackDiv.style.color = "#28a745";
  } else {
    feedbackDiv.innerHTML = messages.join("<br>");
    feedbackDiv.style.color = "#dc3545";
  }
});
