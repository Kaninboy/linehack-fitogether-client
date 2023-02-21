import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { api } from "../../../common/api";

export function FitnessDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state.currentCard;
  const isFetching = useRef(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleLinePayPurchase = async () => {
    if (isFetching.current) return;
    isFetching.current = true;

    const res = await api.post("/payment/reserve", {
      fitnessId: item.id,
    });
    if (!res.data.url) {
      alert("ไม่สามารถทำรายการได้");
      isFetching.current = false;
      return;
    }

    window.location.href = res.data.url;
    isFetching.current = false;
  };

  console.log(item);
  return (
    <div className="text-xs">
      {item ? (
        <Box className="font-line">
          <div className="flex items-center">
            <IconButton onClick={handleBack}>
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
            <Link to={item.web_api} className="flex w-full" target="_blank">
              <button className="flex  justify-center bg-blueDark text-white w-full text-sm text-center px-10 py-2 rounded-lg">
                เข้าสู้เว็บไซต์ทางการของฟิตเนส !
              </button>
            </Link>
            <button
              className="flex sm:flex-row flex-col sm:gap-2 justify-center items-center bg-lineGreen text-white text-sm px-10 py-2 rounded-lg"
              onClick={handleLinePayPurchase}
            >
              สมัครสมาชิกผ่าน{" "}
              <img
                className="h-8"
                src="/images/linepay-logo.png"
                alt="linepay"
              />
            </button>
          </div>
        </Box>
      ) : (
        <Box>
          <IconButton onClick={handleBack}>
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
