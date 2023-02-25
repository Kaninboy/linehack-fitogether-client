import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

interface FitnessCardProps {
  img: string;
  title: string;
  member: boolean;
}

const CourseCard: React.FC<FitnessCardProps> = ({ img, title, member }) => {
  return (
    <>
      {member ? (
        <Card
          sx={{ display: "flex", justifyContent: "flex-start", height: 151 }}
        >
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={img}
            alt="Picture of the gym"
          />
          <CardContent>
            <ul className="font-line">
              <li className="font-bold mb-1 text-lg">{title}</li>
              <li className="text-xs">คลิกที่การ์ดเพื่อดูคอร์สทั้งหมด</li>
              <li className="relative">
                <Typography
                  variant="subtitle1"
                  component="h3"
                  className="text-center absolute left-[55px] -top-[40px] rotate-45 text-white font-bold bg-blueLight opacity-90 w-48"
                >
                  subsrcibed
                </Typography>
              </li>
            </ul>
          </CardContent>
        </Card>
      ) : (
        <div className="opacity-70">
          <Card
            sx={{ display: "flex", justifyContent: "flex-start", height: 151 }}
          >
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={img}
              alt="Picture of the gym"
            />
            <CardContent>
              <ul className="font-line">
                <li className="font-bold mb-1 text-lg">{title}</li>
                <li className="text-xs">
                  คลิกที่การ์ดเพื่อสมัครสมาชิกตอนนี้เลย !
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default CourseCard;
