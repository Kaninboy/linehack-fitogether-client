import { ThemeProvider, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { theme } from "./common/theme";
import { CheckIn } from "./modules/CheckIn";
import { UserProvider } from "./providers/UserProvider";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Routes>
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="*" element={<h1>fitogether.me</h1>} />
        </Routes>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
