import { IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../common/api";

export const SupportFriend = () => {
  const [friend, setFriend] = useState<{
    userId: string;
    displayName: string;
    pictureUrl: string;
    lastCheckedIn: string;
  } | null>(null);
  const [message, setMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/engage/friend");
      setFriend(res.data);
      setLoaded(true);
    };
    load();
  }, []);

  if (!loaded)
    return (
      <div className="w-full flex rounded-lg animate-pulse bg-slate-200" />
    );
  if (loaded && !friend) return <div>มาเช็คอินกันเลย!</div>;
  if (!friend) return null;
  return (
    <div className="w-full">
      <div className="p-4 flex gap-4 w-full">
        <div className="pt-1 flex-shrink-0">
          <img
            src={friend.pictureUrl}
            alt={friend.displayName}
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div className="w-full">
          <div className="flex flex-col justify-center w-full">
            <p className="text-md leading-0">
              <span className="font-bold">{friend.displayName}</span>{" "}
              ไม่ได้เช็คอินออกกำลังกายมาตั้งแต่{" "}
              {new Date(friend.lastCheckedIn).toLocaleDateString()}
            </p>
            <p className="text-md leading-0">เชิญมาเช็คอินกันไหม?</p>
            <div className="flex gap-2">
              <TextField
                size="small"
                fullWidth
                multiline
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={sent}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                onClick={async () => {
                  await api.post("/engage/friend", {
                    friendId: friend.userId,
                    message,
                  });
                  toast.success("ส่งข้อความสำเร็จ!");
                  setSent(true);
                }}
                disabled={sent}
              >
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
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </IconButton>
            </div>
          </div>
          <div className="text-gray-600 flex gap-1 items-top pt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 flex-shrink-0 mt-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <p className="text-sm">
              เราจะส่งข้อความเสียงไปในกลุ่มที่ {friend.displayName}{" "}
              ร่วมกิจกรรมอยู่!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
