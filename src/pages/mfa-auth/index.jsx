import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import { ButtonOutlined, ButtonPrimary } from "../../components/buttons";
import { InputField } from "../../components/inputField";
import { useAuth } from "../../contexts/authContext";

export function MFAAuthPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const { invalidCode, mfaAuthenticate } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCode = (value) => setCode(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = searchParams.get("user_id");

    mfaAuthenticate.mutate({
      code,
      userId,
    });
  };

  useEffect(() => {
    if (invalidCode) {
      setCode("");
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [invalidCode]);

  return (
    <main className="bg-slate-900 min-h-screen flex justify-center items-center">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <form
          className="bg-white p-3 flex flex-col w-96 gap-4 rounded"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="w-full h-10 border border-red-600 bg-red-300 flex  justify-center items-center">
              <p className="text-red-600 text-center text-sm font-medium">
                Invalid MFA code, please try again
              </p>
            </div>
          )}
          <InputField
            handleValue={handleCode}
            htmlFor="code"
            label="MFA Code"
            placeholder="Enter MFA Code"
          />

          <ButtonPrimary
            isLoading={mfaAuthenticate.isLoading}
            label="Send"
            disabled={mfaAuthenticate.isLoading || !code}
          />
        </form>
      </div>
    </main>
  );
}
