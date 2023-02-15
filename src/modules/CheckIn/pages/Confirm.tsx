import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { SupportFriend } from "../components/SupportFriend";

interface ConfirmProps {
  willShare: boolean;
  setWillShare: (willShare: boolean) => void;
  onSubmit: () => void;
}
export const Confirm = (props: ConfirmProps) => {
  const { onSubmit, willShare, setWillShare } = props;

  return (
    <>
      <div className="flex flex-grow">
        <SupportFriend />
      </div>
      <div className="flex flex-col items-start">
        <FormControlLabel
          className="w-full"
          control={
            <Checkbox
              sx={{ "& .MuiSvgIcon-root": { fontSize: 32 } }}
              checked={willShare}
              size="medium"
              onChange={(event) => setWillShare(event.target.checked)}
            />
          }
          label="แชร์ไปยังเพื่อนของฉัน"
        />
        <Button variant="contained" size="large" onClick={onSubmit} fullWidth>
          {willShare ? "บันทึกและแชร์" : "บันทึก"}
        </Button>
      </div>
    </>
  );
};
