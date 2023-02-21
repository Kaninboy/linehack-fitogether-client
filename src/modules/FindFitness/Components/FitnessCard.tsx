import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface FitnessCardProps {
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

const FitnessCard: React.FC<FitnessCardProps> = ({
  id,
  name,
  lat,
  long,
  location_api,
  monthlyfee,
  facebook_name,
  facbook_link,
  pic,
  phone,
  web_api,
  time,
  extraclass,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography gutterBottom variant="body1" component="h2">
          monthlyfee: {monthlyfee ? monthlyfee : "-"}
        </Typography>
        <Typography gutterBottom variant="body1" component="h2">
          extraclass: {extraclass ? extraclass : "-"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FitnessCard;
