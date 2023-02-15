import liff from "@line/liff";
import React, { useContext, useEffect, useState } from "react";
import Lottie from "react-lottie";
import animationData from "../assets/69209-olympics.json";

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

  if (!isReady)
    return (
      <div className="w-screen h-screen flex -mt-[16px] flex-col justify-center items-center">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData,
          }}
          height={210}
          width={220}
        />
        กำลังโหลด...
      </div>
    );
  return (
    <UserContext.Provider value={{ isReady, profile }}>
      {children}
    </UserContext.Provider>
  );
};
