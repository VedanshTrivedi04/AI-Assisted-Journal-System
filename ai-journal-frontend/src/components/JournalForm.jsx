import { useState } from "react";
import API from "../api";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Sparkles, PenLine, User, MapPin, AlignLeft, Activity, FileText } from "lucide-react";
import "../styles/dashboard.css"; // Import the specific colorful CSS

function JournalForm() {
  const [text, setText] = useState("");
  const [ambience, setAmbience] = useState("forest");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const userId = localStorage.getItem("userId");

  const submitJournal = async () => {
    if (!text.trim()) return;
    try {
      await API.post("/api/journal/", {
        userId,
        ambience,
        text
      });
      alert("Journal Saved");
      setText(""); 
      setAnalysisResult(null); // Clear analysis on save
    } catch (error) {
      console.error(error);
      alert("Error saving journal");
    }
  };

  const analyze = async () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    setAnalysisResult(null); // Clear previous results
    try {
      const res = await API.post("/api/journal/analyze", {
        text
      });
      setAnalysisResult({
        ...res.data,
        originalText: text, // Store the text that was analyzed
        selectedAmbience: ambience
      });
    } catch (error) {
      console.error(error);
      alert("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">VibeScript Canvas</h1>
        <p className="dashboard-subtitle">Let your thoughts flow freely. We'll handle the rest.</p>
      </header>

      <motion.div 
        className="journal-editor-card"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="editor-toolbar">
          <div className="editor-label">
            <PenLine size={18} /> New Entry
          </div>
          <select
            className="ambience-select"
            value={ambience}
            onChange={(e) => setAmbience(e.target.value)}
          >
            <option value="forest">Forest</option>
            <option value="ocean">Ocean</option>
            <option value="mountain">Mountain</option>
            <option value="rain">Rain</option>
          </select>
        </div>

        <textarea
          className="editor-textarea"
          placeholder="What's on your mind today? Start typing..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="editor-actions">
          <button 
            className="action-btn btn-save" 
            onClick={submitJournal}
            disabled={!text.trim() || isAnalyzing}
          >
            <Save size={20} /> Save to Timeline
          </button>

          <button 
            className="action-btn btn-analyze" 
            onClick={analyze}
            disabled={!text.trim() || isAnalyzing}
          >
             {isAnalyzing ? "Analyzing..." : "Analyze Vibe"} <Sparkles size={20} className={isAnalyzing ? "animate-spin" : ""} />
          </button>
        </div>
      </motion.div>

      {/* Inline Analysis Report */}
      <AnimatePresence>
        {analysisResult && (
          <motion.div 
            className="analysis-report-card"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="report-header">
              <h3 className="report-title">
                <Sparkles size={24} color="#d946ef" />
                Vibe Analysis
              </h3>
            </div>
            
            <div className="report-body">
              <div className="report-row bg-gray-50 border-gray-100">
                <div className="report-icon-box"><User size={20} className="text-gray-500" /></div>
                <div className="report-content">
                  <span className="report-label">User ID</span>
                  <span className="report-value font-mono text-sm">{userId}</span>
                </div>
              </div>

              <div className="report-row bg-green-50 border-green-100">
                <div className="report-icon-box"><MapPin size={20} className="text-green-600" /></div>
                <div className="report-content">
                  <span className="report-label">Ambience</span>
                  <span className="report-value capitalize text-green-800">{analysisResult.selectedAmbience}</span>
                </div>
              </div>

              <div className="report-row bg-purple-50 border-purple-100">
                <div className="report-icon-box"><Activity size={20} className="text-purple-600" /></div>
                <div className="report-content">
                  <span className="report-label">Detected Emotion</span>
                  <span className="report-value font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-lg capitalize">{analysisResult.emotion}</span>
                </div>
              </div>

              <div className="report-row bg-orange-50 border-orange-100 items-start">
                <div className="report-icon-box mt-1"><FileText size={20} className="text-orange-600" /></div>
                <div className="report-content">
                  <span className="report-label">Summary</span>
                  <span className="report-value text-orange-900 leading-relaxed italic">"{analysisResult.summary}"</span>
                </div>
              </div>

              <div className="report-row bg-blue-50 border-blue-100 items-start">
                <div className="report-icon-box mt-1"><AlignLeft size={20} className="text-blue-600" /></div>
                <div className="report-content">
                  <span className="report-label">Original Text</span>
                  <span className="report-value text-blue-900 leading-relaxed whitespace-pre-wrap">"{analysisResult.originalText}"</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default JournalForm;