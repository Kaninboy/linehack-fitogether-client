import "./App.css";
import { Route, Routes } from "react-router-dom";
import { CheckIn } from "./Checkin";
import liff from "@line/liff";
import { useEffect } from "react";
import React from "react";

export interface User {
  userId: string;
  displayName: string;
  pictureUrl: string;
}

const UserContext = React.createContext<{
  isReady: boolean;
  user: User | null;
}>({ isReady: false, user: null });
interface UserContextProps {
  children: React.ReactNode;
}
function UserContextProvider(props: UserContextProps) {
  const { children } = props;
  const [isReady, setIsReady] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  useEffect(() => {
    async function init() {
      await liff.init({
        liffId: "1657898837-o0mD9EkV",
      });
      if (!liff.isLoggedIn()) liff.login();
      setUser((await liff.getProfile()) as User);
      setIsReady(true);
    }
    init();
  }, []);

  if (!isReady) return <div>Loading...</div>;
  return (
    <UserContext.Provider value={{ isReady, user }}>
      {children}
    </UserContext.Provider>
  );
}
export const useUser = () => React.useContext(UserContext);

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
