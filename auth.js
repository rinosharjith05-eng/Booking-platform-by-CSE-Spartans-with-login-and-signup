// ---------- AUTH SCRIPT (CSE Spartans) ----------
// This version works perfectly on both local preview and GitHub Pages

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");

  // Utility to show messages
  function showMsg(id, text, color = "#fff") {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = text;
      el.style.color = color;
    }
  }

  // ----------------- SIGNUP -----------------
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim().toLowerCase();
      const password = document.getElementById("password").value;
      const confirm = document.getElementById("confirm").value;

      if (password !== confirm) {
        showMsg("signupMsg", "Passwords do not match", "salmon");
        return;
      }
      if (password.length < 6) {
        showMsg("signupMsg", "Password must be at least 6 characters", "salmon");
        return;
      }

      // Load or create user list
      let users = JSON.parse(localStorage.getItem("users") || "[]");

      // Check existing
      if (users.find((u) => u.email === email)) {
        showMsg("signupMsg", "Email already registered. Please login.", "salmon");
        return;
      }

      // Add new user
      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));

      showMsg("signupMsg", "Signup successful! Redirecting to login...", "#90EE90");
      setTimeout(() => {
        window.location.href = "./login.html"; // redirect
      }, 1200);
    });
  }

  // ----------------- LOGIN -----------------
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim().toLowerCase();
      const password = document.getElementById("loginPassword").value;

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u) => u.email === email && u.password === password);

      if (!user) {
        showMsg("loginMsg", "Invalid email or password", "salmon");
        return;
      }

      // Save current user
      localStorage.setItem("currentUser", JSON.stringify({ name: user.name, email: user.email }));

      showMsg("loginMsg", "Login successful! Redirecting...", "#90EE90");
      setTimeout(() => {
        window.location.href = "./index.html"; // redirect
      }, 1200);
    });
  }
});
