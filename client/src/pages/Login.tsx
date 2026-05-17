import { useState } from "react";
import API from "../services/api";
import {
  useNavigate,
  Link,
} from "react-router-dom";


const Login = ({ setToken }: { setToken: (token: string) => void }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      console.log(res.data);
      if (res.data.token && res.data.user) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setToken(res.data.token);
        navigate("/dashboard", { replace: true });
      } else {
        alert("Token or user info not found");
      }
    } catch (error: any) {
      console.log(error);
      alert(error.response?.data?.message || "Login Failed");
    }
  };

    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border p-3 rounded-lg outline-none"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full border p-3 rounded-lg outline-none"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don’t have account?

          <Link
            to="/register"
            className="text-blue-500 ml-2"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;