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
    await api.post("/assistance/updatenotification", {
      breakfast: breakfastTime,
      lunch: lunchTime,
      dinner: dinnerTime,
    });
    navigate("/");
  };

  return (
    <Box className="p-5 font-line text-center space-y-10">
      <Typography sx={{ fontSize: "1.5rem", mt: 2.5, mb: 10 }} component="h1">
        ตั้งเวลาแจ้งเตือนมื้ออาหาร
      </Typography>
      <div className="flex flex-col space-y-5 mb-5">
        <TextField
          type="time"
          label="มื้อเช้า"
          variant="outlined"
          size="small"
          value={breakfastTime}
          onChange={(e) => setBreakfastTime(e.target.value)}
        />
        <TextField
          type="time"
          label="มื้อกลางวัน"
          variant="outlined"
          size="small"
          value={lunchTime}
          onChange={(e) => setLunchTime(e.target.value)}
        />
        <TextField
          type="time"
          label="มื้อเย็น"
          variant="outlined"
          size="small"
          value={dinnerTime}
          onChange={(e) => setDinnerTime(e.target.value)}
        />
      </div>
      <Button
        variant="contained"
        fullWidth
        sx={{ bgcolor: "#0F044C", "&:hover": { backgroundColor: "#0F044C" } }}
        onClick={handleEnter}
      >
        ตกลง
      </Button>
    </Box>
  );
}

export default TimePickerPage;
