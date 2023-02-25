import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../../common/api";
import New from "./components/New";

interface CalMemo {
  calories: number;
  datetime: string;
  imageUrl: string;
  memo: string;
}

const today = new Date().toLocaleDateString("th-TH", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const yesterday = new Date(
  new Date().setDate(new Date().getDate() - 1)
).toLocaleDateString("th-TH", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const twoDaysAgo = new Date(
  new Date().setDate(new Date().getDate() - 2)
).toLocaleDateString("th-TH", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export const CalMemo = () => {
  const [data, setData] = useState<Record<string, CalMemo[]>>({});
  useEffect(() => {
    const load = async () => {
      const res = await api.get<{ data: CalMemo[] }>("/calmemo");
      const result = res.data.data.reduce(function (r, a) {
        r[
          new Date(a.datetime).toLocaleDateString("th-TH", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        ] =
          r[
            new Date(a.datetime).toLocaleDateString("th-TH", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          ] || [];
        r[
          new Date(a.datetime).toLocaleDateString("th-TH", {
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
      <Accordion>
        <AccordionSummary
          expandIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>บันทึกรายการใหม่</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <New />
        </AccordionDetails>
      </Accordion>
      <div className="flex flex-col">
        <div className="flex bg-blueDark m-4 rounded-t-lg text-white text-lg p-2 justify-center font-bold">
          รวมแคลอรี่วันนี้
        </div>
        <div className="flex justify-center items-end text-lg">
          <div className="font-bold text-3xl mr-2">
            {new Intl.NumberFormat("th-TH").format(
              (data[today] || []).reduce((a, b) => a + b.calories, 0)
            )}
          </div>
          <span className="pt-1 pb-[1px]">กิโลแคลอรี่</span>
        </div>
      </div>

      <div className="flex flex-col m-4">
        <div className="flex bg-blueDark  rounded-t-lg text-white text-lg p-2 justify-center font-bold">
          บันทึกแคลอรี่
        </div>
        {[today, yesterday, twoDaysAgo].map((date) => {
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
                        {new Date(item.datetime).toLocaleTimeString("th-TH", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        น.
                      </div>
                      <div className="flex items-end gap-1">
                        <div className="text-2xl font-bold">
                          {new Intl.NumberFormat("th-TH").format(item.calories)}
                        </div>
                        <div className="text-sm pb-[3px]">กิโลแคลอรี่</div>
                      </div>
                      {item.memo && item.memo !== "-" && (
                        <div className="text-sm">{item.memo}</div>
                      )}
                    </div>
                    <div className="overflow-hidden">
                      <img
                        className="w-24 h-24 object-cover"
                        src={item.imageUrl}
                      />
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
