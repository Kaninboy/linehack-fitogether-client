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
            <img
              src={item.pic}
              alt={item.name}
              className="align-middle max-w-[75%] max-h-48 sm:h-12rem mx-auto rounded-lg shadow-lg object-cover"
            />
            <div className="flex justify-evenly">
              <Typography variant="h5" component="h3" gutterBottom>
                {item.name}
              </Typography>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                className="text-right"
              >
                {item.calories} kcal
              </Typography>
            </div>
            <div className="text-left pl-4">
              <h2>ส่วนผสม</h2>
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
            No item found.
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default CardDisplay;
