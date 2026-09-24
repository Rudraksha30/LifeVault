import mockUsers from "../data/mockUsers";

const USERS_KEY = "lifevault_users";

const CURRENT_USER_KEY = "lifevault_current_user";

// --------------------------------------------------
// GET USERS
// --------------------------------------------------

function getUsers() {
  const storedUsers = localStorage.getItem(USERS_KEY);

  if (!storedUsers) {
    localStorage.setItem(USERS_KEY, JSON.stringify(mockUsers));

    return mockUsers;
  }

  try {
    return JSON.parse(storedUsers);
  } catch (error) {
    console.error("Unable to read stored users:", error);

    localStorage.setItem(USERS_KEY, JSON.stringify(mockUsers));

    return mockUsers;
  }
}

// --------------------------------------------------
// SAVE USERS
// --------------------------------------------------

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// --------------------------------------------------
// REGISTER
// --------------------------------------------------

export function registerUser(userData) {
  const users = getUsers();

  // Check duplicate email
  const emailExists = users.some(
    (user) => user.email.toLowerCase() === userData.email.toLowerCase(),
  );

  if (emailExists) {
    return {
      success: false,
      message: "An account with this email already exists.",
    };
  }

  // Check duplicate username
  const usernameExists = users.some(
    (user) =>
      user.username &&
      user.username.toLowerCase() === userData.username.toLowerCase(),
  );

  if (usernameExists) {
    return {
      success: false,
      message: "This username is already taken.",
    };
  }

  const newUser = {
    id: Date.now(),
    name: userData.name,
    username: userData.username,
    email: userData.email,
    phone: userData.phone,
    password: userData.password,
    role: "USER",
    status: "active",
  };

  users.push(newUser);

  saveUsers(users);

  // Do not return the password to React
  const { password: _, ...safeUser } = newUser;

  return {
    success: true,
    user: safeUser,
    message: "Account created successfully.",
  };
}

// --------------------------------------------------
// LOGIN
// --------------------------------------------------

export function loginUser(email, password) {
  const users = getUsers();

  const user = users.find(
    (item) =>
      item.email.toLowerCase() === email.toLowerCase() &&
      item.password === password,
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  // Prevent inactive users from logging in
  if (user.status === "inactive") {
    return {
      success: false,
      message:
        "Your account has been deactivated. Please contact the administrator.",
    };
  }

  // Never store password in current logged-in user
  const { password: _, ...safeUser } = user;

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));

  return {
    success: true,
    user: safeUser,
  };
}

// --------------------------------------------------
// GET CURRENT USER
// --------------------------------------------------

export function getCurrentUser() {
  const storedUser = localStorage.getItem(CURRENT_USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Unable to read current user:", error);

    localStorage.removeItem(CURRENT_USER_KEY);

    return null;
  }
}

// --------------------------------------------------
// UPDATE USER PROFILE
// --------------------------------------------------

export function updateUserProfile(userId, profileData) {
  const users = getUsers();

  const userIndex = users.findIndex((item) => item.id === userId);

  if (userIndex === -1) {
    return {
      success: false,
      message: "User account not found.",
    };
  }

  const existingUser = users[userIndex];

  // Email is intentionally not updated here.
  const updatedUser = {
    ...existingUser,
    name: profileData.name,
  };

  users[userIndex] = updatedUser;

  saveUsers(users);

  // Remove password before storing current user
  const { password: _, ...safeUser } = updatedUser;

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));

  return {
    success: true,
    user: safeUser,
    message: "Profile changes saved successfully.",
  };
}

// --------------------------------------------------
// LOGOUT
// --------------------------------------------------

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

// --------------------------------------------------
// CLEAR AUTH DATA
// --------------------------------------------------

export function clearAllAuthData() {
  localStorage.removeItem(CURRENT_USER_KEY);
}
