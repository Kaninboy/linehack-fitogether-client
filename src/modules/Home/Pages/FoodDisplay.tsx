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
    <div className="text-xs">
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
            <div className="relative w-[75%] overflow-hidden">
              <img
                src={item.pic}
                alt={item.name}
                className="align-middle w-full max-h-48 sm:h-12rem mx-auto rounded-lg shadow-lg object-cover"
              />
              <Typography
                variant="body2"
                component="h3"
                className="absolute -left-[32px] top-[20px] -rotate-45 text-white font-bold bg-greyMain opacity-80  w-32"
              >
                {item.calories} kcal
              </Typography>
            </div>
            </div>
            <div className="flex justify-evenly mt-60 mb-30">
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{ fontSize: "xx-large" }}
              >
                {item.name}
              </Typography>
            </div>
            <div className="flex flex-col text-left pl-4">
              <h2 className="text-lg color-blueDark">ส่วนผสม</h2>
              <ol>
                {item.ingredient.map((step: string, index: number) => (
                  <li key={index} className="mr-4">
                    {index + 1}. {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="text-left pl-4">
              <h2>ขั้นตอนและวิธีการทำ</h2>
              <ol>
                {item.howtocook.map((step: string, index: number) => (
                  <li key={index} className="mr-4">
                    {index + 1}. {step}
                  </li>
                ))}
              </ol>
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
