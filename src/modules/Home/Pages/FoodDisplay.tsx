import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useLocation, Link } from "react-router-dom";

const CardDisplay: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state.currentCard;
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="text-xs bg-cover bg-center min-h-screen font-line"
      style={{
        backgroundImage: `url(https://storage.googleapis.com/fitogether-me/assistanceFood/Stone%20backdrops%20_%20Backdrop%20_Palermo_%20Buy%20from%20e-shop.jpg)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {item ? (
        <>
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <IconButton onClick={handleBack}>
                <ArrowBack />
              </IconButton>
              <p>กลับไปหน้าเมนูอาหารแนะนำ</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 mx-5">
            <div className="flex justify-center">
              <div className="relative w-11/12 overflow-hidden">
                <img
                  src={item.pic}
                  alt={item.name}
                  className="align-middle w-full max-h-72 sm:h-18rem mx-auto rounded-2xl shadow-2xl object-cover"
                />
                <Typography
                  variant="h5"
                  component="h3"
                  className="text-center absolute -left-[48px] top-[34px] -rotate-45 text-white font-bold bg-orange-400 opacity-90 w-48"
                >
                  {item.calories} kcal
                </Typography>
              </div>
            </div>
            <div className="flex justify-center text-3xl font-bold text-blueDark py-1">
              {item.name}
            </div>
            <div className="py-3 bg-white opacity-80 rounded-lg shadow-lg">
              <div className="flex flex-col text-left pl-4">
                <h2 className="text-lg font-bold">ส่วนผสม</h2>
                <ol>
                  {item.ingredient.map((step: string, index: number) => (
                    <li key={index} className="mr-4">
                      {index + 1}. {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="py-3 bg-white opacity-80 rounded-lg shadow-lg">
              <div className="flex flex-col text-left pl-4">
                <h2 className="text-lg font-bold">ขั้นตอนและวิธีการทำ</h2>
                <ol>
                  {item.howtocook.map((step: string, index: number) => (
                    <li key={index} className="mr-4">
                      {index + 1}. {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="flex justify-center">
              <Link
                to={item.linemanLink}
                className="flex w-full"
                target="_blank"
              >
                <button className="flex flex-wrap gap-1 items-center w-full justify-center bg-lineGreen text-white py-2 text-sm px-10 my-2 mb-6 rounded-md">
                  สั่งอาหารผ่าน{" "}
                  <img src="/images/lm-logo.jpeg" className="h-8" />
                </button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <Box>
          <IconButton onClick={handleBack}>
            <ArrowBack />
          </IconButton>
          <Typography variant="body2" component="p">
            ไม่มีเมนูอาหารที่จะแสดง
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default CardDisplay;
