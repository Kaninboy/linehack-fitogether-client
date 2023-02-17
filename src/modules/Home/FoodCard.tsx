import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface SlideCardProps {
  id: string;
  type: string;
  ingredient: string;
  howtocook: string;
  calories: string;
  pic: string;
  name: string;
}

const FoodCard: React.FC<SlideCardProps> = ({
  id,
  type,
  ingredient,
  howtocook,
  calories,
  pic,
  name,
}) => {
  return (
    <Card>
      <CardMedia src={pic} title={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name} {calories} kcal
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" component="p">
          {type}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {ingredient}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {howtocook}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FoodCard;
