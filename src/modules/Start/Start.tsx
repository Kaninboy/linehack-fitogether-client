import { Button, InputAdornment, TextField } from "@mui/material";
import GenderSelect from "./GenderSelect";
import ActivitiesSelect from "./ActivitiesSelect";

export function Start() {

  return (
    <div>
        <h1 className="text-center font-line text-2xl m-10 font-extrabold">
          กรุณากรอกข้อมูลส่วนตัว
        </h1>
        <ul className="flex justify-evenly m-10">
          <li>
            <GenderSelect />
          </li>
          <li>
            <TextField
              id="age"
              label="อายุ"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">ปี</InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </li>
        </ul>
        <ul className="flex justify-evenly m-10">
          <li>
            <TextField
              id="weight"
              label="น้ำหนัก"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">กก.</InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </li>
          <li>
            <TextField
              id="height"
              label="ส่วนสูง"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">ซม.</InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </li>
        </ul>
        <ActivitiesSelect />
        <div className="m-10 text-center">
          <Button variant="contained">Enter</Button>
        </div>
    </div>
  );
}

