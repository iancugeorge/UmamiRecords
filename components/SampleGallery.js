import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BeforeAfter from "@/components/BeforeAfter";
import Lightbox from "@/components/Lightbox";
import BeatWaveform from "@/components/BeatsWaveform";
import { useRouter } from "next/router";
import { ShoppingCart, User, Tag } from "lucide-react";

const sampleData = {
  "Mix & Master": [
    { id: 12, title: "Simake - Faima", rawSrc: "/audio/Site - Simake - Faima - REC.mp3", masteredSrc: "/audio/Site - Simake - Faima - MASTER.mp3" },
    { id: 11, title: "Matashu - Fara Nume", rawSrc: "/audio/Site - Matashu - Fara Nume - REC.mp3", masteredSrc: "/audio/Site - Matashu - Fara Nume - MASTER.mp3" },
    { id: 10, title: "Matashu - Fara Nume 2", rawSrc: "/audio/Site - Matashu - Fara Nume 2 - REC.mp3", masteredSrc: "/audio/Site - Matashu - Fara Nume 2 - MASTER.mp3" },
    { id: 9, title: "Arabu - Foc nu fum", rawSrc: "/audio/Site - Arabu - Foc nu fum - REC.mp3", masteredSrc: "/audio/Site - Arabu - Foc nu fum - MASTER.mp3" },
    { id: 8, title: "Cretzu - De Halloween", rawSrc: "/audio/Site - Cretzu - De Halloween - REC.mp3", masteredSrc: "/audio/Site - Cretzu - De Halloween - MASTER.mp3" },
    { id: 7, title: "Edo - Jurat", rawSrc: "/audio/Site - Edo - Jurat - REC.mp3", masteredSrc: "/audio/Site - Edo - Jurat - MASTER.mp3" },
    { id: 6, title: "Simake - Poate intr-o zi", rawSrc: "/audio/Site - Simake - Poate intr-o zi - REC.mp3", masteredSrc: "/audio/Site - Simake - Poate intr-o zi - MASTER.mp3" },
    { id: 5, title: "Edo - Persoana", rawSrc: "/audio/Site - Edo - Persoana - REC.mp3", masteredSrc: "/audio/Site - Edo - Persoana - MASTER.mp3" }, 
    { id: 4, title: "Simake x Jama1ka - Asa ca (Jama1ka)", rawSrc: "/audio/Site - Jamaika - Asa ca - REC.mp3", masteredSrc: "/audio/Site - Jamaika - Asa ca - MASTER.mp3" },
    { id: 3, title: "Simake x Jama1ka - Asa ca (Simake)", rawSrc: "/audio/Site - Simake - Asa ca - REC.mp3", masteredSrc: "/audio/Site - Simake - Asa ca - MASTER.mp3" },
    { id: 2, title: "Yashin - Prostituta", rawSrc: "/audio/Site - Yashin - Prostituta - REC.mp3", masteredSrc: "/audio/Site - Yashin - Prostituta- MASTER.mp3" },
    { id: 1, title: "Simake - Banii", rawSrc: "/audio/Site - Simake - Banii - REC.mp3", masteredSrc: "/audio/Site - Simake - Banii - MASTER.mp3" },
  ],
  Beaturi: [
  { "id": 1, "title": "type Aerozen 99 bpm Dm", "src": "/audio/Beaturi/Gabi/type Aerozen 99 bpm Dm.mp3", "price": 125, "producer": "808.gabiiii", "tags": ["Aerozen Type", "Dm", "99 BPM", "198 BPM"] },
  { "id": 2, "title": "type Aerozen 139 bpm Ebm", "src": "/audio/Beaturi/Gabi/type Aerozen 139 bpm Ebm.mp3", "price": 125, "producer": "808.gabiiii", "tags": ["Aerozen Type", "Ebm", "139 BPM", "69.5 BPM"] },
  { "id": 3, "title": "type Aerozen 148 bpm Gm", "src": "/audio/Beaturi/Gabi/type Aerozen 148 bpm Gm.mp3", "price": 125, "producer": "808.gabiiii", "tags": ["Aerozen Type", "Gm", "148 BPM", "74 BPM"] },
  { "id": 4, "title": "type arabic 100 bpm Cm", "src": "/audio/Beaturi/Gabi/type arabic 100 bpm Cm.mp3", "price": 125, "producer": "808.gabiiii", "tags": ["Arabic Type", "Cm", "100 BPM", "200 BPM"] },
  { "id": 5, "title": "type arabic 128 bpm C", "src": "/audio/Beaturi/Gabi/type arabic 128 bpm C.mp3", "price": 125, "producer": "808.gabiiii", "tags": ["Arabic Type","C", "128 BPM", "64 BPM"] },
  { "id": 6, "title": "type Azteca 149 bpm Dm", "src": "/audio/Beaturi/Gabi/type Azteca 149 bpm Dm.mp3", "price": 125, "producer": "808.gabiiii", "tags": ["Azteca Type", "Dm", "149 BPM", "74.5 BPM"] },
  { "id": 7, "title": "type Floyy Menor 94 bpm C#m", "src": "/audio/Beaturi/Gabi/type Floyy Menor 94 bpm Cshm.mp3", "price": 125, "producer": "808.gabiiii", "tags": ["Floyy Menor Type", "C#m", "94 BPM", "188 BPM"] },
  { "id": 8, "title": "type Floyy Menor 100 bpm Fm", "src": "/audio/Beaturi/Gabi/type Floyy Menor 100 bpm Fm.mp3", "price": 125, "producer": "808.gabiiii", "tags": ["Floyy Menor Type", "Fm", "100 BPM", "200 BPM"] },
  { "id": 9, "title": "type guitar 165 bpm D#m", "src": "/audio/Beaturi/Gabi/type guitar 165 bpm Dshm.mp3", "price": 125, "producer": "808.gabiiii", "tags": ["Guitar Type", "D#m", "165 BPM", "82.5 BPM"] },
  { "id": 10, "title": "type Ian 130 bpm Gm", "src": "/audio/Beaturi/Gabi/type Ian 130 bpm Gm.mp3", "price": 125, "producer": "808.gabiiii", "tags": ["Ian Type", "Gm", "130 BPM", "65 BPM"] },
  { "id": 11, "title": "type Ian 143 bpm Em", "src": "/audio/Beaturi/Gabi/type Ian 143 bpm Em.mp3", "price": 125, "producer": "808.gabiiii", "tags": ["Ian Type", "Em", "143 BPM", "71.5 BPM"] },
  { "id": 12, "title": "type MGL 94 bpm Em", "src": "/audio/Beaturi/Gabi/type MGL 94 Em.mp3", "price": 125, "producer": "808.gabiiii", "tags": ["MGL Type", "Em", "94 BPM", "188 BPM"] },
  { "id": 13, "title": "type narr 117 bpm Em", "src": "/audio/Beaturi/Gabi/type narr 117 Em.mp3", "price": 125, "producer": "808.gabiiii", "tags": ["Narr Type", "Em", "117 BPM", "58.5 BPM"] },
  { "id": 14, "title": "type Raul ws 145 bpm Cm", "src": "/audio/Beaturi/Gabi/type Raul ws 145 bpm Cm.mp3", "price": 125, "producer": "808.gabiiii", "tags": ["Raul WS Type", "Cm", "145 BPM", "72.5 BPM"] },
  { "id": 15, "title": "type Rava 115 bpm C#m", "src": "/audio/Beaturi/Gabi/type Rava 115 bpm Cshm.mp3", "price": 125, "producer": "808.gabiiii", "tags": ["Rava Type", "C#m", "115 BPM", "57.5 BPM"] },
  { "id": 16, "title": "type Rio da Yung 101 bpm Cm", "src": "/audio/Beaturi/Gabi/type Rio da Yung 101 bpm Cm.mp3", "price": 125, "producer": "808.gabiiii", "tags": ["Rio Da Yung Type", "Cm", "101 BPM", "202 BPM"] },
  { "id": 17, "title": "type summer 100 bpm Am", "src": "/audio/Beaturi/Gabi/type summer 100 bpm Am.mp3", "price": 125, "producer": "808.gabiiii", "tags": ["Summer Type", "Am", "100 BPM", "200 BPM"] },
  { "id": 18, "title": "type supertrap hard 162 bpm Cm", "src": "/audio/Beaturi/Gabi/type supertrap hard 162 Cm.mp3", "price": 125, "producer": "808.gabiiii", "tags": ["Supertrap Type", "Cm", "162 BPM", "81 BPM", "Hard"] },
  { "id": 19, "title": "type Talent 90 bpm F#m", "src": "/audio/Beaturi/Gabi/type Talent 90 bpm Fshm.mp3", "price": 125, "producer": "808.gabiiii", "tags": ["Talent Type", "F#m", "90 BPM", "180 BPM"] },
  { "id": 20, "title": "type The Weekend 79 bpm Bm", "src": "/audio/Beaturi/Gabi/type The Weekend 79 bpm Bm.mp3", "price": 125, "producer": "808.gabiiii", "tags": ["The Weeknd Type", "Bm", "79 BPM", "158 BPM"] },
  { "id": 21, "title": "type Vanilla 85 bpm D#m", "src": "/audio/Beaturi/Gabi/type Vanilla 85 bpm Dshm.mp3", "price": 125, "producer": "808.gabiiii", "tags": ["Vanilla Type", "D#m", "85 BPM", "170 BPM"] },
  { "id": 22, "title": "type vara 100 bpm Em", "src": "/audio/Beaturi/Gabi/type vara 100 bpm Em.mp3", "price": 125, "producer": "808.gabiiii", "tags": ["Vara Type", "Em", "100 BPM", "200 BPM"] },
  { "id": 23, "title": "type wst 102 bpm Dm", "src": "/audio/Beaturi/Gabi/type wst 102 bpm Dm.mp3", "price": 125, "producer": "808.gabiiii", "tags": ["WST Type", "Dm", "102 BPM", "204 BPM"] }

    // { id: 24, title: "TrapFlex 140 BPM Em", src: "/audio/Beaturi/Alex/Beat - TrapFlex - 140bpm - Em - ProdAllx.mp3", price: 125, producer: "allx", tags: ["Trap", "Em", "140 BPM"] },
    // { id: 25, title: "BellTrip 140 BPM C", src: "/audio/Beaturi/Alex/Beat - BellTrip - 140BM - C - Prod.allx.mp3", price: 125, producer: "allx", tags: ["Bell", "Trip", "C", "140 BPM"] }
  ],

  Muzica: [
    { id: 12, title: "Cretzu - De Halloween", src: "https://www.youtube.com/watch?v=SN5wtE_MhLk" , thumbnail: "https://img.youtube.com/vi/SN5wtE_MhLk/maxresdefault.jpg"},
    { id: 11, title: "Simake - Faima", src: "https://www.youtube.com/watch?v=dbS_np_CaeA" , thumbnail: "https://img.youtube.com/vi/dbS_np_CaeA/maxresdefault.jpg"},
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
    const message = `Salutare! Doresc beat-ul: "${beatTitle}"`;
    router.push({
      pathname: '/contact',
      query: {
        service: 'Beat / Instrumental',
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