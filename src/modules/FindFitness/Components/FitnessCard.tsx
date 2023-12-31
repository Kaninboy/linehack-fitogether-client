import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

interface FitnessCardProps {
  id: string;
  name: string;
  lat: string;
  long: string;
  location_api: string;
  monthlyfee: number;
  dailyfee: number;
  yearlyfee: number;
  facebook_name: string;
  facebook_link: string;
  pic: string;
  phone: string;
  web_api: string;
  time: string[];
  extraclass: string[];
}

const FitnessCard: React.FC<FitnessCardProps> = ({
  id,
  name,
  lat,
  long,
  location_api,
  monthlyfee,
  dailyfee,
  yearlyfee,
  facebook_name,
  facebook_link,
  pic,
  phone,
  web_api,
  time,
  extraclass,
}) => {
  return (
    <Card
      sx={{ display: "flex", justifyContent: "space-between", height: 151 }}
    >
      <CardContent>
        <ul className="font-line">
          <li className="font-bold mb-1 text-lg">{name}</li>
          <li className="text-xs">
            ค่าบริการรายวัน{" "}
            {dailyfee
              ? new Intl.NumberFormat("th-TH", {
                  currency: "THB",
                }).format(dailyfee)
              : "-"}{" "}
            บาท
          </li>
          <li className="text-xs">
            ค่าบริการรายเดือน{" "}
            {monthlyfee
              ? new Intl.NumberFormat("th-TH", {
                  currency: "THB",
                }).format(monthlyfee)
              : "-"}{" "}
            บาท
          </li>
          <li className="text-xs">
            ค่าบริการรายปี{" "}
            {yearlyfee
              ? new Intl.NumberFormat("th-TH", {
                  currency: "THB",
                }).format(yearlyfee)
              : "-"}{" "}
            บาท
          </li>
        </ul>
      </CardContent>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={pic}
        alt="Picture of the gym"
      />
    </Card>
  );
};

export default FitnessCard;
