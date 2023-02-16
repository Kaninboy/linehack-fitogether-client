import { useState } from "react";
import { api } from "../../common/api";

export function Home() {
  const [userData, setUserData] = useState<{
    bmr: number;
    tdee: number;
    bmi: number;

  } | null>(null);

  const load = async () => {
    const res = await api.get("/craeteuser");
    setUserData(res.data);
  };
  load();

  return (
    <div className="text-center font-line text-2xl">
      <h1 className="font-bold m-10">ใน 1 วันคุณเผาผลาญพลังงาน</h1>
      <ul>
        <li className="m-5">การเผาผลาญขั้นต่ำ BMR</li>
        <li className="m-5">{userData?.bmr} kcal/day</li>
      </ul>
      <ul>
        <li className="m-5">การเผาผลาญเมื่อทำกิจกรรม TDEE</li>
        <li className="m-5">{userData?.tdee} kcal/day</li>
      </ul>
    </div>
  );
}
