import {
  Button,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../common/api";
import { Complete } from "./components/Complete";

export const CalMemo = () => {
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
      return;
    }
    await api.post("/calmemo", {
      imageUrl,
      memo: memoRef.current.value,
      calories: calorieRef.current.value,
      datetime: new Date(dateRef.current.value).toISOString(),
    });
    toast.success("บันทึกสำเร็จ");
    setIsSubmitted(true);

    submitting.current = false;
  };

  if (isSubmitted) return <Complete />;
  return (
    <div>
      <form className="flex flex-col gap-4 p-6">
        <h1 className="text-2xl font-bold text-blueDark text-center">
          บันทึกแคลอรี่
        </h1>
        <TextField
          label="วันที่"
          variant="outlined"
          type="date"
          defaultValue={new Date().toISOString().split("T")[0]}
          inputRef={dateRef}
        />
        <OutlinedInput
          inputRef={calorieRef}
          type="number"
          endAdornment={
            <InputAdornment position="end">กิโลแคลอรี่</InputAdornment>
          }
        />
        <TextField label="บันทึก" variant="outlined" inputRef={memoRef} />
        <Button
          variant="contained"
          component="label"
          size="large"
          disabled={!!imageUrl}
        >
          {imageUrl ? "อัปโหลดเรียบร้อย" : "อัปโหลดภาพประกอบ"}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleUpload}
            capture="environment"
          />
        </Button>
        {imageUrl ? (
          <img className="h-60 object-contain" src={imageUrl} />
        ) : (
          <div className="flex flex-end">
            <button
              className="flex justify-center items-center gap-2 w-full text-white bg-blueDark py-3 px-4 rounded-md"
              onClick={handleSubmit}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>{" "}
              บันทึก
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
