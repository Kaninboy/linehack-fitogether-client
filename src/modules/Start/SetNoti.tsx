import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../../common/api";

function TimePickerPage() {
  const [breakfastTime, setBreakfastTime] = useState("00:00:00");
  const [lunchTime, setLunchTime] = useState("00:00:00");
  const [dinnerTime, setDinnerTime] = useState("00:00:00");
  const navigate = useNavigate();

  const handleEnter = async () => {
    await api.post("/assistance/updatenotification", { breakfast: breakfastTime, lunch: lunchTime, dinner: dinnerTime });
    navigate("/")
  };

  return (
    <Box className="p-5">
      <Typography variant="h4" component="h1" className="mb-5">
        Choose Time
      </Typography>
      <div className="flex flex-col space-y-3 mb-5">
        <TextField
          type="time"
          label="Breakfast Time"
          variant="outlined"
          size="small"
          value={breakfastTime}
          onChange={(e) => setBreakfastTime(e.target.value)}
        />
        <TextField
          type="time"
          label="Lunch Time"
          variant="outlined"
          size="small"
          value={lunchTime}
          onChange={(e) => setLunchTime(e.target.value)}
        />
        <TextField
          type="time"
          label="Dinner Time"
          variant="outlined"
          size="small"
          value={dinnerTime}
          onChange={(e) => setDinnerTime(e.target.value)}
        />
      </div>
      <Button variant="contained" onClick={handleEnter}>
        Enter
      </Button>
    </Box>
  );
}

export default TimePickerPage;

