import liff from "@line/liff";
import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../common/api";
import { Fitness } from "./FitnessList";

export function FitnessDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<Fitness | null>(null);

  useEffect(() => {
    const loadFitness = async () => {
      setLoading(true);
      const res = await api.get(`/fitness/${id}`);
      setItem(res.data);
      setLoading(false);
    };
    loadFitness();
  }, [id]);

  const handleShare = async () => {
    if (!item) return;
    const result = await liff.shareTargetPicker([
      {
        type: "text",
        text: `${item.name} พร้อมให้คุณสมัครสมาชิกผ่าน Fitogether แล้วที่ ${window.location.href}`,
      },
    ]);
    if (result) {
      toast.success("แชร์สำเร็จ");
    }
  };

  if (loading) return null;
  return (
    <div className="text-xs">
      {item ? (
        <Box className="font-line">
          <div className="flex items-center">
            <IconButton onClick={() => navigate("/fitnesslist")}>
              <ArrowBack />
            </IconButton>
            <p>กลับไปหน้าฟิตเนสแนะนำ</p>
          </div>
          <Box sx={{ mt: 1, textAlign: "center" }} className="space-y-5">
            <img
              src={item.pic}
              alt={item.name}
              className="align-middle w-[75%] max-h-48 sm:h-12rem mx-auto rounded-lg shadow-lg object-cover"
            />
            <div className="flex flex-col justify-evenly">
              <Typography variant="h5" component="h3" gutterBottom>
                {item.name}
              </Typography>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                className="text-left"
              >
                {item.phone}
              </Typography>
            </div>
            <div className="text-left pl-4">
              <h2>เวลาที่เปิด</h2>
              <ol>
                {item.time.map((step: string, index: number) => (
                  <li key={index} className="mr-4">
                    {index + 1}. {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="text-left pl-4">
              <h2>คลาสต่างๆ</h2>
              <ol>
                {item.extraclass.map((step: string, index: number) => (
                  <li key={index} className="mr-4">
                    {index + 1}. {step}
                  </li>
                ))}
              </ol>
            </div>
          </Box>
          <div className="flex flex-col justify-center m-6 gap-2">
            <Link
              to={item.web_api}
              className="flex w-full py-2"
              target="_blank"
            >
              <button className="w-full text-sm underline-offset-2 underline text-blueDark">
                เข้าสู่เว็บไซต์ทางการของฟิตเนส !
              </button>
            </Link>
            <button
              className="flex flex-row gap-1 justify-center items-center bg-blueLight text-white text-sm px-10 py-2 rounded-lg"
              onClick={handleShare}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                />
              </svg>
              แชร์
            </button>
            <button
              className="flex flex-row gap-1 justify-center items-center bg-blueDark text-white text-sm px-10 py-2 rounded-lg"
              onClick={() => navigate(`/fitness/buy/${id}`)}
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
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              สมัครสมาชิก
            </button>
          </div>
        </Box>
      ) : (
        <Box>
          <IconButton onClick={() => navigate("/fitnesslist")}>
            <ArrowBack />
          </IconButton>
          <Typography variant="body2" component="p">
            No item found.
          </Typography>
        </Box>
      )}
    </div>
  );
}
