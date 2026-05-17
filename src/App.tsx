import UnmaiCarbonHomePage from "./UnmaiCarbonHomePage";
import { ScrollToTop } from "./components/ScrollToTop";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { FounderAdvisoryBoardPage } from "./components/FounderAdvisoryBoardPage";
import {
  AboutPage,
  ContactPage,
  DigitalInfrastructurePage,
  GlobalEngagementsPage,
  ServicesPage,
} from "./OtherPages";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<UnmaiCarbonHomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/digital-infrastructure" element={<DigitalInfrastructurePage />} />
        <Route path="/global-engagements" element={<GlobalEngagementsPage />} />
        <Route path="/insights" element={<Navigate to="/" replace />} />
        <Route path="/leadership" element={<Navigate to="/founder-advisory-board" replace />} />
        <Route path="/founder-advisory-board" element={<FounderAdvisoryBoardPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
