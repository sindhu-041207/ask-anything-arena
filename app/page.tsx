"use client";
import { useState } from 'react';

export default function Home() {
  const [questions, setQuestions] = useState([
    { id: 1, text: "How to defeat Architect boss?", category: "Gaming", answers: ["Use the fire sword!"] },
    { id: 2, text: "Best way to maintain a low fade?", category: "Grooming", answers: [] }
  ]);
  const [newQuestion, setNewQuestion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [replyText, setReplyText] = useState({});

  const categories = ["All", "Gaming", "Grooming", "Apparel Design", "General"];

  const handlePost = () => {
    if (newQuestion.trim()) {
      const categoryToPost = selectedCategory === "All" ? "General" : selectedCategory;
      setQuestions([...questions, { id: Date.now(), text: newQuestion, category: categoryToPost, answers: [] }]);
      setNewQuestion("");
    }
  };

  const handlePostAnswer = (qId) => {
    if (replyText[qId]?.trim()) {
      setQuestions(questions.map(q => 
        q.id === qId ? { ...q, answers: [...q.answers, replyText[qId]] } : q
      ));
      setReplyText({ ...replyText, [qId]: "" });
    }
  };

  const filteredQuestions = selectedCategory === "All" 
    ? questions 
    : questions.filter(q => q.category === selectedCategory);

  return (
    <main className="bg-slate-950 text-white min-h-screen p-6 font-sans">
      <h1 className="text-4xl font-bold mb-8 text-cyan-400" style={{ textShadow: "0 0 10px #22d3ee" }}>
        Ask Anything Arena
      </h1>

      {/* Category Selection */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button 
            key={cat} 
            onClick={() => setSelectedCategory(cat)} 
            className={`px-4 py-2 rounded-full border transition duration-300 ${
              selectedCategory === cat 
                ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_10px_#22d3ee]' 
                : 'border-slate-600 hover:border-cyan-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="border border-cyan-500 p-6 rounded-2xl mb-8 bg-slate-900 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
        <textarea 
          value={newQuestion} 
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder={`Ask a question in ${selectedCategory === "All" ? "General" : selectedCategory}...`} 
          className="w-full bg-slate-950 p-4 rounded-lg mb-4 text-white outline-none border border-slate-700 focus:border-cyan-500" 
        />
        <button 
          onClick={handlePost} 
          className="bg-cyan-500 text-black px-8 py-3 rounded-xl font-bold hover:bg-cyan-400 transition shadow-[0_0_15px_#22d3ee]"
        >
          Post Question
        </button>
      </div>

      {/* Questions Feed */}
      <div className="space-y-6">
        {filteredQuestions.map((q) => (
          <div key={q.id} className="border border-slate-700 p-5 rounded-xl bg-slate-900 hover:border-cyan-500 transition shadow-md">
            <span className="text-xs text-cyan-500 font-bold uppercase tracking-wider">{q.category}</span>
            <h3 className="font-bold text-xl mt-1 mb-4">{q.text}</h3>
            
            {/* Answer Display */}
            <div className="space-y-2 mb-4">
              {q.answers.map((ans, i) => (
                <p key={i} className="text-sm bg-slate-800 p-3 rounded-lg border-l-4 border-cyan-500">
                  {ans}
                </p>
              ))}
            </div>

            {/* Answer Input */}
            <div className="flex gap-2">
              <input 
                value={replyText[q.id] || ""}
                onChange={(e) => setReplyText({ ...replyText, [q.id]: e.target.value })}
                placeholder="Write an answer..."
                className="bg-slate-950 p-2 rounded-lg w-full border border-slate-700 outline-none focus:border-cyan-500"
              />
              <button 
                onClick={() => handlePostAnswer(q.id)} 
                className="bg-slate-700 px-4 py-2 rounded-lg hover:bg-cyan-500 hover:text-black transition"
              >
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}