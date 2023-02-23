import { Button } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../common/api";

export function FindFitness() {
  const navigate = useNavigate();
  const [personalLocation, setPersonalLocation] = useState("");

  // get their peronalLocation first
  const onSubmit = async () => {
    // await api.post("/assistance/createuser", {
    //   personalLocation
    // });
    navigate("/fitnesslist");
  };

  return (
    <div className="font-line flex flex-col space-y-10 my-5 p-5">
      <h1 className="text-xl text-center">แนะนำสถานที่ออกกำลังกาย</h1>
      <div>
        <h2 className="text-lg ml-5">ตำแหน่งของคุณคือ</h2>
        {/* your current position and switching button */}
      </div>
      {/* display map and let user click to edit their location */}
      <div className="m-10 text-center color-blueDark">
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
            ตกลง
          </Button>
        </Link>
      </div>
    </div>
  );
}
