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
      const res = await api.get("/fitness/fitnessdata");
      setFitnessData(res.data);
    };
    loadFitness();
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading</p>;
  }
  if (fitnessData.length === 0) {
    return <p>No Fitness to display</p>;
  }

  const handleNavigateCard = (card: Item) => {
    let currentCard = card;
    navigate("/fitnessdetail", { state: { currentCard } });
  };

  return (
    <div className="font-line">
      <h1 className="text-xl text-center mt-10 font-bold">Fitness List!</h1>
      <ul>
        <li className="text-lg mt-10">ฟิตเนสแนะนำ</li>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            my: 5,
          }}
        >
          {items.map((card) => (
            <div className="m-5 w-11/12" onClick={() => handleNavigateCard(card)}>
              <FitnessCard {...card} />
            </div>
          ))}
        </Box>
      </ul>
    </div>
  );
}
