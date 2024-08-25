import Layout from "../../Layout/Layout";
import Card from "../Card/Card";
import SongBar from "../MasterBar/SongBar";
import { useEffect } from "react";
import Navbar from "../Navbar";
import { useGlobalContext } from "../../states/Contet";
import Footer from "../Footer/Footer";


// Sample songs data
export const songs = [
  {
    id: Math.random() * Date.now(),// Unique ID for each song
    title: "Tum Hi Ho",
    artist: "Arijit Singh",
    mp3: new Audio("/assets/mp3/Tum Hi Ho.mp3"),// MP3 file for the song
    img: "/assets/Arijit-1.jpg",// Image for the song
  },
  {
    id: Math.random() * Date.now(),
    title: "Ae Dil Hai Mushkil",
    artist: "Arijit Singh",
    mp3: new Audio("/assets/mp3/ae.mp3"),
    img: "/assets/Arijit-2.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Mirchi Awards",
    artist: "Arijit Singh",
    mp3: new Audio("/assets/mp3/Mashup.mp3"),
    img: "/assets/Arijit-3.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Judaiyaan",
    artist: "Arijit Singh",
    mp3: new Audio("/assets/mp3/Judaiyaan.mp3"),
    img: "/assets/Arijit-4.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Tum Kya Mile",
    artist: "Shreya Goshal",
    mp3: new Audio("/assets/mp3/Tum Kya Mile.mp3"),
    img: "/assets/Shreya-2.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Zihaal e Miskin",
    artist: "Shreya Goshal",
    mp3: new Audio("/assets/mp3/Zihaal e Miskin.mp3"),
    img: "/assets/Shreya-3.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Heeriye",
    artist: "Arijit Singh",
    mp3: new Audio("/assets/mp3/Heeriye.m4a"),
    img: "/assets/Arijit-1.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Tum Kya Mile",
    artist: "Shreya Goshal",
    mp3: new Audio("/assets/mp3/Tum Kya Mile.mp3"),
    img: "/assets/Shreya-2.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Zihaal e Miskin",
    artist: "Shreya Goshal",
    mp3: new Audio("/assets/mp3/Zihaal e Miskin.mp3"),
    img: "/assets/Shreya-3.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Tu hi Hai Aashiqui",
    artist: "Arijit Singh",
    mp3: new Audio("/assets/mp3/Tu Hi Hai Aashiqui.mp3"),
    img: "/assets/Arijit-2.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Ve Kamleya",
    artist: "Shreya Goshal",
    mp3: new Audio("/assets/mp3/Ve Kamleya.mp3"),
    img: "/assets/Shreya-1.jpg",
  },
 
  {
    id: Math.random() * Date.now(),
    title: "Chal Chaiya Chaiya",
    artist: "Sukhwinder Singh",
    mp3: new Audio("/assets/mp3/Chal Chaiya Chaiya.mp3"),
    img: "/assets/Sukhwinder-1.jpg",
  },
];

const Home = () => {
  const { getUser } = useGlobalContext();// Extract getUser function from global context

  useEffect(() => {
    getUser();// Call getUser on component mount
  }, []);
  return (
    <Layout>
      <Navbar />{/* Render Navbar component */}

      <div className="tertiary_bg ml-2 px-4 py-4 home ">
         {/* Section for displaying the "Focus" playlist */}
        <div className="flex justify-between mb-4 pt-4 items-center">
          <span className="text-xl font-bold hover:underline cursor-pointer">
            Focus
          </span>
          <span>Show All</span>
        </div>
        <div className="grid  gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {songs.map((song, i) => {
            return <Card key={song.id} idx={i} song={song} />;
          })}
        </div>
        <div className="flex justify-between my-4 items-center">
          <span className="text-xl font-bold hover:underline cursor-pointer">
            Spotify List
          </span>
          <span>Show All</span>
        </div>
        <div className="grid  gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {songs.map((song, i) => {
            return <Card key={song.id} idx={i} song={song} />;// Render Card component for each song
          })}
        </div>
      </div>
      <Footer />{/* Render Footer component */}
      <SongBar />{/* Render SongBar component */}
    </Layout>
  );
};

export default Home;
