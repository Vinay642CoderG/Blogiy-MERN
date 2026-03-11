import AppRouter from "./routes/AppRouter";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./components/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            border: "1px solid lightgray",
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
