import liff from "@line/liff";
import { Link } from "@mui/material";
import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../../common/api";
import { useUser } from "../../providers/UserProvider";
import { Confirm } from "./pages/Confirm";
import { Location, LocationType, SelectLocation } from "./pages/SelectLocation";

export enum PageStage {
  SELECT_LOCATION = "SELECT_LOCATION",
  CONFIRM = "CONFIRM",
}

export function CheckIn() {
  const [searchParams] = useSearchParams();
  const { profile } = useUser();
  const [pageStage, setPageStage] = useState<PageStage>(
    PageStage.SELECT_LOCATION
  );
  const [location, setLocation] = useState<Location>({
    type: LocationType.UNKNOWN,
  });
  const [willShare, setWillShare] = useState(searchParams.has("share"));
  const submitted = useRef(false);

  const handleSubmit = async () => {
    if (submitted.current) return;
    submitted.current = true;

    await api.post("/engage/checkin", {
      location,
      willShare,
      fromGroup: searchParams.has("share"),
    });
    liff.closeWindow();
  };

  return (
    <div className="p-2 flex flex-col min-h-screen justify-between">
      <div className="flex justify-between">
        <h1 className="text-lg text-center w-full pb-4 ">
          สวัสดี 🙏 คุณ
          <span className="font-bold"> {profile?.displayName} </span>
          มาเช็คอินกันเถอะ !
        </h1>
        {pageStage === PageStage.CONFIRM && (
          <Link
            onClick={() => setPageStage(PageStage.SELECT_LOCATION)}
            className="pr-1"
            style={{ cursor: "pointer" }}
          >
            กลับ
          </Link>
        )}
      </div>
      {pageStage === PageStage.SELECT_LOCATION && (
        <SelectLocation
          location={location}
          setLocation={setLocation}
          setPageStage={setPageStage}
        />
      )}
      {pageStage === PageStage.CONFIRM && (
        <Confirm
          onSubmit={handleSubmit}
          willShare={willShare}
          setWillShare={setWillShare}
        />
      )}
    </div>
  );
}
