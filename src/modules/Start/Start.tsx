import React from "react";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { api } from "../../common/api";
import { useNavigate } from "react-router-dom";

export function Start() {
  const [age, setAge] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [activities, setActivities] = React.useState("");

  const handleGender = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  const handleActivities = (event: SelectChangeEvent) => {
    setActivities(event.target.value as string);
  };
  
  const navigate = useNavigate();

  const onSubmit = async () => {
    await api.post("/createuser", {
      gender,
      age,
      weight,
      height,
      activities,
    });
    navigate("/");
  };

  return (
    <div className="font-line">
      <h1 className="text-center text-2xl m-10 font-extrabold">
        กรุณากรอกข้อมูลส่วนตัว
      </h1>
      <ul className="flex justify-evenly m-10">
        <li>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="gender-label">เพศ</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                value={gender}
                label="เพศ"
                onChange={handleGender}
              >
                <MenuItem value={"ชาย"}>ชาย</MenuItem>
                <MenuItem value={"หญิง"}>หญิง</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </li>
        <li>
          <TextField
            id="age"
            label="อายุ"
            InputProps={{
              endAdornment: <InputAdornment position="end">ปี</InputAdornment>,
            }}
            variant="outlined"
            onChange={(event) => setAge(event.target.value)}
          />
        </li>
      </ul>
      <ul className="flex justify-evenly m-10">
        <li>
          <TextField
            id="weight"
            label="น้ำหนัก"
            InputProps={{
              endAdornment: <InputAdornment position="end">กก.</InputAdornment>,
            }}
            variant="outlined"
            onChange={(event) => setWeight(event.target.value)}
          />
        </li>
        <li>
          <TextField
            id="height"
            label="ส่วนสูง"
            InputProps={{
              endAdornment: <InputAdornment position="end">ซม.</InputAdornment>,
            }}
            variant="outlined"
            onChange={(event) => setHeight(event.target.value)}
          />
        </li>
      </ul>
      <Box sx={{ minWidth: 120, mx: 10 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            กิจกรรมระหว่างวัน
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={activities}
            label="กิจกรรมระหว่างวัน"
            onChange={handleActivities}
          >
            <MenuItem value={"นั่งทำงานอยู่กับที่ และไม่ได้ออกกำลังกายเลย"}>
              นั่งทำงานอยู่กับที่ และไม่ได้ออกกำลังกายเลย
            </MenuItem>
            <MenuItem value={"ออกกำลังกายเบาๆ (1-2 ครั้งต่อสัปดาห์)"}>
              ออกกำลังกายเบาๆ (1-2 ครั้งต่อสัปดาห์)
            </MenuItem>
            <MenuItem value={"ออกกำลังกายปานกลาง (3-5 ครั้งต่อสัปดาห์)"}>
              ออกกำลังกายปานกลาง (3-5 ครั้งต่อสัปดาห์)
            </MenuItem>
            <MenuItem value={"ออกกำลังกายหนักมาก (ทุกวัน วันละ 2 เวลา)"}>
              ออกกำลังกายหนักมาก (ทุกวัน วันละ 2 เวลา)
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div className="m-10 text-center color-blueDark">
        <Button
          variant="contained"
          sx={{ bgcolor: "#0F044C", "&:hover": { backgroundColor: "#0F044C" } }}
          onClick={onSubmit}
        >
          ตกลง
        </Button>
      </div>
    </div>
  );
}
