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
      try {
        const res = await api.get("/assistance/getuserdata");
        setUserData(res.data);
      } catch (error) {
        console.log(error);
        navigate("/start");
      }
    };
    load();

    const loadFood = async () => {
      const res = await api.get("/assistance/food"); //get the food data
      setFoodData(res.data.data);
    };
    loadFood();
    setLoading(false);
  }, []);

  if (loading || foodData.length === 0) {
    return (
      <div
        className="text-xs bg-cover bg-center text-center font-line bg-greyLight min-h-screen"
        style={{
          backgroundImage: `url(https://storage.googleapis.com/fitogether-me/assistanceFood/Stone%20backdrops%20_%20Backdrop%20_Palermo_%20Buy%20from%20e-shop.jpg)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <h1 className="font-bold text-2xl p-6 pb-1 text-blueDark">
          ใน 1 วันคุณเผาผลาญพลังงาน
        </h1>
        <ul className="text-lg">
          <li className="m-3 mx-6 flex justify-center">
            <div className="rounded-md w-4/5 p-1 border-2 border-blueDark backdrop-blur-lg  bg-white bg-opacity-30 text-blueDark font-bold">
              การเผาผลาญขั้นต่ำ BMR
              <div className="my-2 flex justify-center">
                <span className="rounded-md w-4/5 h-10 p-1 border-2 border-blueDark bg-white text-blueDark font-bold">
                  ...
                  <span className="text-greyMain">kcal/วัน</span>
                </span>
              </div>
            </div>
          </li>
          <li className="m-3 mx-6 flex justify-center">
            <div className="rounded-md w-4/5 p-1 border-2 border-blueDark backdrop-blur-lg bg-opacity-30 text-blueDark font-bold">
              การเผาผลาญเมื่อทำกิจกรรม TDEE
              <div className="my-2 flex justify-center">
                <span className="rounded-md w-4/5 h-10 p-1 border-2 border-blueDark bg-white text-blueDark font-bold">
                  ...
                  <span className="text-greyMain">kcal/วัน</span>
                </span>
              </div>
            </div>
          </li>
          <li className="m-3 mx-6 flex justify-center">
            <div className="rounded-md w-4/5 p-1 border-2 border-blueDark backdrop-blur-lg bg-opacity-30 text-blueDark font-bold">
              ค่า BMI ของคุณคือ
              <div className="my-2 flex justify-center">
                <span className="rounded-md w-4/5 h-10 p-1 border-2 border-blueDark bg-white text-blueDark font-bold">
                  ...
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }

  const handleNavigateCard = (card: Item) => {
    let currentCard = card;
    navigate("/card", { state: { currentCard } });
  };

  return (
    <div
      className="text-xs bg-cover bg-center text-center font-line bg-greyLight min-h-screen"
      style={{
        backgroundImage: `url(https://storage.googleapis.com/fitogether-me/assistanceFood/Stone%20backdrops%20_%20Backdrop%20_Palermo_%20Buy%20from%20e-shop.jpg)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <h1 className="font-bold text-2xl p-6 pb-1 text-blueDark">
        ใน 1 วันคุณเผาผลาญพลังงาน
      </h1>
      <ul className="text-lg">
        <li className="m-3 mx-6 flex justify-center">
          <div className="rounded-md w-4/5 p-1 border-2 border-blueDark backdrop-blur-lg  bg-white bg-opacity-30 text-blueDark font-bold">
            การเผาผลาญขั้นต่ำ BMR
            <div className="my-2 flex justify-center">
              <span className="rounded-md w-4/5 h-10 p-1 border-2 border-blueDark bg-white text-blueDark font-bold">
                {Math.round(userData?.bmr || 0)}{" "}
                <span className="text-greyMain">kcal/วัน</span>
              </span>
            </div>
          </div>
        </li>
        <li className="m-3 mx-6 flex justify-center">
          <div className="rounded-md w-4/5 p-1 border-2 border-blueDark backdrop-blur-lg bg-opacity-30 text-blueDark font-bold">
            การเผาผลาญเมื่อทำกิจกรรม TDEE
            <div className="my-2 flex justify-center">
              <span className="rounded-md w-4/5 h-10 p-1 border-2 border-blueDark bg-white text-blueDark font-bold">
                {Math.round(userData?.tdee || 0)}{" "}
                <span className="text-greyMain">kcal/วัน</span>
              </span>
            </div>
          </div>
        </li>
        <li className="m-3 mx-6 flex justify-center">
          <div className="rounded-md w-4/5 p-1 border-2 border-blueDark backdrop-blur-lg bg-opacity-30 text-blueDark font-bold">
            ค่า BMI ของคุณคือ
            <div className="my-2 flex justify-center">
              <span className="rounded-md w-4/5 h-10 p-1 border-2 border-blueDark bg-white text-blueDark font-bold">
                {userData?.bmi}
              </span>
            </div>
          </div>
        </li>
      </ul>
      <ul>
        <li className="font-bold text-2xl mt-4 text-blueDark">
          เมนูอาหารแนะนำวันนี้
        </li>

        <Carousel
          navButtonsAlwaysVisible
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 0,
          }}
        >
          {items.map((card) => (
            <div
              className="flex m-5 pb-3 h-56"
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
