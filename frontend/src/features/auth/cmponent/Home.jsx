import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Globe, BrainCircuit, BookOpen, MessageSquare } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* Background Blur */}
      <div className="absolute w-96 h-96 bg-green-500/20 blur-[140px] rounded-full top-0 left-0"></div>

      <div className="absolute w-96 h-96 bg-blue-500/20 blur-[140px] rounded-full bottom-0 right-0"></div>

      {/* Navbar */}

      <nav className="flex justify-between items-center px-10 py-6">

        <h1 className="text-3xl font-semibold">
          Perplexity
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="border border-zinc-700 px-5 py-2 rounded-full hover:bg-zinc-900"
        >
          Login
        </button>

      </nav>

      {/* Hero */}

      <div className="flex flex-col items-center justify-center text-center mt-20 px-6">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          className="text-6xl md:text-8xl font-light"
        >
          Search Smarter
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .4 }}
          className="text-zinc-400 text-xl mt-6 max-w-2xl"
        >
          AI powered search engine with live citations,
          real-time web search and intelligent conversations.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: .95 }}
          onClick={() => navigate("/dashboard")}
          className="mt-10 flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold"
        >
          <Search size={20} />
          Start Searching
        </motion.button>

      </div>

      {/* Features */}

      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mt-24 px-6">

        <Card
          icon={<BrainCircuit />}
          title="AI Powered"
          desc="Powered by Gemini AI."
        />

        <Card
          icon={<Globe />}
          title="Web Search"
          desc="Latest information instantly."
        />

        <Card
          icon={<BookOpen />}
          title="Citations"
          desc="Answers with trusted sources."
        />

        <Card
          icon={<MessageSquare />}
          title="History"
          desc="Continue your conversations."
        />

      </div>

      {/* Footer */}

      <div className="text-center text-zinc-500 mt-24 pb-10">
        Built with ❤️ using React • Node • Gemini AI
      </div>

    </div>
  );
};

function Card({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="border border-zinc-800 rounded-2xl p-6 bg-zinc-900/40 backdrop-blur"
    >
      <div className="text-green-400">
        {icon}
      </div>

      <h2 className="mt-4 text-xl font-semibold">
        {title}
      </h2>

      <p className="text-zinc-400 mt-2">
        {desc}
      </p>
    </motion.div>
  );
}

export default Home;