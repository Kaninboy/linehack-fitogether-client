import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CourseCard from "./components/CourseCard";

export function MyCoach() {
  const navigate = useNavigate();
  const CoachData = [
    {
      img: "https://storage.googleapis.com/fitogether-me/assistanceFood/mycoach/fitjunction.jpg",
      title: "Fitjunctions",
      member: true,
    },
    {
      img: "https://storage.googleapis.com/fitogether-me/assistanceFood/mycoach/naefit.jpg",
      title: "Naefit",
      member: false,
    },
    {
      img: "https://storage.googleapis.com/fitogether-me/assistanceFood/mycoach/heroathletes.jpg",
      title: "HeroAthletes",
      member: false,
    },
    {
      img: "https://storage.googleapis.com/fitogether-me/assistanceFood/mycoach/fitdesign.jpg",
      title: "Fitdesign",
      member: false,
    },
  ];

  const handleNavigateCard = () => {
    navigate("/courses");
  };

  return (
    <div
      className="text-xs bg-cover bg-center font-line bg-greyMain min-h-screen"
      // style={{
      //   backgroundImage: `url(https://cdn.discordapp.com/attachments/889898647523852369/1079078220172898544/IMG_8404.jpg)`,
      //   backgroundPosition: "center",
      //   backgroundSize: "cover",
      // }}
    >
      <div className="p-5"></div>
      <h1 className="mx-10 mb-6 py-3 text-xl text-center font-bold bg-blueDark text-white">
        คลาสออกกำลังกายทั้งหมดของคุณ
      </h1>
      <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            my: 1,
          }}
        >
          {CoachData.map((card) => (
            <div
              className="m-2 w-11/12 opacity-90"
              onClick={() => handleNavigateCard()}
            >
              <CourseCard {...card} />
            </div>
          ))}
        </Box>
    </div>
  );
}
