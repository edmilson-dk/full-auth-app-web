import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";

import { AppRoutes } from "./routes";

import "./styles/globals.css";
import { AuthContextProvider } from "./contexts/authContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <AppRoutes />
        <Toaster
          position="top-center"
          reverseOrder={false}
          containerStyle={{
            zIndex: 9999999,
          }}
        />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
