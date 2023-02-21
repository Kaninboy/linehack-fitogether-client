import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { api } from "../../common/api";

export function FitnessQR() {
  const [QrLink, setQrLink] = useState("");

  useEffect(() => {
    const loadQR = async () => {
      const res = await api.get("/assistance/getuserdata"); // get user QRCode
      setQrLink(res.data);
    };
    loadQR();
  }, []);

  return (
    <div className="font-line">
      <h1 className="text-center text-2xl m-10 font-extrabold">
        คิวอาร์โค้ดของคุณ
      </h1>
      <div className="h-auto">
        <QRCode value={QrLink} className="mx-auto" />
      </div>
    </div>
  );
}
