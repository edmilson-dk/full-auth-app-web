import { useState } from "react";
import { Link } from "react-router-dom";
import { ButtonOutlined, ButtonPrimary } from "../../components/buttons";

import { InputField } from "../../components/inputField";
import { useAuth } from "../../contexts/authContext";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginMutation } = useAuth();

  const handleEmail = (value) => setEmail(value);
  const handlePassword = (value) => setPassword(value);

  const handleSubmit = (e) => {
    e.preventDefault();

    loginMutation.mutate({
      email,
      password,
    });
  };

  return (
    <main className="bg-slate-900 min-h-screen flex justify-center items-center">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <form
          className="bg-white p-3 flex flex-col w-96 gap-4 rounded"
          onSubmit={handleSubmit}
        >
          <InputField
            handleValue={handleEmail}
            htmlFor="email"
            label="Email"
            placeholder="Your email"
            type="email"
          />

          <InputField
            handleValue={handlePassword}
            htmlFor="password"
            label="Password"
            placeholder="Your password"
          />

          <ButtonPrimary
            isLoading={loginMutation.isLoading}
            label="Sign In"
            onClick={() => {}}
            disabled={loginMutation.isLoading || !email || !password}
          />

          <p className="text-left text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link to="/register">
              <a className="text-blue-500 hover:text-blue-700 no-underline">
                Sign Up
              </a>
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
