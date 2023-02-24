import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../common/api";
import animationData from "../../assets/69209-olympics.json";
import Lottie from "react-lottie";

export function FindFitness() {
  const navigate = useNavigate();
  const [personalLocation, setPersonalLocation] = useState("");

  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const res = await api.post("/engage/geocode", {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setPersonalLocation(res.data.results[0].formatted_address);
        });
      } else {
        setPersonalLocation("Geolocation is not supported by this browser.");
      }
    };
    getLocation();
  }, []);

  // get their peronalLocation first
  const onSubmit = async () => {
    // await api.post("/assistance/createuser", {
    //   personalLocation
    // });
    navigate("/fitnesslist");
  };

  if (!personalLocation)
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
          speed={2}
        />
        กำลังโหลด...
      </div>
    );
  return (
    <div className="font-line flex flex-col space-y-2 gap-2 my-5 p-5">
      <h1 className="text-2xl font-bold text-blueDark text-center">
        แนะนำสถานที่ออกกำลังกาย
      </h1>
      <div className="flex gap-4 flex-col sm:flex-row">
        <h2 className="text-lg text-center flex-shrink-0 font-bold">
          ตำแหน่งของคุณคือ
        </h2>
        <h3 className="text-lg text-center">{personalLocation}</h3>
      </div>
      {/* display map and let user click to edit their location */}
      <button className="flex justify-center text-sm text-center underline underline-offset-2">
        แก้ไขตำแหน่ง
      </button>
      <div className="text-center color-blueDark">
        <Link to="/fitnesslist">
          {/* Temporary Link to FitnessList, remove when location feature is completed */}
          <Button
            variant="contained"
            sx={{
              bgcolor: "#0F044C",
              "&:hover": { backgroundColor: "#0F044C" },
            }}
            fullWidth
            onClick={onSubmit}
          >
            ดำเนินการต่อ
          </Button>
        </Link>
      </div>
    </div>
  );
}
