import { Box, Divider, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { api } from "../../../common/api";
import FoodCard from "../components/FoodCard";

interface Item {
  id: string;
  type: string[];
  ingredient: string;
  howtocook: string;
  calories: string;
  pic: string;
  name: string;
}

export function FoodList() {
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

  const handleNavigateCard = (card: Item) => {
    let currentCard = card;
    navigate("/card", { state: { currentCard } });
  };

  const type = ["อาหารเช้า", "อาหารกลางวัน", "อาหารเย็น"];
  return (
    <div
      className="text-xs bg-cover bg-center text-center font-line bg-greyLight min-h-screen"
      style={{
        backgroundImage: `url(https://storage.googleapis.com/fitogether-me/assistanceFood/Stone%20backdrops%20_%20Backdrop%20_Palermo_%20Buy%20from%20e-shop.jpg)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <ul>
        <li className="font-bold text-2xl py-4">
          เมนูอาหารแนะนำประจำวัน
          <p className="text-sm">
            {new Date().toLocaleDateString("th-TH", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </li>

        {["เจ๊ปิน", "เซฟตู่", "น้าแอด"].map((name, idx) => {
          return (
            <div className="mx-5 my-4" key={name}>
              <div className="flex gap-4">
                <div className="w-12 h-12 text-xl text-white font-bold bg-[#FB923C] rounded-full flex justify-center items-center">
                  A
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-lg font-bold">โปรแกรมแนะนำโดย {name}</p>
                  <p className="text-md">Certified Diet Expert</p>
                </div>
              </div>
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
                {items.slice(3 * idx, 3 * idx + 3).map((card, idx) => (
                  <div
                    className="flex mt-2 mb-4 pb-1 h-56 relative"
                    onClick={() => handleNavigateCard(card)}
                    key={card.id}
                  >
                    <div className="z-10 text-white font-bold text-lg absolute px-2 bg-[#FB923C] opacity-80 rounded-full top-2 left-2">
                      {type[idx]}
                    </div>
                    <FoodCard {...card} />
                  </div>
                ))}
              </Carousel>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
