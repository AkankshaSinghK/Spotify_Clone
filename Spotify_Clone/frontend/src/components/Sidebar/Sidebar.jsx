import React, { useEffect, useState } from "react";
import { BiSolidHome, BiLibrary } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import Signup from "./Signup";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [playlists, setPlaylists] = useState([]);
  const getPlaylists = async () => {
    const res = await fetch("http://localhost:5000/api/playlist/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let d = await res.json();
    setPlaylists(d.playlists);
  };
  useEffect(() => {
    getPlaylists();
  }, []);
  return (
    <div className="w-1/4 fixed left-0 mt-2 top-0 sidebar ">
      <div className="nav secondary_bg rounded-lg p-6">
        <Link to={"/"} className="flex items-center gap-6">
          <BiSolidHome className="font-bold text-lg sm:text-xl" />
          <span className="text-base sm:text-lg">Home</span>
        </Link>
        <Link to={"/search"} className="flex mt-4 items-center gap-6">
          <FiSearch className="font-bold text-lg sm:text-xl" />
          <span className="text-base sm:text-lg">Search</span>
        </Link>
      </div>
      <div className="mt-2 secondary_bg rounded-lg px-2 py-2 your_library">
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-4">
          <div className="flex gap-2 items-center">
            <BiLibrary className="font-bold text-xl ms-3" />
            <span className="text-lg md:text-xl ">Your library</span>
          </div>
          <button className="hover:bg-black/25 rounded-full p-2">
            <FaPlus className=" hidden lg:flex font-bold text-xl" />
          </button>
        </div>
        <div className="mb-4">
          <Link
            to="/create-playlist"
            className="flex items-center gap-2 text-white rounded-full px-3 py-1 bg-green-500 hover:bg-green-600"
          >
            <FaPlus className="font-bold text-lg" />
            <span className="text-base sm:text-lg">Create Playlist</span>
          </Link>
        </div>
        <div className="btns flex flex-wrap gap-4 mb-4">
          <Link
            to={"/"}
            className="rounded-full ms-4 px-3 py-1 bg-white/10 text-sm sm:text-base text-white"
          >
            Playlists
          </Link>
          <Link
            to={"/"}
            className="rounded-full ms-4 px-3 py-1 bg-white/10 text-sm sm:text-base text-white"
          >
            Artists
          </Link>
        </div>
        <div className="my-6 px-2 ">
          {playlists.map((p) => {
            return (
             <div key={p._id} className="flex gap-4 my-2">
                <div>
                  <img
                    src="/assets/liked.jpg"
                    width={50}
                    height={50}
                    alt={p.title}
                  />
                </div>
                <div>
                
                  <h3 className="text-base font-medium mb-2">{p.title}</h3> 
                  <p className="text-sm text-white/80">
                    Playlist
                    <span> . {p.songs.length} Songs</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {/* <div className="your_library">
                    <div className="leading-8 mt-2 tertiary_bg rounded-lg py-6 px-4">
                        <p className="font-bold">Create your first playlist</p>
                        <p className="font-semibold">
                            It's easy, we'll help you
                        </p>
                        <button className="rounded-full text-black mt-4 px-4 py-0 bg-white font-semibold">
                            Create playlist
                        </button>
                    </div>
                    <div className="leading-8 mt-4 tertiary_bg rounded-lg py-6 px-4">
                        <p className="font-bold">
                            Let's find some podcasts to follow
                        </p>
                        <p className="font-semibold">
                            We'll keep you updated on new episodes
                        </p>
                        <button className="rounded-full text-black mt-4 px-4 py-0 bg-white font-semibold">
                            Browse Podcast
                        </button>
                    </div>
                </div> */}
      </div>
      <div className="mt-4 px-4 flex gap-4 flex-wrap">
        <a className="text-xs text-gray-300 mx-4" href="#">
          Legal
        </a>
        <a className="text-xs text-gray-300 mx-4" href="#">
          Privacy Center
        </a>
        <a className="text-xs text-gray-300 mx-4" href="#">
          Privacy Policy
        </a>
        <a className="text-xs text-gray-300 mx-4" href="#">
          Cookies
        </a>
        <a className="text-xs text-gray-300 mx-4" href="#">
          About Ads
        </a>
        <a className="text-xs text-gray-300 mx-4" href="#">
          Accessibility
        </a>
      </div>
      <button className="mx-4 mt-12 text-sm border-white border rounded-full flex gap-2 px-3 py-1 items-center  text-white ">
        <TbWorld />
        <span className="text-white font-bold">English</span>
      </button>

      {/* <Signup /> */}
    </div>
  );
};

export default Sidebar;
