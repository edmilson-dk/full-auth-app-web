import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { ButtonOutlined, ButtonPrimary } from "../../components/buttons";
import { InputField } from "../../components/inputField";
import { useAuth } from "../../contexts/authContext";

export function Dashboard() {
  const [user, setUser] = useState(null);
  const [qrcode, setQrcode] = useState(null);
  const [code, setCode] = useState(null);

  const { getUserDataMutation, setupMfa, enableMfa, logout, disableMfa } =
    useAuth();

  useEffect(() => {
    (async () => {
      const result = await getUserDataMutation.mutateAsync();
      setUser(result);
    })();
  }, []);

  async function handleSetupMfa() {
    const { data } = await setupMfa.mutateAsync();

    if (data.haveSecret) {
      const result = await getUserDataMutation.mutateAsync();
      setUser(result);
      return;
    }

    setQrcode(data.qrCode);
  }

  async function handleEnableMfa() {
    const { data } = await enableMfa.mutateAsync({ code });
    const result = await getUserDataMutation.mutateAsync();
    setUser(result);

    if (data.enabled) {
      toast.success("MFA enabled");
      setQrcode(null);
      return;
    }

    toast.error("MFA not enabled");
  }

  async function handleDisableMfa() {
    await disableMfa.mutateAsync();
    const result = await getUserDataMutation.mutateAsync();
    setUser(result);
  }

  return (
    <main className="bg-slate-900 min-h-screen flex justify-center items-center">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <div className="bg-white p-3 flex flex-col w-96 gap-4 rounded">
          {getUserDataMutation.isLoading || !user ? (
            <div>Loading...</div>
          ) : (
            <>
              <h1 className="text-2xl text-center">Dashboard</h1>
              <p className="text-left text-gray-500 text-base">
                Username:{" "}
                <span className="text-blue-500 font-semibold">
                  {user?.name}
                </span>
              </p>
              <p className="text-left text-gray-500 text-base">
                Email:{" "}
                <span className="text-blue-500 font-semibold">
                  {user?.email}
                </span>
              </p>

              {qrcode && (
                <div className="w-full flex flex-col justify-center items-center">
                  <img src={qrcode} alt="qrcode" />

                  <InputField
                    handleValue={(value) => setCode(value)}
                    htmlFor="code"
                    label="Code"
                    placeholder="Your Two Factor Code"
                  />
                </div>
              )}

              {!user.activeMfa && !qrcode && (
                <ButtonPrimary
                  label="Enable MFA"
                  onClick={handleSetupMfa}
                  type="button"
                  isLoading={setupMfa.isLoading}
                />
              )}

              {!user.activeMfa && qrcode && (
                <ButtonOutlined
                  label="Confirm MFA"
                  onClick={handleEnableMfa}
                  type="button"
                  isLoading={enableMfa.isLoading}
                />
              )}

              {user.activeMfa && (
                <ButtonPrimary
                  label="Disable MFA"
                  onClick={handleDisableMfa}
                  type="button"
                  isLoading={disableMfa.isLoading}
                  theme="danger"
                />
              )}

              <ButtonOutlined
                label="Logout"
                onClick={() => {
                  logout();
                }}
                type="button"
                theme="danger"
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
