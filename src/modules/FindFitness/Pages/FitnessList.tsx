import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import { api } from "../../../common/api";
import FitnessCard from "../Components/FitnessCard";
import animationData from "../../../assets/69209-olympics.json";

export interface Fitness {
  id: string;
  name: string;
  lat: string;
  long: string;
  location_api: string;
  dailyfee: number;
  monthlyfee: number;
  yearlyfee: number;
  facebook_name: string;
  facebook_link: string;
  pic: string;
  phone: string;
  web_api: string;
  time: string[];
  extraclass: string[];
}

export function FitnessList() {
  const [loading, setLoading] = useState(true);
  const [fitnessData, setFitnessData] = useState<Fitness[]>([]);
  const items: Fitness[] = fitnessData;
  const navigate = useNavigate();

  useEffect(() => {
    const loadFitness = async () => {
      const res = await api.get("/fitness");
      setFitnessData(res.data);
      setLoading(false);
    };
    loadFitness();
  }, []);

  if (loading) return null;
  if (fitnessData.length === 0) {
    return (
      <div className="font-line">
        <h1 className="text-xl text-center mt-10 font-bold rounded-md">
          แนะนำฟิตเนสสำหรับคุณ !
        </h1>
        {/* <h2 className="text-2xl my-20">-- ไม่มีรายการฟิตเนสที่จะแสดง --</h2> */}
      </div>
    );
  }

  const handleNavigateCard = (card: Fitness) => {
    navigate(`/fitness/${card.id}`);
  };

  return (
    <div className="text-xs bg-cover bg-center font-line bg-greyLight min-h-screen"
    style={{
      backgroundImage: `url(https://storage.googleapis.com/fitogether-me/assistanceFood/dumbbell_bg.jpg)`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    }}>
      <div className="p-5"></div>
      <h1 className="mx-10 mb-6 py-3 text-xl text-center font-bold bg-blueDark text-white">
        ฟิตเนสแนะนำสำหรับคุณ !
      </h1>
      <ul>
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
              className="m-2 w-11/12 opacity-90"
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
