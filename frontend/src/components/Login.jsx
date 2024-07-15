import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      console.log(result);
      setUser(result);
      Navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <div className="flex h-screen w-full justify-center items-center">
      <form
        className="flex flex-col w-[50%] h-[350px] items-center gap-8"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-[80%] h-[80px]  border-4 px-[20px] py-[10px] text-xl"
        />
        <button
          type="submit"
          className="w-[50%] bg-blue-600 font-bold h-20 rounded "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
