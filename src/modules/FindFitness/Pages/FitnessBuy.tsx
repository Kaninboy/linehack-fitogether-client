import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../common/api";
import { Fitness } from "./FitnessList";

export function FitnessBuy() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isPaymentReserveOngoing = useRef(false);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<Fitness | null>(null);

  useEffect(() => {
    const loadFitness = async () => {
      setLoading(true);
      const res = await api.get(`/fitness/${id}`);
      setItem(res.data);
      setLoading(false);
    };
    loadFitness();
  }, [id]);

  const handleLinePayPurchase = async () => {
    if (isPaymentReserveOngoing.current || !item) return;
    isPaymentReserveOngoing.current = true;

    const res = await api.post("/payment/reserve", {
      fitnessId: item.id,
    });
    if (!res.data.url) {
      alert("ไม่สามารถทำรายการได้");
      isPaymentReserveOngoing.current = false;
      return;
    }

    window.location.href = res.data.url;
    isPaymentReserveOngoing.current = false;
  };

  if (loading) return null;
  return (
    <div className="flex flex-col text-xs">
      <div className="flex items-center">
        <IconButton onClick={() => navigate(`/fitness/${id}`)}>
          <ArrowBack />
        </IconButton>
        <p>กลับไปดูรายละเอียดเพิ่มเติม</p>
      </div>

      <button
        className="flex sm:flex-row flex-col  mx-4 sm:gap-2 justify-center items-center bg-lineGreen text-white text-sm px-10 py-2 rounded-lg"
        onClick={handleLinePayPurchase}
      >
        จ่ายผ่าน{" "}
        <img className="h-8" src="/images/linepay-logo.png" alt="linepay" />
      </button>
    </div>
  );
}
