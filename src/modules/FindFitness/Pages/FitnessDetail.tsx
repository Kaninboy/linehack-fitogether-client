import liff from "@line/liff";
import { ArrowBack } from "@mui/icons-material";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
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
  console.log(item);
  function handleClick() {
    window.location.href = `tel:${item?.phone}`;
  }

  if (loading) return null;
  return (
    <div
      className="flex flex-col h-screen text-xs bg-cover bg-center font-line"
      // style={{
      //   backgroundImage: `url(https://storage.googleapis.com/fitogether-me/assistanceFood/Stone%20backdrops%20_%20Backdrop%20_Palermo_%20Buy%20from%20e-shop.jpg)`,
      //   backgroundPosition: "center",
      //   backgroundSize: "cover",
      // }}
    >
      {item ? (
        <>
          <div>
            <div className="flex items-center">
              <IconButton onClick={() => navigate("/fitnesslist")}>
                <ArrowBack />
              </IconButton>
              <p>กลับไปหน้าฟิตเนสแนะนำ</p>
            </div>
            <div className="flex justify-center">
              <div className="w-11/12 overflow-hidden">
                <img
                  src={item.pic}
                  alt={item.name}
                  className="align-middle w-full max-h-52 sm:h-18rem mx-auto rounded-2xl shadow-2xl object-cover"
                />
              </div>
            </div>
            <div className="flex justify-evenly mt-4 pb-2 shadow-md">
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{ fontSize: "large", fontWeight: "bold" }}
              >
                {item.name}
              </Typography>
            </div>
          </div>
          <div className="mt-1 text-center flex flex-col gap-3 py-2 overflow-y-scroll overflow-x-hidden shadow-sm">
            <div className="mx-5 py-3 w-11/12 bg-white rounded-lg shadow-lg">
              <div className="flex flex-col text-left pl-4">
                <h2 className="text-lg font-bold">เวลาที่เปิด</h2>
                <ol>
                  {item.time.map((step: string, index: number) => (
                    <li key={index} className="mr-4">
                      {index + 1}. {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="mx-5 py-3 w-11/12 bg-white rounded-lg shadow-lg">
              <div className="flex flex-col text-left pl-4">
                <h2 className="text-lg font-bold">ตัวอย่างคลาสที่เปิดสอน</h2>
                <ol>
                  {item.extraclass.map((step: string, index: number) => (
                    <li key={index} className="mr-4">
                      {index + 1}. {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="mx-5 py-3 w-11/12 bg-white rounded-lg shadow-lg">
              <div className="flex flex-col text-left pl-4">
                <h2 className="text-lg font-bold">ค่าบริการ</h2>
                <ol>
                  <li className="mr-4">
                    เดือนละ{" "}
                    {new Intl.NumberFormat("th-TH", {
                      currency: "THB",
                    }).format(parseInt(item.monthlyfee, 10))}{" "}
                    บาท
                  </li>
                </ol>
              </div>
            </div>
            <div className="mx-5 py-3 w-11/12 bg-white rounded-lg shadow-lg">
              <div className="flex flex-col text-left pl-4">
                <h2 className="text-lg font-bold">ช่องทางการติดต่อ</h2>
                <ul>
                  <li>
                    {" "}
                    <Link
                      to={`tel:${item.phone}`}
                      onClick={handleClick}
                      className="inline-flex items-center px-3 py-1 bg-white border border-transparent rounded-full shadow-sm text-sm my-1 font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <PhoneIcon className="mr-2" />
                      <span>{item.phone}</span>
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link
                      to={`${item.facebook_link}`}
                      className="inline-flex items-center px-3 py-1 bg-white border border-transparent rounded-full shadow-sm text-sm my-1 font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <FacebookIcon className="mr-2" />
                      <span>{item.facebook_name}</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <Link
              to={item.web_api}
              className="flex w-full py-2"
              target="_blank"
            >
              <button className="w-full text-sm underline-offset-2 underline text-blueDark">
                เข้าสู่เว็บไซต์ทางการของฟิตเนส !
              </button>
            </Link>
          </div>
          <div className="flex flex-col justify-center m-6 my-3 gap-2">
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
        </>
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
