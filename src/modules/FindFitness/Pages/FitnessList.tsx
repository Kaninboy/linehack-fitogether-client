import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../common/api";
import FitnessCard from "../Components/FitnessCard";

interface Item {
  id: string;
  name: string;
  lat: string;
  long: string;
  location_api: string;
  monthlyfee: string;
  facebook_name: string;
  facbook_link: string;
  pic: string;
  phone: string;
  web_api: string;
  time: string[];
  extraclass: string[];
}

export function FitnessList() {
  const [loading, setLoading] = useState(true);
  const [fitnessData, setFitnessData] = useState<Item[]>([]);
  const items: Item[] = fitnessData;
  const navigate = useNavigate();

  useEffect(() => {
    const loadFitness = async () => {
      const res = await api.get("/fitness");
      setFitnessData(res.data);
    };
    loadFitness();
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading</p>;
  }
  if (fitnessData.length === 0) {
    return (
      <div className="font-line">
        <h1 className="text-xl text-center mt-10 font-bold">
          แนะนำฟิตเนสสำหรับคุณ !
        </h1>
        <h2 className="text-2xl my-20">-- ไม่มีรายการฟิตเนสที่จะแสดง --</h2>
      </div>
    );
  }

  const handleNavigateCard = (card: Item) => {
    let currentCard = card;
    navigate("/fitnessdetail", { state: { currentCard } });
  };

  return (
    <div className="font-line bg-greyLight min-h-screen">
      <div className="p-5"></div>
      <h1 className="mx-10 py-3 text-xl text-center font-bold bg-blueDark text-white">
        แนะนำฟิตเนสสำหรับคุณ !
      </h1>
      <ul>
        <li className="text-lg mt-10 pl-5">ฟิตเนสแนะนำ: </li>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            my: 1,
          }}
        >
          {items.map((card) => (
            <div
              className="m-5 w-11/12"
              onClick={() => handleNavigateCard(card)}
            >
              <FitnessCard {...card} />
            </div>
          ))}
        </Box>
      </ul>
    </div>
  );
}
