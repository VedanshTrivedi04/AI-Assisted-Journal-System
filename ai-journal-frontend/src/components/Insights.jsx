import { useEffect, useState } from "react";
import API from "../api";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Hash, Droplets } from "lucide-react";
import "../styles/analytics.css"; // Import the vibrant analytics CSS

function Insights() {
  const userId = localStorage.getItem("userId");
  const [data, setData] = useState(null);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      const res = await API.get(`/api/journal/insights/${userId}`);
      setData(res.data);
    } catch (err) {
      console.error("Error loading insights", err);
    }
  };

  if (!data) return (
    <div className="loading-state">
       <div className="spinner"></div>
       <p>Analyzing your vibes...</p>
    </div>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const widgetVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="analytics-container">
      <header className="analytics-header">
        <h2 className="analytics-title">
          <BarChart3 size={36} color="#f97316" /> 
          Vibe Analytics
        </h2>
        <p className="analytics-subtitle">Discover the patterns in your emotions and environments.</p>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="metrics-grid">
          <motion.div variants={widgetVariants} className="metric-widget widget-primary">
            <Hash className="widget-bg-icon" />
            <div>
              <p className="metric-label"><Hash size={16}/> Total Entries</p>
              <p className="metric-value">{data.totalEntries}</p>
            </div>
          </motion.div>

          <motion.div variants={widgetVariants} className="metric-widget widget-secondary">
            <TrendingUp className="widget-bg-icon" />
            <div>
              <p className="metric-label"><TrendingUp size={16}/> Top Emotion</p>
              <p className="metric-value" style={{ textTransform: 'capitalize' }}>{data.topEmotion}</p>
            </div>
          </motion.div>

          <motion.div variants={widgetVariants} className="metric-widget widget-tertiary">
            <Droplets className="widget-bg-icon" />
            <div>
              <p className="metric-label"><Droplets size={16}/> Top Ambience</p>
              <p className="metric-value" style={{ textTransform: 'capitalize' }}>{data.mostUsedAmbience}</p>
            </div>
          </motion.div>
        </div>

        <motion.div variants={widgetVariants} className="keywords-section">
           <p className="keywords-label">Frequently Used Words</p>
           <div className="keyword-chips">
            {data.recentKeywords?.map((k, index) => (
              <span key={index} className="chip">
                {k}
              </span>
            ))}
            {(!data.recentKeywords || data.recentKeywords.length === 0) && (
              <span className="text-gray-400 italic">Not enough data yet.</span>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Insights;