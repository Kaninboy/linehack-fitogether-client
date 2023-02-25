import {
  TextField,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@mui/material";
import axios from "axios";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { api } from "../../../common/api";
import { Complete } from "./Complete";

const New = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const memoRef = useRef<HTMLInputElement>(null);
  const calorieRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const submitting = useRef(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (submitting.current) return;
    submitting.current = true;

    if (e.target.files) {
      const file = e.target.files[0];
      toast.promise(
        (async () => {
          const res = await api.post("/calmemo/image", {
            contentType: file.type,
          });

          // put to gcs signed url
          await axios.put(res.data.url, file, {
            headers: {
              "Content-Type": file.type,
            },
          });
          setImageUrl(res.data.url.split("?")[0]);
        })(),
        {
          loading: "กำลังอัปโหลด",
          success: <b>อัปโหลดสำเร็จ</b>,
          error: <b>มีปัญหาระหว่างทำการอัปโหลด</b>,
        }
      );
    }

    submitting.current = false;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (submitting.current) return;
    submitting.current = true;

    if (
      !imageUrl ||
      !memoRef.current ||
      !calorieRef.current ||
      !dateRef.current
    ) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      submitting.current = false;
      return;
    }
    await api.post("/calmemo", {
      imageUrl,
      memo: memoRef.current.value || "-",
      calories: calorieRef.current.value,
      datetime: new Date(dateRef.current.value).toISOString(),
    });
    toast.success("บันทึกสำเร็จ");
    setIsSubmitted(true);

    submitting.current = false;
  };

  if (isSubmitted) return <Complete />;
  return (
    <form className="flex flex-col gap-2 px-2 pb-2">
      <TextField
        size="small"
        label="วันที่"
        variant="outlined"
        type="date"
        defaultValue={new Date().toISOString().split("T")[0]}
        inputRef={dateRef}
      />
      <OutlinedInput
        size="small"
        inputRef={calorieRef}
        type="number"
        endAdornment={
          <InputAdornment position="end">กิโลแคลอรี่</InputAdornment>
        }
      />
      <TextField
        size="small"
        label="โน้ตเพิ่มเติม"
        variant="outlined"
        inputRef={memoRef}
      />

      {imageUrl ? (
        <img className="h-60 object-contain" src={imageUrl} />
      ) : (
        <Button
          variant="outlined"
          component="label"
          size="medium"
          disabled={!!imageUrl}
          sx={{
            borderColor: "#0F004C",
            color: "#0F004C",
          }}
        >
          {imageUrl ? (
            "อัปโหลดเรียบร้อย"
          ) : (
            <div className="flex gap-2 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mb-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                />
              </svg>
              เพิ่มภาพประกอบ
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleUpload}
            capture="environment"
          />
        </Button>
      )}

      <div className="flex flex-end">
        <Button
          size="large"
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          sx={{
            paddingY: "12px",
            backgroundColor: "#0F004C",
            color: "white",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>{" "}
          บันทึก
        </Button>
      </div>
    </form>
  );
};

export default New;
