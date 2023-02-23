import React from "react";
import { ImageListItem, ImageListItemBar } from "@mui/material";

interface SlideCardProps {
  type: string[];
  calories: string;
  pic: string;
  name: string;
}

const FoodCard: React.FC<SlideCardProps> = ({ calories, pic, name }) => {
  return (
    <>
      <ImageListItem
        key={pic}
        style={{
          width: "100%",
        }}
      >
        <img
          src={`${pic}?w=248&fit=crop&auto=format`}
          alt={name}
          className="w-full h-full object-cover overflow-hidden"
          loading="lazy"
        />
        <ImageListItemBar title={name} subtitle={calories + " กิโลแคลอรี่"} />
      </ImageListItem>
    </>
  );
};

export default FoodCard;
