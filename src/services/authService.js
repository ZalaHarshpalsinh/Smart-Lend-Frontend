// const API_URL = `${import.meta.env.VITE_BACKEND_URL}api/auth`;

// export const login = async (email, password) => {
//   const res = await fetch(`${API_URL}/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });
//   const data = await res.json();
//   if (res.ok) {
//     localStorage.setItem("token", data.token);
//   }
//   return data;
// };

// export const signup = async (formData) => {
//   const res = await fetch(`${API_URL}/signup`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(formData),
//   });
//   return await res.json();
// };

// export const getToken = () => localStorage.getItem("token");

// export const logout = () => localStorage.removeItem("token");

// Mock token generator with email, role, and password
const generateMockToken = (user) => {
  const payload = {
    email: user.email,
    role: user.role,
    password: user.password, // Only for mock purposes!
    exp: Date.now() + 3600 * 1000,
  };
  return btoa(JSON.stringify(payload)); // Base64 encode
};

const mockUsers = [
  {
    email: "lender@example.com",
    password: "password123",
    role: "lender",
    name: "Lender User",
  },
  {
    email: "borrower@example.com",
    password: "password123",
    role: "borrower",
    name: "Borrower User",
  },
];

export const login = async (email, password) => {
  await new Promise((res) => setTimeout(res, 800));
  console.log("email: " + email, password);
  const user = mockUsers.find(
    (u) => u.email == email && u.password == password
  );

  console.log(user);
  if (user) {
    const token = generateMockToken(user);
    localStorage.setItem("token", token);
    return {
      success: true,
      token,
      user: { email: user.email, role: user.role, name: user.name },
    };
  }

  return { success: false, message: "Invalid email or password" };
};

export const signup = async (formData) => {
  await new Promise((res) => setTimeout(res, 800));

  const exists = mockUsers.some((u) => u.email === formData.email);
  if (exists) {
    return { success: false, message: "User already exists" };
  }

  mockUsers.push(formData);
  console.log(mockUsers);
  return { success: true, message: "Signup successful" };
};

export const getToken = () => localStorage.getItem("token");

export const logout = () => localStorage.removeItem("token");

export const getUserRoleFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token));
    return payload.role;
  } catch (error) {
    console.error("Invalid token format", error);
    return null;
  }
};