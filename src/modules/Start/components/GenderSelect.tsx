import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function GenderSelect() {
  const [gender, setGender] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="gender-label">เพศ</InputLabel>
        <Select
          labelId="gender-label"
          id="gender"
          value={gender}
          label="เพศ"
          onChange={handleChange}
        >
          <MenuItem value={'ชาย'}>ชาย</MenuItem>
          <MenuItem value={'หญิง'}>หญิง</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
