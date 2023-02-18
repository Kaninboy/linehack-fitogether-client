import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../common/api";
import FoodCard from "./FoodCard";

export function Home() {
  const [userData, setUserData] = useState<{
    bmr: number;
    tdee: number;
    bmi: number;
  } | null>(null);

  const load = async () => {
    const res = await api.get("/assistance/getuserdata/:id");
    setUserData(res.data);
  };
  load();

  interface Item {
    id: string;
    type: string;
    ingredient: string;
    howtocook: string;
    calories: string;
    pic: string;
    name: string;
  }

  const [foodData, setFoodData] = useState<Item[]>([]);
  const items: Item[] = foodData;

  const loadFood = async () => {
    const res = await api.get("/assistance/getallfooddata"); //get the food data
    setFoodData(res.data);
  };
  loadFood();


  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCard = items[currentIndex];

  const handleNext = () => {
    if (currentIndex === items.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(items.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const navigate = useNavigate();

  const handleNavigateCard = () => {
    navigate('/card', { state: {currentCard} });
  };

  return (
    <div className="text-center font-line">
      <h1 className="font-bold text-2xl m-10">ใน 1 วันคุณเผาผลาญพลังงาน</h1>
      <ul className="text-lg">
        <li className="m-5">การเผาผลาญขั้นต่ำ BMR</li>
        <li className="m-5">1500{userData?.bmr} kcal/day</li>
        <li className="m-5">การเผาผลาญเมื่อทำกิจกรรม TDEE</li>
        <li className="m-5">2000{userData?.tdee} kcal/day</li>
      </ul>
      <ul>
        <li className="text-lg mt-10">เมนูอาหารแนะนำวันนี้</li>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 5,
          }}
        >
          <IconButton onClick={handlePrev}>
            <ArrowBack />
          </IconButton>
          <div onClick={() => handleNavigateCard()}>
            <FoodCard {...currentCard}/>
          </div>
          <IconButton onClick={handleNext}>
            <ArrowForward />
          </IconButton>
        </Box>
      </ul>
    </div>
  );
}
