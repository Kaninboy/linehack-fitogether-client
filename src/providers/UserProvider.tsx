import liff from "@line/liff";
import React, { useContext, useEffect, useState } from "react";

export interface Profile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

const UserContext = React.createContext<{
  isReady: boolean;
  profile: Profile | null;
}>({ isReady: false, profile: null });

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: React.ReactNode;
}
export const UserProvider = (props: UserProviderProps) => {
  const { children } = props;
  const [isReady, setIsReady] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function init() {
      await liff.init({
        liffId: "1657898837-o0mD9EkV",
      });
      if (!liff.isLoggedIn()) {
        liff.login();
      }

      const profile = await liff.getProfile();
      setProfile(profile);

      setIsReady(true);
    }
    init();
  }, []);

  if (!isReady) return <div>Loading...</div>;
  return (
    <UserContext.Provider value={{ isReady, profile }}>
      {children}
    </UserContext.Provider>
  );
};
