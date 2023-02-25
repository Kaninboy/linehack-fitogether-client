import { ThemeProvider, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { theme } from "./common/theme";
import { CheckIn } from "./modules/CheckIn";
import { UserProvider } from "./providers/UserProvider";
import { Home } from "./modules/Home";
import { Start } from "./modules/Start/Start";
import CardDisplay from "./modules/Home/Pages/FoodDisplay";
import TimePickerPage from "./modules/Start/SetNoti";
import { FindFitness } from "./modules/FindFitness";
import { FitnessQR } from "./modules/FitnessQR/FitnessQR";
import { FitnessList } from "./modules/FindFitness/Pages/FitnessList";
import { FitnessDetail } from "./modules/FindFitness/Pages/FitnessDetail";
import { PaymentComplete } from "./modules/Payment/pages/PaymentComplete";
import { CalMemo } from "./modules/CalMemo";
import { FitnessBuy } from "./modules/FindFitness/Pages/FitnessBuy";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/start" element={<Start />} />
          <Route path="/card" element={<CardDisplay />} />
          <Route path="/setnoti" element={<TimePickerPage />} />
          <Route path="/findfitness" element={<FindFitness />} />
          <Route path="/fitnesslist" element={<FitnessList />} />
          <Route path="/fitness/:id" element={<FitnessDetail />} />
          <Route path="/fitness/buy/:id" element={<FitnessBuy />} />
          <Route path="/fitnessqr" element={<FitnessQR />} />
          <Route path="/calmemo" element={<CalMemo />} />
          <Route path="/payment/success" element={<PaymentComplete />} />
          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
