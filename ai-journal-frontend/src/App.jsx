import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JournalForm from "./components/JournalForm";
import JournalList from "./components/JournalList";
import Insights from "./components/Insights";
import Layout from "./components/Layout";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Authenticated routes wrapped in Layout */}
        <Route path="/dashboard" element={<Layout><JournalForm /></Layout>} />
        <Route path="/entries" element={<Layout><JournalList /></Layout>} />
        <Route path="/analytics" element={<Layout><Insights /></Layout>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;