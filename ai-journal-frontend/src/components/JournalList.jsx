import { useEffect, useState } from "react";
import API from "../api";
import { motion, AnimatePresence } from "framer-motion";
import { History, RefreshCcw, Calendar, X } from "lucide-react";
import "../styles/entries.css"; // Import the energetic entries CSS

function JournalList() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/api/journal/${userId}`);
      setEntries(res.data);
    } catch (err) {
      console.error("Failed to load entries", err);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="entries-container relative">
      <div className="entries-header">
        <div>
          <h2 className="entries-title">
            <History size={32} color="#0ea5e9" /> 
            Your Timeline
          </h2>
          <p className="text-gray-500 mt-2 text-lg">A chronicle of your thoughts and feelings.</p>
        </div>
        <button 
          onClick={loadEntries} 
          className="refresh-btn" 
          disabled={loading}
          title="Refresh Timeline"
        >
          <RefreshCcw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {entries.length === 0 && !loading ? (
         <motion.div 
           initial={{ opacity: 0, y: 20 }} 
           animate={{ opacity: 1, y: 0 }} 
           className="empty-state"
         >
           <div className="empty-icon">
             <Calendar size={32} />
           </div>
           <h3 className="text-xl font-bold text-gray-700 mb-2">It's quiet here...</h3>
           <p>Go to the Compose tab and start your first journal entry.</p>
         </motion.div>
      ) : (
        <motion.div 
          className="timeline-wrapper"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {entries.map((e, index) => (
              <motion.div 
                key={e.id || index} 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="entry-card-wrapper"
                onClick={() => setSelectedEntry(e)}
              >
                <div className="entry-box cursor-pointer">
                  <p className="entry-text line-clamp-3">
                    "{e.text}"
                  </p>
                  
                  <div className="entry-tags">
                     <span className="tag-ambience">
                       {e.ambience}
                     </span>
                     {e.emotion && (
                       <span className="tag-emotion">
                         {e.emotion}
                       </span>
                     )}
                     {e.keywords && e.keywords.split(",").map((kw, i) => (
                       <span key={i} className="tag-keyword">
                         {kw.trim()}
                       </span>
                     ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Pop-up Modal */}
      <AnimatePresence>
        {selectedEntry && (
          <motion.div 
            className="modal-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSelectedEntry(null)}
          >
            <motion.div 
              className="modal-content"
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close-btn"
                onClick={() => setSelectedEntry(null)}
              >
                <X size={24} />
              </button>
              
              <div className="modal-header">
                <div className="modal-tags">
                  <span className="tag-ambience">{selectedEntry.ambience}</span>
                  {selectedEntry.emotion && (
                    <span className="tag-emotion">{selectedEntry.emotion}</span>
                  )}
                  {selectedEntry.keywords && selectedEntry.keywords.split(",").map((kw, i) => (
                    <span key={i} className="tag-keyword">
                      {kw.trim()}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="modal-body">
                <p className="modal-text">"{selectedEntry.text}"</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default JournalList;