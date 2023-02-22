import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface SlideCardProps {
  type: string[];
  calories: string;
  pic: string;
  name: string;
}

const FoodCard: React.FC<SlideCardProps> = ({ type, calories, pic, name }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        src={pic}
        title={name}
        sx={{
          width: "75",
          maxHeight: "12rem",
          minHeight: "11rem",
          objectFit: "cover",
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography gutterBottom variant="subtitle1" component="h2">
          {calories} kcal
        </Typography>
        <Typography gutterBottom variant="body1" component="h2">
          {type.join(", ")}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FoodCard;
