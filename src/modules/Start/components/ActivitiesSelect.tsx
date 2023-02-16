import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function ActivitiesSelect() {
  const [activities, setActivities] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setActivities(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120, mx: 10}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">กิจกรรมระหว่างวัน</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={activities}
          label="กิจกรรมระหว่างวัน"
          onChange={handleChange}
        >
          <MenuItem value={'นั่งทำงานอยู่กับที่ และไม่ได้ออกกำลังกายเลย'}>นั่งทำงานอยู่กับที่ และไม่ได้ออกกำลังกายเลย</MenuItem>
          <MenuItem value={'ออกกำลังกายเบาๆ (1-2 ครั้งต่อสัปดาห์)'}>ออกกำลังกายเบาๆ (1-2 ครั้งต่อสัปดาห์)</MenuItem>
          <MenuItem value={'ออกกำลังกายปานกลาง (3-5 ครั้งต่อสัปดาห์)'}>ออกกำลังกายปานกลาง (3-5 ครั้งต่อสัปดาห์)</MenuItem>
          <MenuItem value={'ออกกำลังกายหนักมาก (ทุกวัน วันละ 2 เวลา)'}>ออกกำลังกายหนักมาก (ทุกวัน วันละ 2 เวลา)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
