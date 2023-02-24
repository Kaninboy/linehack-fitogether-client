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
      className="text-xs bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: `url(https://storage.googleapis.com/fitogether-me/assistanceFood/Stone%20backdrops%20_%20Backdrop%20_Palermo_%20Buy%20from%20e-shop.jpg)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {item ? (
        <Box className="font-line">
          <div className="flex items-center">
            <IconButton onClick={handleBack}>
              <ArrowBack />
            </IconButton>
            <p>กลับไปหน้าเมนูอาหารแนะนำ</p>
          </div>
          <Box sx={{ mt: 1, textAlign: "center" }} className="space-y-5">
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
                  className="absolute -left-[54px] top-[25px] -rotate-45 text-white font-bold bg-orange-400 opacity-90 w-48"
                >
                  {item.calories} kcal
                </Typography>
              </div>
            </div>
            <div className="flex justify-center text-3xl font-bold text-blueDark">
              {item.name}
            </div>
            <div className="m-5 py-3 w-11/12 bg-white opacity-80 rounded-lg shadow-lg">
              <div className="flex flex-col text-left pl-4">
                <h2 className="text-lg">ส่วนผสม</h2>
                <ol>
                  {item.ingredient.map((step: string, index: number) => (
                    <li key={index} className="mr-4">
                      {index + 1}. {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="m-5 py-3 w-11/12 bg-white opacity-80 rounded-lg shadow-lg">
              <div className="flex flex-col text-left pl-4">
                <h2 className="text-lg">ขั้นตอนและวิธีการทำ</h2>
                <ol>
                  {item.howtocook.map((step: string, index: number) => (
                    <li key={index} className="mr-4">
                      {index + 1}. {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Box>
          <div className="flex justify-center">
            <Link to={item.linemanLink} target="_blank">
              <button className="bg-lineGreen text-white text-sm text-center px-10 py-2 m-5 rounded-md">
                สั่งอาหารผ่าน LINE MAN ตอนนี้เลย !
              </button>
            </Link>
          </div>
        </Box>
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
