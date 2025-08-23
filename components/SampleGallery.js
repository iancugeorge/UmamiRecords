import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BeforeAfter from "@/components/BeforeAfter";
import Lightbox from "@/components/Lightbox";
import BeatWaveform from "@/components/BeatsWaveform";
import { useRouter } from "next/router";

const sampleData = {
  "Mix & Master": [
    { id: 7, title: "Edo - Jurat", rawSrc: "/audio/Site - Edo - Jurat - REC.mp3", masteredSrc: "/audio/Site - Edo - Jurat - MASTER.mp3" },
    { id: 6, title: "Simake - Poate intr-o zi", rawSrc: "/audio/Site - Simake - Poate intr-o zi - REC.mp3", masteredSrc: "/audio/Site - Simake - Poate intr-o zi - MASTER.mp3" },
    { id: 5, title: "Edo - Persoana", rawSrc: "/audio/Site - Edo - Persoana - REC.mp3", masteredSrc: "/audio/Site - Edo - Persoana - MASTER.mp3" }, 
    { id: 4, title: "Simake x Jama1ka - Asa ca (Jama1ka)", rawSrc: "/audio/Site - Jamaika - Asa ca - REC.mp3", masteredSrc: "/audio/Site - Jamaika - Asa ca - MASTER.mp3" },
    { id: 3, title: "Simake x Jama1ka - Asa ca (Simake)", rawSrc: "/audio/Site - Simake - Asa ca - REC.mp3", masteredSrc: "/audio/Site - Simake - Asa ca - MASTER.mp3" },
    { id: 2, title: "Yashin - Prostituta", rawSrc: "/audio/Site - Yashin - Prostituta - REC.mp3", masteredSrc: "/audio/Site - Yashin - Prostituta- MASTER.mp3" },
    { id: 1, title: "Simake - Banii", rawSrc: "/audio/Site - Simake - Banii - REC.mp3", masteredSrc: "/audio/Site - Simake - Banii - MASTER.mp3" },
  ],
  Beaturi: [
    // empty for now → tab will be hidden
    // { id: 1, title: "Beat 1", src: "/beats/beat1.mp3" }
  ],
  Muzica: [
    { id: 9, title: "Edo - Decibelii", src: "https://www.youtube.com/watch?v=nsL1fdZHvQ0", thumbnail: "https://img.youtube.com/vi/nsL1fdZHvQ0/maxresdefault.jpg" },
    { id: 8, title: "Haiduc x Iox - The Path", src: "https://www.youtube.com/watch?v=wlbOVzmOKAs", thumbnail: "https://img.youtube.com/vi/wlbOVzmOKAs/maxresdefault.jpg" },
    { id: 7, title: "Edo - Jurat", src: "https://www.youtube.com/watch?v=53fZNKM72o0", thumbnail: "https://img.youtube.com/vi/53fZNKM72o0/maxresdefault.jpg" },
    { id: 6, title: "Simake - Poate intr-o zi", src: "https://www.youtube.com/watch?v=wnyFeMHOREM", thumbnail: "https://img.youtube.com/vi/wnyFeMHOREM/maxresdefault.jpg" },
    { id: 5, title: "Edo - Persoana", src: "https://www.youtube.com/watch?v=_J9oAt9pQJA", thumbnail: "https://img.youtube.com/vi/_J9oAt9pQJA/maxresdefault.jpg" },
    { id: 4, title: "simake x jama1kaa - Cum o facem", src: "https://www.youtube.com/watch?v=YLzefrwRhsg", thumbnail: "https://img.youtube.com/vi/YLzefrwRhsg/maxresdefault.jpg" },
    { id: 3, title: "Edo - Natura", src: "https://www.youtube.com/watch?v=eNMdjZQLuZs", thumbnail: "https://img.youtube.com/vi/eNMdjZQLuZs/maxresdefault.jpg" },
    { id: 2, title: "Haiduc - Vise Grele", src: "https://www.youtube.com/watch?v=G3uZd2ljxDo", thumbnail: "https://img.youtube.com/vi/G3uZd2ljxDo/maxresdefault.jpg" },
    { id: 1, title: "simake - BANII", src: "https://www.youtube.com/watch?v=ksxHlvZFMOY", thumbnail: "https://img.youtube.com/vi/ksxHlvZFMOY/maxresdefault.jpg" },
  ],
};

export default function SampleGallery() {
  const router = useRouter();

  // 🔒 Detect if we actually have beats (valid objects with title or src)
  const beatsList = (sampleData["Beaturi"] || []).filter(
    (b) => b && (b.title || b.src)
  );
  const hasBeats = beatsList.length > 0;

  // Build visible tabs dynamically
  const categories = ["Muzica", "Mix & Master", ...(hasBeats ? ["Beaturi"] : [])];

  // Default to first visible tab
  const [activeTab, setActiveTab] = useState(categories[0]);
  const [lightbox, setLightbox] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [displaySamples, setDisplaySamples] = useState([]);
  const [page, setPage] = useState(1);

  const itemsPerPage = 6;

  // Sync tab from URL, but only if allowed; otherwise redirect to first visible
  useEffect(() => {
    const urlTab = router.query.tab;
    if (!urlTab) return;

    if (categories.includes(urlTab)) {
      setActiveTab(urlTab);
    } else {
      // replace invalid/hidden tab (e.g., Beaturi) with the first available
      const fallback = categories[0];
      setActiveTab(fallback);
      router.replace(
        `/muzica?tab=${encodeURIComponent(fallback)}`,
        undefined,
        { shallow: true }
      );
    }
  }, [router.query.tab, hasBeats]); // re-run if beats availability changes

  // Handle Pagination + Filtering
  useEffect(() => {
    const allSamples = sampleData[activeTab] || [];
    const filtered = allSamples.filter((item) =>
      (item.title || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
    const paginated = filtered.slice(0, page * itemsPerPage);
    setDisplaySamples(paginated);
  }, [activeTab, searchQuery, page]);

  useEffect(() => setPage(1), [activeTab, searchQuery]);

  const loadMore = () => setPage((prev) => prev + 1);

  return (
    <section className="relative py-16 px-6 bg-black text-white">
      {/* Tabs (Beaturi hidden if empty) */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => {
              setActiveTab(category);
              router.push(
                `/muzica?tab=${encodeURIComponent(category)}`,
                undefined,
                { shallow: true }
              );
            }}
            className={`w-full sm:w-auto px-8 py-3 text-lg font-bold uppercase rounded-full border-4
              ${
                activeTab === category
                  ? "bg-yellow-400 text-black border-yellow-400"
                  : "bg-black text-yellow-400 border-yellow-400 hover:bg-[#ff0077] hover:border-[#ff0077] hover:text-black"
              }`}
            whileHover={{ scale: 1.05 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Caută sample-uri..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 rounded-full text-black focus:outline-none search-input"
        />
      </div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Muzica */}
        {activeTab === "Muzica" &&
          displaySamples.map((item) => {
            const videoSource = item.src || item.video;
            const thumbnail = item.thumbnail || "/images/youtube-placeholder.jpg";
            return (
              <motion.div
                key={item.id}
                className="relative rounded-xl border-2 border-gray-700 p-6 shadow-lg hover:scale-105 hover:border-[#ff0077] transition-all bg-black flex flex-col items-center"
              >
                <h3 className="text-xl font-bold text-yellow-400 mb-4">{item.title}</h3>
                <button onClick={() => setLightbox(videoSource)} className="w-full border-0">
                  <img
                    src={thumbnail}
                    alt={item.title}
                    className="w-full h-56 object-cover rounded-lg hover:opacity-90 transition-opacity"
                    loading="lazy"
                  />
                </button>
              </motion.div>
            );
          })}

        {/* Mix & Master */}
        {activeTab === "Mix & Master" &&
          displaySamples.map((track) => (
            <motion.div
              key={`beforeAfter-${track.id}`}
              className="relative rounded-xl border-2 border-yellow-400 p-6 shadow-lg hover:scale-105 hover:border-[#ff0077] transition-all bg-black"
            >
              <BeforeAfter track={track} />
            </motion.div>
          ))}

        {/* Beaturi — rendered ONLY if there are actual beats */}
        {activeTab === "Beaturi" && hasBeats &&
          beatsList.map((track) => (
            <motion.div
              key={`Beaturi-${track.id}`}
              className="relative bg-black rounded-xl border-2 border-gray-700 p-6 flex flex-col items-center justify-center shadow-lg hover:scale-105 hover:border-[#ff0077] transition-all"
            >
              <h3 className="text-xl font-bold text-yellow-400 mb-4">{track.title}</h3>
              <BeatWaveform src={track.src} />
            </motion.div>
          ))}
      </motion.div>

      {/* Load More */}
      {displaySamples.length < (sampleData[activeTab]?.length || 0) && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-yellow-400 text-black rounded-full hover:bg-[#ff0077] transition-all"
          >
            Încarcă mai multe
          </button>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
    </section>
  );
}
