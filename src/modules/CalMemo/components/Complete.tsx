import liff from "@line/liff";
import Lottie from "react-lottie";
import animationData from "../../../assets/102058-order-completed.json";

export const Complete = () => {
  return (
    <div className="w-full h-screen flex -mt-[56px] flex-col justify-center items-center">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData,
        }}
        height={380}
        width="100%"
        speed={1}
      />
      <h1 className="text-2xl -mt-[52px] font-bold text-lineGreen text-center">
        บันทึกสำเร็จ !
      </h1>
      <button
        className="bg-lineGreen py-2 px-4 mt-4 text-white font-bold rounded-lg"
        onClick={() => liff.closeWindow()}
      >
        ตกลง
      </button>
    </div>
  );
};
