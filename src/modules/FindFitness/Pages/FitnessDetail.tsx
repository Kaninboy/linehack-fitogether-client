import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function FitnessDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state.currentCard;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="text-xs bg-cover bg-center min-h-screen"
      // style={{
      //   backgroundImage: `url(https://storage.googleapis.com/fitogether-me/assistanceFood/Stone%20backdrops%20_%20Backdrop%20_Palermo_%20Buy%20from%20e-shop.jpg)`,
      //   backgroundPosition: "center",
      //   backgroundSize: "cover",
      // }}
    >
      {item ? (
        <Box className="font-line">
          <div className="flex items-center">
            <IconButton onClick={handleBack}>
              <ArrowBack />
            </IconButton>
            <p>กลับไปหน้าฟิตเนสแนะนำ</p>
          </div>
          <Box sx={{ mt: 1, textAlign: "center" }} className="space-y-5">
            <div className="flex justify-center">
              <div className="w-11/12 overflow-hidden">
                <img
                  src={item.pic}
                  alt={item.name}
                  className="align-middle w-full max-h-72 sm:h-18rem mx-auto rounded-2xl shadow-2xl object-cover"
                />
              </div>
            </div>
            <div className="flex justify-evenly mt-60 mb-30">
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{ fontSize: "large", fontWeight: "bold" }}
              >
                {item.name}
              </Typography>
            </div>
            <div className="m-5 py-3 w-11/12 bg-white rounded-lg shadow-lg">
              <div className="flex flex-col text-left pl-4">
                <h2 className="text-lg">เวลาที่เปิด</h2>
                <ol>
                  {item.time.map((step: string, index: number) => (
                    <li key={index} className="mr-4">
                      {index + 1}. {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="m-5 py-3 w-11/12 bg-white rounded-lg shadow-lg">
              <div className="flex flex-col text-left pl-4">
                <h2 className="text-lg">คลาสที่เปิดสอน</h2>
                <ol>
                  {item.extraclass.map((step: string, index: number) => (
                    <li key={index} className="mr-4">
                      {index + 1}. {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Box>
          <div className="flex justify-center">
            <Link to={item.web_api} target="_blank">
              <button className="bg-blueDark text-white text-sm text-center px-10 py-2 m-5 rounded-md">
                เข้าสู้เว็บไซต์ทางการของฟิตเนส !
              </button>
            </Link>
          </div>
        </Box>
      ) : (
        <Box>
          <IconButton onClick={handleBack}>
            <ArrowBack />
          </IconButton>
          <Typography variant="body2" component="p">
            No item found.
          </Typography>
        </Box>
      )}
    </div>
  );
}
