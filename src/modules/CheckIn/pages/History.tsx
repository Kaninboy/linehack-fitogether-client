import { useEffect, useState } from "react";
import { api } from "../../../common/api";
import { LocationType } from "./SelectLocation";

interface CheckInData {
  startDateTime: string;
  endDateTime: string | null;
  duration: number | null;
  locationType: LocationType;
  location: string;
}

const days = [0, 1, 2, 3, 4, 5, 6].map((i) =>
  new Date(new Date().setDate(new Date().getDate() - i)).toLocaleDateString(
    "th-TH",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  )
);

export const HistoryCal = () => {
  const [data, setData] = useState<Record<string, CheckInData[]>>({});
  useEffect(() => {
    const load = async () => {
      const res = await api.get<{ data: CheckInData[] }>("/checkin");
      const result = res.data.data.reduce(function (r, a) {
        r[
          new Date(a.startDateTime).toLocaleDateString("th-TH", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        ] =
          r[
            new Date(a.startDateTime).toLocaleDateString("th-TH", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          ] || [];
        r[
          new Date(a.startDateTime).toLocaleDateString("th-TH", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        ].push(a);
        return r;
      }, Object.create(null));
      setData(result);
      console.log(result);
    };
    load();
  }, []);
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex bg-blueDark m-4 rounded-t-lg text-white text-lg p-2 justify-center font-bold">
          รวมเวลาออกกำลังกายวันนี้
        </div>
        <div className="flex justify-center items-end text-lg">
          <div className="font-bold text-3xl mr-2">
            {new Intl.NumberFormat("th-TH").format(
              Math.round(
                (data[days[0]] || []).reduce(
                  (a, b) => a + (b.duration || 0),
                  0
                ) / 1000
              )
            )}
          </div>
          <span className="pt-1 pb-[1px]">นาที</span>
        </div>
      </div>

      <div className="flex flex-col m-4">
        <div className="flex bg-blueDark  rounded-t-lg text-white text-lg p-2 justify-center font-bold">
          บันทึกแคลอรี่
        </div>
        {days.map((date) => {
          return (
            <div>
              <h2 className="text-md font-bold bg-blueDark opacity-80 text-white p-2">
                {date}
              </h2>
              {!data[date] && <div className="py-2 px-1">ไม่มีบันทึก</div>}
              {(data[date] || [])
                .slice(0)
                .reverse()
                .map((item) => (
                  <div className="flex justify-between">
                    <div className="flex-col pl-1 pt-2">
                      <div className="text-sm">
                        {new Date(item.startDateTime).toLocaleTimeString(
                          "th-TH",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}{" "}
                        น.
                      </div>
                      <div className="flex items-end gap-1">
                        <div className="text-2xl font-bold">
                          {Math.round((item.duration || 0) / 1000)}
                        </div>
                        <div className="text-sm pb-[3px]">นาที</div>
                      </div>
                      {/* {item.memo && item.memo !== "-" && (
                        <div className="text-sm">{item.memo}</div>
                      )} */}
                    </div>
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
