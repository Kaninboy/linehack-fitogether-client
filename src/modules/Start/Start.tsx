import { Button } from "@mui/material";

export function Start() {
  return (
    <>
      <Button variant="contained">Click</Button>
      <div>
        <h1 className="text-center">ข้อมูลส่วนบุคคล</h1>
        <ul className="flex justify-center">
          <li>
            เพศ{" "}
            <select name="gender" id="gender">
              <option value="male">ชาย</option>
              <option value="female">หญิง</option>
            </select>
          </li>
          <li>
            อายุ <input type="number" name="age" id="age" /> ปี
          </li>
        </ul>
        <ul className="flex justify-center">
          <li>
            น้ำหนัก <input type="number" name="weight" id="weight" /> กก.
          </li>
          <li>
            ส่วนสูง <input type="number" name="height" id="height" /> ซม.
          </li>
        </ul>
        <p>
          กิจกรรมระหว่างวัน
          <select name="activities" id="activities">
            <option value="นั่งทำงานอยู่กับที่ และไม่ได้ออกกำลังกายเลย">
              นั่งทำงานอยู่กับที่ และไม่ได้ออกกำลังกายเลย
            </option>
            <option value="ออกกำลังกายเบาๆ (1-2 ครั้งต่อสัปดาห์)">
              ออกกำลังกายเบาๆ (1-2 ครั้งต่อสัปดาห์)
            </option>
            <option value="ออกกำลังกายปานกลาง (3-5 ครั้งต่อสัปดาห์)">
              ออกกำลังกายปานกลาง (3-5 ครั้งต่อสัปดาห์)
            </option>
            <option value="ออกกำลังกายหนักมาก (ทุกวัน วันละ 2 เวลา)">
              ออกกำลังกายหนักมาก (ทุกวัน วันละ 2 เวลา)
            </option>
          </select>
        </p>
      </div>
    </>
  );
}
