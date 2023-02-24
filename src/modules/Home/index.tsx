import { Box, Divider, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../common/api";
import FoodCard from "./components/FoodCard";
import Carousel from "react-material-ui-carousel";

interface Item {
  id: string;
  type: string[];
  ingredient: string;
  howtocook: string;
  calories: string;
  pic: string;
  name: string;
}

export function Home() {
  const [userData, setUserData] = useState<{
    bmr: number;
    tdee: number;
    bmi: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [foodData, setFoodData] = useState<Item[]>([]);
  const navigate = useNavigate();
  const items: Item[] = foodData;

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/assistance/getuserdata");
      setUserData(res.data);
    };
    load();

    const loadFood = async () => {
      const res = await api.get("/assistance/food"); //get the food data
      setFoodData(res.data.data);
    };
    loadFood();
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading</p>;
  }
  if (foodData.length === 0) {
    return (
      <div className="text-center font-line bg-greyLight min-h-screen">
      <h1 className="font-bold text-2xl p-10 pb-5">
        ใน 1 วันคุณเผาผลาญพลังงาน
      </h1>
      <ul className="text-lg">
        <li className="m-5 flex justify-center">
          <div className="rounded-md w-4/5 p-2 border-2 border-blueDark bg-blueLight bg-opacity-30 text-blueDark font-bold">
            การเผาผลาญขั้นต่ำ BMR
            <div className="my-5 flex justify-center">
              <span className="rounded-md w-4/5 h-10 p-1 border-2 border-blueDark bg-white text-blueDark font-bold">
                {userData?.bmr} <span className="text-greyMain">kcal/วัน</span>
              </span>
            </div>
          </div>
        </li>
        <li className="m-5 flex justify-center">
          <div className="rounded-md w-4/5 p-2 border-2 border-blueDark bg-blueLight bg-opacity-30 text-blueDark font-bold">
            การเผาผลาญเมื่อทำกิจกรรม TDEE
            <div className="my-5 flex justify-center">
              <span className="rounded-md w-4/5 h-10 p-1 border-2 border-blueDark bg-white text-blueDark font-bold">
                {userData?.tdee} <span className="text-greyMain">kcal/วัน</span>
              </span>
            </div>
          </div>
        </li>
        <li className="m-5 flex justify-center">
          <div className="rounded-md w-4/5 p-2 border-2 border-blueDark bg-blueLight bg-opacity-30 text-blueDark font-bold">
            ค่า BMI ของคุณคือ
            <div className="my-5 flex justify-center">
              <span className="rounded-md w-4/5 h-10 p-1 border-2 border-blueDark bg-white text-blueDark font-bold">
                {userData?.bmi}
              </span>
            </div>
          </div>
        </li>
      </ul>
      <Divider></Divider>
        <h2 className="text-2xl my-20">-- ไม่มีเมนูอาหารที่จะแสดง --</h2>
      </div>
    );
  }

  const handleNavigateCard = (card: Item) => {
    let currentCard = card;
    navigate("/card", { state: { currentCard } });
  };

  return (
    <div className="text-center font-line bg-greyLight min-h-screen">
      <h1 className="font-bold text-2xl p-10 pb-5">
        ใน 1 วันคุณเผาผลาญพลังงาน
      </h1>
      <ul className="text-lg">
        <li className="m-5 flex justify-center">
          <div className="rounded-md w-4/5 p-2 border-2 border-blueDark bg-blueLight bg-opacity-30 text-blueDark font-bold">
            การเผาผลาญขั้นต่ำ BMR
            <div className="my-5 flex justify-center">
              <span className="rounded-md w-4/5 h-10 p-1 border-2 border-blueDark bg-white text-blueDark font-bold">
                {userData?.bmr} <span className="text-greyMain">kcal/วัน</span>
              </span>
            </div>
          </div>
        </li>
        <li className="m-5 flex justify-center">
          <div className="rounded-md w-4/5 p-2 border-2 border-blueDark bg-blueLight bg-opacity-30 text-blueDark font-bold">
            การเผาผลาญเมื่อทำกิจกรรม TDEE
            <div className="my-5 flex justify-center">
              <span className="rounded-md w-4/5 h-10 p-1 border-2 border-blueDark bg-white text-blueDark font-bold">
                {userData?.tdee} <span className="text-greyMain">kcal/วัน</span>
              </span>
            </div>
          </div>
        </li>
        <li className="m-5 flex justify-center">
          <div className="rounded-md w-4/5 p-2 border-2 border-blueDark bg-blueLight bg-opacity-30 text-blueDark font-bold">
            ค่า BMI ของคุณคือ
            <div className="my-5 flex justify-center">
              <span className="rounded-md w-4/5 h-10 p-1 border-2 border-blueDark bg-white text-blueDark font-bold">
                {userData?.bmi}
              </span>
            </div>
          </div>
        </li>
      </ul>
      <Divider></Divider>
      <ul>
        <li className="font-bold text-2xl mt-10">เมนูอาหารแนะนำวันนี้</li>

        <Carousel
          navButtonsAlwaysVisible
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 5,
          }}
        >
          {items.map((card) => (
            <div
              className="flex m-5 pb-3 h-64"
              onClick={() => handleNavigateCard(card)}
            >
              <FoodCard {...card} />
            </div>
          ))}
        </Carousel>
      </ul>
    </div>
  );
}
