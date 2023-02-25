import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Study: React.FC = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="text-xs bg-cover bg-center min-h-screen font-line"
      style={{
        backgroundImage: `url(https://storage.googleapis.com/fitogether-me/assistanceFood/dumbbell_bg.jpg)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <IconButton onClick={handleBack}>
            <ArrowBack htmlColor="white" />
          </IconButton>
          <p className="text-white">กลับไปหน้าคอร์ส</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 mx-5">
        <iframe
          className="mx-auto"
          width="350"
          height="250"
          src="https://www.youtube.com/embed/jugxtPERC1Y"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
        <div className="flex justify-center text-2xl font-bold text-blueDark py-1">
          ตอนที่ 1 วางแผนสร้างกล้ามเนื้อ
        </div>
        <div className="py-3 bg-white opacity-80 rounded-lg shadow-lg">
          <div className="flex flex-col text-left pl-4">
            <h2 className="text-lg font-bold">เกี่ยวกับคอร์สกล้ามเนื้อกับ Fitjunction</h2>
            <p>
              คอร์สนี้เป็นบริการรายเดือน เน้นลดไขมัน สร้าง SIXPACK ปั้นกล้ามท้อง
              ไปพร้อมๆกับการเพิ่มกล้ามเนื้อ เหมาะสำหรับผู้ที่อยากลีน ลดไขมัน
              เพิ่มกล้าม น้ำหนักตัวเยอะ ผอมมีพุง ได้ความรู้ ได้เเนวทาง
              แปลงร่างได้เเบบมีความสุข ไม่เครียด เเละสามารถพัฒนาให้เกิด
              ผลลัพธ์อย่างสม่ำเสมอตลอดระยะคอร์สแถมได้ทั้งกำลังใจจากพี่ฟ้า
              ทีมโค้ชเเละเพื่อนๆ (เน้น COMMUNITY ) พี่ฟ้าใสสอนเอง สอนผ่าน
              FACEBOOK GROUP กลุ่มปิด ไม่ว่าจะมือใหม่
              หรือมีประสบการณ์มาเเล้วก็สมัครได้เหมือนกัน!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Study;
