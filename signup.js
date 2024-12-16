// Handle the sign-up process
document.getElementById("signup-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    // Create the user in Firebase Authentication
    const userCredential = await auth.createUserWithEmailAndPassword(username, password);
    const user = userCredential.user;

    // Optionally save user info in Firestore (e.g., for additional data)
    await db.collection("users").doc(user.uid).set({
      email: user.email,
      createdAt: new Date(),
    });

    document.getElementById("message").textContent = "Sign-up successful!";
    console.log("User created:", user);
  } catch (error) {
    // Handle errors
    console.error("Error signing up:", error);
    document.getElementById("message").textContent = `Error: ${error.message}`;
  }
});
