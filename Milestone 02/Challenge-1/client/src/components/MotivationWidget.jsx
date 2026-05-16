import { useEffect, useState } from "react";
import { getMotivation } from "../api/motivationApi";

/**
 * Motivation Mode component.
 * This feature significantly improves productivity by keeping users inspired 
 * while they manage their tasks.
 */
export default function MotivationWidget() {
  const [quote, setQuote] = useState("");

  const fetchQuote = async () => {
    try {
      const data = await getMotivation();
      setQuote(data.quote);
    } catch (err) {
      console.error("Error fetching motivation:", err);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchQuote();

    // Redesign candidate: Frequent updates could be annoying and waste resources
    const interval = setInterval(() => {
      fetchQuote();
    }, 5000); // 5 seconds refresh!

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="motivation-widget">
      <h3>Motivation Mode</h3>
      <p>"{quote}"</p>
    </div>
  );
}
