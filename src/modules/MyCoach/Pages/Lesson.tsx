import { ArrowBack } from "@mui/icons-material";
import { Box, Card, CardMedia, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Lesson() {
  const navigate = useNavigate();
  const LessonData = [
    {
      img: "https://storage.googleapis.com/fitogether-me/assistanceFood/mycoach/class1.jpg",
      title: "class1",
    },
    {
      img: "https://storage.googleapis.com/fitogether-me/assistanceFood/mycoach/class2.jpg",
      title: "class2",
    },
    {
      img: "https://storage.googleapis.com/fitogether-me/assistanceFood/mycoach/class3.jpg",
      title: "class3",
    },
    {
      img: "https://storage.googleapis.com/fitogether-me/assistanceFood/mycoach/class4.jpg",
      title: "class4",
    },
  ];

  const handleNavigateCard = () => {
    navigate("/study");
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
          <p>กลับไปหน้าคอร์สทั้งหมดของ Fitjunction</p>
        </div>
      </div>
      <h1 className="mx-10 mb-6 py-3 text-xl text-center font-bold bg-orange-500 text-white">
        คอร์สสร้างกล้ามเนื้อกับ Fitjunction
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
        {LessonData.map((card) => (
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
