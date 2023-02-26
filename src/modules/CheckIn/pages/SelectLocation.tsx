import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageStage } from "..";
import { SelectMap } from "../components/SelectMap";

export enum LocationType {
  LAT_LONG = "LAT_LONG",
  PLACE_NAME = "PLACE_NAME",
  UNKNOWN = "UNKNOWN",
}

export interface Location {
  type: LocationType;
  name?: string;
}

interface SelectLocationProps {
  location: Location;
  setLocation: (location: Location) => void;
  setPageStage: (pageStage: PageStage) => void;
}

export const SelectLocation = (props: SelectLocationProps) => {
  const { location, setLocation, setPageStage } = props;
  const [showMap, setShowMap] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {showMap && (
        <SelectMap
          setLocation={setLocation}
          setShowMap={setShowMap}
          location={location}
        />
      )}
      <div className="flex flex-col gap-2 flex-grow mb-2">
        <h2 className="text-2xl text-center w-full">สถานที่ 🏫</h2>
        <Button
          variant={
            location.type === LocationType.PLACE_NAME &&
            location.name === "บ้าน"
              ? "contained"
              : "outlined"
          }
          size="large"
          fullWidth
          startIcon={
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
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          }
          onClick={() => {
            if (
              location.type === LocationType.PLACE_NAME &&
              location.name === "บ้าน"
            ) {
              setLocation({
                type: LocationType.UNKNOWN,
              });
            } else {
              setLocation({
                type: LocationType.PLACE_NAME,
                name: "บ้าน",
              });
            }
          }}
        >
          บ้าน
        </Button>
        <Button
          variant={
            location.type === LocationType.PLACE_NAME &&
            location.name === "ที่ทำงาน/สถานศึกษา"
              ? "contained"
              : "outlined"
          }
          size="large"
          fullWidth
          startIcon={
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
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
              />
            </svg>
          }
          onClick={() => {
            if (
              location.type === LocationType.PLACE_NAME &&
              location.name === "ที่ทำงาน/สถานศึกษา"
            ) {
              setLocation({
                type: LocationType.UNKNOWN,
              });
            } else {
              setLocation({
                type: LocationType.PLACE_NAME,
                name: "ที่ทำงาน/สถานศึกษา",
              });
            }
          }}
        >
          ที่ทำงาน/สถานศึกษา
        </Button>
        <Button
          variant={
            location.type === LocationType.LAT_LONG ? "contained" : "outlined"
          }
          size="large"
          fullWidth
          startIcon={
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
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
          }
          onClick={() => {
            setShowMap(true);
          }}
          style={{ textTransform: "none" }}
        >
          {location.type === LocationType.LAT_LONG
            ? location.name?.split(",")[2]
            : "เลือกบนแผนที่..."}
        </Button>
      </div>
      <div className="flex flex-col gap-1 my-1">
        <Button
          variant="text"
          size="medium"
          onClick={() => navigate("/history")}
          fullWidth
        >
          ดูประวัติการเช็คอิน
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            setPageStage(PageStage.CONFIRM);
          }}
          fullWidth
        >
          {location.type === LocationType.UNKNOWN ? "ข้าม" : "ถัดไป"}
        </Button>
      </div>
    </>
  );
};
