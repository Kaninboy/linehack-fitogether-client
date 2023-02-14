import { useEffect, useState } from "react";

import liff from "@line/liff";
import axios from "axios";
import { useUser } from "../../providers/UserProvider";

const LOCATIONS = ["สถานที่ 1", "สถานที่ 2", "สถานที่ 3"];

interface SelectLocationProps {
  location: string;
  setLocation: (location: string) => void;
  setStage: (stage: number) => void;
}
export function SelectLocation(props: SelectLocationProps) {
  const { location, setLocation, setStage } = props;
  return (
    <div>
      <p>เลือกสถานที่</p>
      {LOCATIONS.map((l) => (
        <>
          <input
            key={l}
            type="radio"
            name="location"
            onChange={() => setLocation(l)}
            checked={l === location}
            id={l}
          />
          <label htmlFor={l}>{l}</label>
        </>
      ))}
      <button onClick={() => setStage(1)}>{location ? "ถัดไป" : "ข้าม"}</button>
    </div>
  );
}

interface SaveAndShareProps {
  setStage: (stage: number) => void;
}
export function SaveAndShare(props: SaveAndShareProps) {
  const { setStage } = props;

  return (
    <div>
      <button
        onClick={() => {
          setStage(2);
        }}
      >
        บันทึกและแชร์
      </button>
    </div>
  );
}

export function CheckIn() {
  const { profile } = useUser();
  const [stage, setStage] = useState(0);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const checkIn = async () => {
      await axios.post(
        "https://thana-dev.thanayut.in.th/api/engage/checkin",
        {
          location: location,
        },
        {
          headers: {
            Authorization: `Bearer ${liff.getAccessToken()}`,
          },
        }
      );
      liff.closeWindow();
    };
    if (stage === 2) checkIn();
  }, [stage]);

  return (
    <div>
      <p>Hi {profile?.displayName}</p>
      {stage === 0 && (
        <SelectLocation
          location={location}
          setLocation={setLocation}
          setStage={setStage}
        />
      )}
      {stage === 1 && <SaveAndShare setStage={setStage} />}
    </div>
  );
}
