import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BeforeAfter from "@/components/BeforeAfter";
import Lightbox from "@/components/Lightbox";
import BeatWaveform from "@/components/BeatsWaveform";
import { useRouter } from "next/router";
import { ShoppingCart, User, Tag } from "lucide-react";

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
     { id: 1, title: "beat boom bap prod 808.gabiiii x ivan", src: "/audio/Beaturi/Gabi/beat boom bap prod 808.gabiiii x ivan.mp3", price: 125, producer: "808.gabiiii x ivan", tags: ["Boom Bap", "Old School", "Em", "94 BPM"] },
    { id: 2, title: "beat narr 117 E bpm 808.gabiiii x dennis", src: "/audio/Beaturi/Gabi/beat narr 117 Em prod 808.gabiii x dennis.mp3", price: 125, producer: "808.gabiiii x dennis", tags: ["Narr", "Em", "117 BPM"] },
    { id: 3, title: "floyyonner beat 94 bpm", src: "/audio/Beaturi/Gabi/floyymenor beat 94 bpm.mp3", price: 125, producer: "808.gabiiii", tags: ["Floyymenor Type", "C#m", "94 BPM"] },
    { id: 4, title: "floyyonner type beat 100 bpm", src: "/audio/Beaturi/Gabi/floyymenor type beat 100 bpm.mp3", price: 125, producer: "808.gabiiii", tags: ["Floyymenor Type", "Fm", "100 BPM"] },
    { id: 5, title: "glo beat cu kainted 139 bpm Eb m", src: "/audio/Beaturi/Gabi/glo beat cu kainted 139 bpm Eb m.mp3", price: 125, producer: "808.gabiiii x kainted", tags: ["Glo", "Eb Major", "139 BPM"] },
    { id: 6, title: "guitar beat 165 bpm D#m", src: "/audio/Beaturi/Gabi/guitar beat 165 bpm Dshm.mp3", price: 125, producer: "808.gabiiii", tags: ["Guitar", "G#m", "82 BPM"] },
    { id: 7, title: "r&b 85 bpm D#m", src: "/audio/Beaturi/Gabi/rnb 85 bpm Dshm.mp3", price: 125, producer: "808.gabiiii", tags: ["R&B", "D#m", "85 BPM"] },
    { id: 8, title: "raul ws type beat 145 bpm Cm", src: "/audio/Beaturi/Gabi/raul ws type beat 145 bpm Cm.mp3", price: 125, producer: "808.gabiiii", tags: ["Raul WS Type", "Cm", "146 BPM"] },
    { id: 9, title: "rava type beat 115 bpm C#m", src: "/audio/Beaturi/Gabi/rava type beat 115 bpm Cshm.mp3", price: 125, producer: "808.gabiiii", tags: ["Rava Type", "C#", "115 BPM"] },
    { id: 10, title: "rio da yung 101 bpm Cm", src: "/audio/Beaturi/Gabi/rio da yung 101 bpm Cm.mp3", price: 125, producer: "808.gabiiii", tags: ["Rio Da Yung", "Cm", "101 BPM"] },
    { id: 11, title: "sarba type beat hard 149 bpm Dm", src: "/audio/Beaturi/Gabi/sarba type beat hard 149 bpm Dm.mp3", price: 125, producer: "808.gabiiii", tags: ["Sarba", "Hard", "Dm", "74 BPM"] },
    { id: 12, title: "talent 2 10 F#m", src: "/audio/Beaturi/Gabi/talent 2 10 Fshm.mp3", price: 125, producer: "808.gabiiii", tags: ["Talent", "Bm", "90 BPM"] },
    { id: 13, title: "vizccol 99 bpm Dm", src: "/audio/Beaturi/Gabi/vizzcol 99 bpm Dm.mp3", price: 125, producer: "808.gabiiii", tags: ["Vizzcol Type", "Dm", "99 BPM"] },
    { id: 14, title: "wts pe patru roti 102 bpm Dm", src: "/audio/Beaturi/Gabi/wts pe patru roti 102 bpm Dm.mp3", price: 125, producer: "808.gabiiii", tags: ["WTS", "Dm", "102 BPM"] },
    { id: 15, title: "TrapFlex 140 BPM Em", src: "/audio/Beaturi/Alex/Beat - TrapFlex - 140bpm - Em - ProdAllx.mp3", price: 125, producer: "allx", tags: ["Trap", "Em", "140 BPM"] },
    { id: 16, title: "BellTrip 140 BPM C", src: "/audio/Beaturi/Alex/Beat - BellTrip - 140BM - C - Prod.allx.mp3", price: 125, producer: "allx", tags: ["Bell", "Trip", "C", "140 BPM"] }
  ],

  Muzica: [
    { id: 10, title: "Edo - Decibelii", src: "https://www.youtube.com/watch?v=nsL1fdZHvQ0", thumbnail: "https://img.youtube.com/vi/nsL1fdZHvQ0/maxresdefault.jpg" },
    { id: 9, title: "Haiduc x Iox - The Path", src: "https://www.youtube.com/watch?v=wlbOVzmOKAs", thumbnail: "https://img.youtube.com/vi/wlbOVzmOKAs/maxresdefault.jpg" },
    { id: 8, title: "Edo - Jurat", src: "https://www.youtube.com/watch?v=53fZNKM72o0", thumbnail: "https://img.youtube.com/vi/53fZNKM72o0/maxresdefault.jpg" },
    { id: 7, title: "Simake - Poate intr-o zi", src: "https://www.youtube.com/watch?v=wnyFeMHOREM", thumbnail: "https://img.youtube.com/vi/wnyFeMHOREM/maxresdefault.jpg" },
    { id: 6, title: "Edo - Persoana", src: "https://www.youtube.com/watch?v=_J9oAt9pQJA", thumbnail: "https://img.youtube.com/vi/_J9oAt9pQJA/maxresdefault.jpg" },
    { id: 5, title: "simake x jama1kaa - Cum o facem", src: "https://www.youtube.com/watch?v=YLzefrwRhsg", thumbnail: "https://img.youtube.com/vi/YLzefrwRhsg/maxresdefault.jpg" },
    { id: 3, title: "Edo - Natura", src: "https://www.youtube.com/watch?v=eNMdjZQLuZs", thumbnail: "https://img.youtube.com/vi/eNMdjZQLuZs/maxresdefault.jpg" },
    { id: 2, title: "Haiduc - Vise Grele", src: "https://www.youtube.com/watch?v=G3uZd2ljxDo", thumbnail: "https://img.youtube.com/vi/G3uZd2ljxDo/maxresdefault.jpg" },
    { id: 1, title: "simake - BANII", src: "https://www.youtube.com/watch?v=ksxHlvZFMOY", thumbnail: "https://img.youtube.com/vi/ksxHlvZFMOY/maxresdefault.jpg" },
  ],
};

export default function SampleGallery() {
  const router = useRouter();

  const beatsList = (sampleData["Beaturi"] || []).filter(
    (b) => b && (b.title || b.src)
  );
  const hasBeats = beatsList.length > 0;

  const categories = ["Muzica", "Mix & Master", ...(hasBeats ? ["Beaturi"] : [])];

  const [activeTab, setActiveTab] = useState(categories[0]);
  const [lightbox, setLightbox] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [displaySamples, setDisplaySamples] = useState([]);
  const [page, setPage] = useState(1);

  const itemsPerPage = 6;

  const handleBuyBeat = (beatTitle) => {
    const message = `Bună! Sunt interessat de beat-ul: "${beatTitle}"`;
    router.push({
      pathname: '/contact',
      query: {
        service: 'Beaturi (Exclusive & Custom)',
        message: message
      }
    });
  };

  useEffect(() => {
    const urlTab = router.query.tab;
    if (!urlTab) return;

    if (categories.includes(urlTab)) {
      setActiveTab(urlTab);
    } else {
      const fallback = categories[0];
      setActiveTab(fallback);
      router.replace(
        `/muzica?tab=${encodeURIComponent(fallback)}`,
        undefined,
        { shallow: true }
      );
    }
  }, [router.query.tab, hasBeats]);

  useEffect(() => {
    const allSamples =
      activeTab === "Beaturi" ? beatsList : sampleData[activeTab] || [];
    const filtered = allSamples.filter((item) => {
      const query = searchQuery.toLowerCase();
      const titleMatch = (item.title || "").toLowerCase().includes(query);
      const producerMatch = (item.producer || "").toLowerCase().includes(query);
      const tagsMatch = (item.tags || []).some(tag => 
        tag.toLowerCase().includes(query)
      );
      return titleMatch || producerMatch || tagsMatch;
    });
    const paginated = filtered.slice(0, page * itemsPerPage);
    setDisplaySamples(paginated);
  }, [activeTab, searchQuery, page]);

  useEffect(() => setPage(1), [activeTab, searchQuery]);

  const loadMore = () => setPage((prev) => prev + 1);

  return (
    <section className="relative py-16 px-6 bg-black text-white">
      {/* Tabs */}
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
          placeholder="Caută..."
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

        {/* Beaturi */}
        {activeTab === "Beaturi" && hasBeats &&
          displaySamples.map((track) => (
            <motion.div
              key={`Beaturi-${track.id}`}
              className="relative bg-black rounded-xl border-2 border-gray-700 p-6 flex flex-col shadow-lg hover:scale-105 hover:border-[#ff0077] transition-all"
            >
              {/* Header with Title and Price */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-yellow-400 flex-1 leading-tight">{track.title}</h3>
                {track.price && (
                  <span className="text-2xl font-bold text-white ml-4 whitespace-nowrap">{track.price} LEI</span>
                )}
              </div>
              
              {/* Producer */}
              {track.producer && (
                <div className="flex items-center gap-2 mb-2">
                  <User size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-300">{track.producer}</span>
                </div>
              )}
              
              {/* Tags */}
              {track.tags && track.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {track.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-800 text-yellow-400 text-xs font-semibold rounded-full border border-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Waveform */}
              <div className="flex-1 my-4">
                <BeatWaveform src={track.src} />
              </div>
              
              {/* Buy Button */}
              <button
                onClick={() => handleBuyBeat(track.title)}
                className="mt-4 w-full px-6 py-3 bg-yellow-400 text-black font-bold rounded-full hover:bg-[#ff0077] hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Cumpără
              </button>
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