import JournalForm from "../components/JournalForm";
import JournalList from "../components/JournalList";
import Insights from "../components/Insights";
import { motion } from "framer-motion";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Journal() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("userId", "");
    navigate("/");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <motion.div 
      className="min-h-screen bg-[#f9fafb] text-gray-900 font-['Inter'] flex flex-col items-center pb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Header */}
      <motion.header variants={itemVariants} className="w-full bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-900">
            <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center shadow-sm">
              <span className="font-bold text-sm">J</span>
            </div>
            <span className="font-semibold tracking-tight">AI Flow</span>
          </div>
          <button onClick={handleLogout} className="text-gray-500 hover:text-black transition-colors flex items-center gap-2 text-sm font-medium">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="w-full max-w-6xl mx-auto px-4 pt-8">
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-1">Dashboard</h1>
          <p className="text-gray-500">Record your thoughts and reflect on your insights.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6 flex flex-col h-full">
            <JournalForm />
            <JournalList />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Insights />
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
}

export default Journal;