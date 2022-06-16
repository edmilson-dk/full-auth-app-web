import { createContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { API } from "../services/api";
import { useCallback } from "react";
import { useContext } from "react";

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [invalidCode, setInvalidCode] = useState(false);

  const handleLoginSuccess = ({ token, user }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
    toast.success("Login successful");

    window.location.href = "/";
  };

  const loginMutation = useMutation(
    ({ email, password }) => {
      return API.post("/user/login", {
        email,
        password,
      });
    },
    {
      onSuccess: ({ data }) => {
        if (data.useMfa) {
          window.location.href = `/mfa-auth?user_id=${data.user.id}`;
          return;
        }

        if (!data.token || !data.user) {
          toast.error("Invalid credentials");
          return;
        }

        handleLoginSuccess(data);
      },
      onError: ({ data }) => {
        toast.error(data.error);
      },
    }
  );

  const signupMutation = useMutation(
    ({ name, email, password }) => {
      return API.post("/user/signup", {
        name,
        email,
        password,
      });
    },
    {
      onSuccess: ({ data }) => {
        console.log(data);
        if (!data.token || !data.user) {
          toast.error("Invalid credentials");
          return;
        }

        handleLoginSuccess(data);
      },
      onError: ({ data }) => {
        toast.error(data.error);
      },
    }
  );

  const setupMfa = useMutation(() => {
    return API.post("/user/mfa/setup");
  });

  const enableMfa = useMutation(({ code }) => {
    return API.post("/user/mfa/enable", {
      code,
    });
  });

  const mfaAuthenticate = useMutation(
    ({ code, userId }) => {
      return API.post("/user/mfa/authenticate", {
        code,
        userId,
      });
    },
    {
      onSuccess: ({ data }) => {
        setInvalidCode(!data.valid);

        if (data.valid) {
          handleLoginSuccess(data);
          toast.success("Login successful");
          return;
        }

        toast.error("Invalid MFA code");
        return;
      },
      onError: ({ data }) => {
        toast.error(data.error);
        return;
      },
    }
  );

  const disableMfa = useMutation(
    () => {
      return API.post("/user/mfa/disable");
    },
    {
      onSuccess: () => {
        toast.success("MFA disabled");
      },
      onError: ({ data }) => {
        toast.error("Unexpected error");
      },
    }
  );

  const validateUserSession = useCallback(async () => {
    const { data } = await API.get("/user/validate");
    return data && data.valid;
  }, []);

  function getUserLocalData() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setUser(user);
    }

    return user;
  }

  async function getApiUserData() {
    const { data } = await API.get("/user/me");
    return data;
  }

  const getUserDataMutation = useMutation(() => {
    return getApiUserData();
  });

  const logout = useCallback(() => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/login";
  }, []);

  useEffect(() => {
    getUserLocalData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loginMutation,
        signupMutation,
        user,
        getUserLocalData,
        validateUserSession,
        getUserDataMutation,
        setupMfa,
        enableMfa,
        logout,
        invalidCode,
        mfaAuthenticate,
        disableMfa,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
