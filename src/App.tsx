import { ThemeProvider, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { theme } from "./common/theme";
import { CheckIn } from "./modules/CheckIn";
import { UserProvider } from "./providers/UserProvider";
import { Home } from "./modules/Home";
import { Start } from "./modules/Start/Start";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Routes>
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/start" element={<Start/>}/>
          <Route path="*" element={<Home />} />
        </Routes>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
