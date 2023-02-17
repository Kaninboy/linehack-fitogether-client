import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const CardDisplay: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state.currentCard;

  const handleBack = () => {
    navigate(-1);
  };

  console.log(location.state);

  return (
    <div>
      {item ? (
        <Box className="font-line">
          <IconButton onClick={handleBack}>
            <ArrowBack />
          </IconButton>
          <Box sx={{ mt: 10, textAlign: "center" }} className="space-y-5">
            <img src={item.pic} alt={item.name} className="block mx-auto" />
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
            <Typography variant="subtitle1" component="h4" gutterBottom>
              {item.ingredient}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {item.howtocook}
            </Typography>
          </Box>
          <div className="flex justify-center">
            <button className="bg-lineGreen text-white text-sm text-center px-10 py-2 m-5 rounded-md">
              สั่งอาหารผ่าน LINE MAN ตอนนี้เลย !
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
};

export default CardDisplay;
