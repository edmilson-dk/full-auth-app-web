import { useState } from "react";
import { Link } from "react-router-dom";
import { ButtonOutlined, ButtonPrimary } from "../../components/buttons";

import { InputField } from "../../components/inputField";
import { useAuth } from "../../contexts/authContext";

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { signupMutation } = useAuth();

  const handleEmail = (value) => setEmail(value);
  const handlePassword = (value) => setPassword(value);
  const handleName = (value) => setName(value);

  const handleSubmit = (e) => {
    e.preventDefault();

    signupMutation.mutate({
      email,
      password,
      name,
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
            handleValue={handleName}
            htmlFor="name"
            label="Name"
            placeholder="Your name"
          />

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
            isLoading={signupMutation.isLoading}
            label="Sign Up"
            onClick={() => {}}
            disabled={signupMutation.isLoading || !email || !password || !name}
          />

          <p className="text-left text-gray-500 text-sm">
            Already have an account?
            <Link to="/login">
              <a className="text-blue-500 hover:text-blue-700 no-underline">
                Sign In
              </a>
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
