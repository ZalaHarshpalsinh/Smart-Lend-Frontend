import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../../services/authService";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "borrower",
    mobile: "",
    limit: "",
    passwordVisible: false,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const togglePassword = () =>
    setForm((prev) => ({ ...prev, passwordVisible: !prev.passwordVisible }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signup(form);
    setLoading(false);

    if (res.success) {
      navigate("/login");
    } else {
      alert(res.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Create an Account
        </h2>

        <div className="space-y-4">
          <input
            name="name"
            type="text"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <div className="relative">
            <input
              name="password"
              type={form.passwordVisible ? "text" : "password"}
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-3 text-gray-500 hover:text-indigo-600 transition"
            >
              {form.passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <select
            name="role"
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="borrower">Borrower</option>
            <option value="lender">Lender</option>
          </select>

          <input
            name="mobile"
            type="text"
            placeholder="Mobile Number"
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />

          {form.role === "lender" && (
            <input
              name="limit"
              type="number"
              min={1000}
              placeholder="Investment Limit (Min ₹1000)"
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          {loading && <Loader2 className="animate-spin" size={18} />}
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 transition">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}