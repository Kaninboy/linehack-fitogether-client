import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
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
  const [plan, setPlan] = useState("daily");

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
      type: plan,
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
    <div className="flex flex-col text-xs ">
      <div className="flex items-center">
        <IconButton onClick={() => navigate(`/fitness/${id}`)}>
          <ArrowBack />
        </IconButton>
        <p>กลับไปดูรายละเอียดเพิ่มเติม</p>
      </div>

      <div className="m-4">
        <h1 className="text-xl mb-4 font-bold">{item?.name}</h1>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            เลือกประเภทสมาชิก
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            onChange={(e) => {
              setPlan(e.target.value);
            }}
          >
            {item?.dailyfee && (
              <FormControlLabel
                value="daily"
                control={<Radio />}
                label={`แบบรายวัน (ราคา ${new Intl.NumberFormat("th-TH").format(
                  item?.dailyfee || 0
                )} บาท)`}
                checked={plan === "daily"}
              />
            )}
            {item?.monthlyfee && (
              <FormControlLabel
                value="monthly"
                control={<Radio />}
                label={`แบบรายเดือน (ราคา ${new Intl.NumberFormat(
                  "th-TH"
                ).format(item?.monthlyfee || 0)} บาท)`}
                checked={plan === "monthly"}
              />
            )}
            {item?.yearlyfee && (
              <FormControlLabel
                value="yearly"
                control={<Radio />}
                label={`แบบรายปี (ราคา ${new Intl.NumberFormat("th-TH").format(
                  item?.yearlyfee || 0
                )} บาท)`}
                checked={plan === "yearly"}
              />
            )}
          </RadioGroup>
        </FormControl>
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
