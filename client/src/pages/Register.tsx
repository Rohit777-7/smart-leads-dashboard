import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await API.post(
        "/auth/register",
        {
          name,
          email,
          password,
          role: "admin",
        }
      );

      alert(
        "Registration Successful"
      );

      navigate("/");
    } catch (error) {
      console.log(error);

      alert(
        "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <form
          onSubmit={
            handleRegister
          }
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Enter Name"
            className="w-full border p-3 rounded-lg outline-none"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

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
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4">
          Already have account?

          <span
            onClick={() =>
              navigate("/")
            }
            className="text-blue-500 cursor-pointer ml-2"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;