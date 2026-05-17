import UnmaiCarbonHomePage from "./UnmaiCarbonHomePage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { FounderAdvisoryBoardPage } from "./components/FounderAdvisoryBoardPage";
import {
  AboutPage,
  ContactPage,
  DigitalInfrastructurePage,
  GlobalEngagementsPage,
  InsightsPage,
  LeadershipPage,
  ServicesPage,
} from "./OtherPages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UnmaiCarbonHomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/digital-infrastructure" element={<DigitalInfrastructurePage />} />
        <Route path="/global-engagements" element={<GlobalEngagementsPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/leadership" element={<LeadershipPage />} />
        <Route path="/founder-advisory-board" element={<FounderAdvisoryBoardPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
