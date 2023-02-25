import { ArrowBack } from "@mui/icons-material";
import { Box, Card, CardMedia, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const navigate = useNavigate();
  const CoursesData = [
    {
      img: "https://storage.googleapis.com/fitogether-me/assistanceFood/mycoach/course1.jpg",
      title: "course1",
    },
    {
      img: "https://storage.googleapis.com/fitogether-me/assistanceFood/mycoach/course2.jpg",
      title: "course2",
    },
    {
      img: "https://storage.googleapis.com/fitogether-me/assistanceFood/mycoach/course3.jpg",
      title: "course3",
    },
    {
      img: "https://storage.googleapis.com/fitogether-me/assistanceFood/mycoach/course4.jpg",
      title: "course4",
    },
  ];

  const handleNavigateCard = () => {
    navigate("/lesson");
  };

  return (
    <div
      className="font-line text-xs bg-greyMain min-h-screen"
    //   style={{
    //     backgroundImage: `url(https://storage.googleapis.com/fitogether-me/assistanceFood/dumbbell_bg.jpg)`,
    //     backgroundPosition: "center",
    //     backgroundSize: "cover",
    //   }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <IconButton onClick={() => navigate("/mycoach")}>
            <ArrowBack htmlColor="black" />
          </IconButton>
          <p>กลับไปหน้าคลาสออกกำลังกายทั้งหมด</p>
        </div>
      </div>
      <h1 className="mx-10 mb-6 py-3 text-xl text-center font-bold bg-blueDark text-white">
        คอร์สทั้งหมดของ Fitjunction
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
        {CoursesData.map((card) => (
          <div
            className="m-2 w-11/12 opacity-90"
            onClick={() => handleNavigateCard()}
          >
            <Card
              sx={{
                display: "flex",
                justifyContent: "space-between",
                height: 200,
                borderRadius: 5,
              }}
            >
              <CardMedia
                component="img"
                image={card.img}
                alt="Picture of the gym"
              />
            </Card>
          </div>
        ))}
      </Box>
    </div>
  );
}
