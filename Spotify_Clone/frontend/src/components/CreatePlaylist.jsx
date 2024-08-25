import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import playlistImage from "/assets/playlist.jpg";

import Layout from "../Layout/Layout";
import Navbar from "./Navbar";
import SongBar from "./MasterBar/SongBar";

const CreatePlaylist = () => {
  const [title, setTitle] = useState("");
  const [singers, setSingers] = useState([{ singer_name: "" }]);
  const [songs, setSongs] = useState([
    { song_mp3: "", song_title: "", song_artist: "", song_thumbnail: "" },
  ]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState(true); // Toggle between creating new or selecting existing

  useEffect(() => {
    // Fetch existing playlists from the server
    const fetchPlaylists = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/playlist");
        const data = await response.json();
        setPlaylists(data.playlists || []); // Assuming response contains playlists
      } catch (error) {
        console.error("Failed to fetch playlists", error);
        toast.error("Failed to fetch playlists");
      }
    };

    fetchPlaylists();
  }, []);

  const handleSingerChange = (index, event) => {
    const values = [...singers];
    values[index][event.target.name] = event.target.value;
    setSingers(values);
  };

  const handleSongChange = (index, event) => {
    const values = [...songs];
    values[index][event.target.name] = event.target.value;
    setSongs(values);
  };

  const addSingerField = () => {
    setSingers([...singers, { singer_name: "" }]);
  };

  const addSongField = () => {
    setSongs([
      ...songs,
      { song_mp3: "", song_title: "", song_artist: "", song_thumbnail: "" },
    ]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (isCreatingNew && !title) {
      toast.error("Please enter a title for the new playlist");
      return;
    }

    if (!isCreatingNew && !selectedPlaylistId) {
      toast.error("Please select a playlist to update");
      return;
    }

    const playlistData = {
      title,
      singers,
      songs,
      playlistId: selectedPlaylistId,
    };

    const endpoint = isCreatingNew
      ? "http://localhost:5000/api/playlist/create"
      : "http://localhost:5000/api/playlist/update";
    const method = isCreatingNew ? "POST" : "PUT";

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playlistData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          `Playlist ${isCreatingNew ? "created" : "updated"} successfully!`
        );
      } else {
        toast.error(
          `Failed to ${isCreatingNew ? "create" : "update"} playlist`
        );
      }

      // Reset form or handle success message
      setTitle("");
      setSingers([{ singer_name: "" }]);
      setSongs([
        { song_mp3: "", song_title: "", song_artist: "", song_thumbnail: "" },
      ]);
      setSelectedPlaylistId("");
      setIsCreatingNew(true); // Reset to creating a new playlist
    } catch (error) {
      console.error(error);
      toast.error(
        `An error occurred while ${
          isCreatingNew ? "creating" : "updating"
        } the playlist`
      );
    }
  };

  return (
    <Layout>
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen tertiary_bg m-3 p-6">
        {/* Image Section */}
        <div className="md:w-1/2 flex items-center justify-center mb-6 md:mb-0 -mt-20">
          <img
            src={playlistImage}
            alt="Playlist"
            className="object-cover rounded-lg shadow-lg w-full h-60 md:h-auto"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 flex items-center justify-center mb-6">
          <div className="secondary_bg text-white rounded-lg shadow-lg p-8 w-full max-w-lg mb-6">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Create or Update Playlist
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-white-400">
                  <input
                    type="checkbox"
                    checked={isCreatingNew}
                    onChange={() => setIsCreatingNew(!isCreatingNew)}
                    className="mr-2"
                  />
                  Create New Playlist
                </label>
              </div>

              {isCreatingNew && (
                <>
                  <div className="mb-6">
                    <label className="block text-white-400">
                      Playlist Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1 block w-full border rounded px-4 py-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      placeholder="Enter playlist title"
                    />
                  </div>
                </>
              )}

              {!isCreatingNew && (
                <div className="mb-6">
                  <label className="block text-white-400">
                    Select Playlist to Update
                  </label>
                  <select
                    value={selectedPlaylistId}
                    onChange={(e) => setSelectedPlaylistId(e.target.value)}
                    className="mt-1 block w-full border rounded px-4 py-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  >
                    <option value="">-- Select Playlist --</option>
                    {playlists.map((playlist) => (
                      <option key={playlist._id} value={playlist._id}>
                        {playlist.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Singers</h3>
                {singers.map((singer, index) => (
                  <div key={index} className="mb-4">
                    <input
                      type="text"
                      name="singer_name"
                      value={singer.singer_name}
                      onChange={(event) => handleSingerChange(index, event)}
                      className="mt-1 block w-full border rounded px-4 py-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      placeholder="Singer Name"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSingerField}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Add Another Singer
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Songs</h3>
                {songs.map((song, index) => (
                  <div key={index} className="mb-4">
                    <input
                      type="text"
                      name="song_title"
                      value={song.song_title}
                      onChange={(event) => handleSongChange(index, event)}
                      className="mt-1 block w-full border rounded px-4 py-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      placeholder="Song Title"
                    />
                    <input
                      type="text"
                      name="song_artist"
                      value={song.song_artist}
                      onChange={(event) => handleSongChange(index, event)}
                      className="mt-1 block w-full border rounded px-4 py-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      placeholder="Song Artist"
                    />
                    <input
                      type="text"
                      name="song_mp3"
                      value={song.song_mp3}
                      onChange={(event) => handleSongChange(index, event)}
                      className="mt-1 block w-full border rounded px-4 py-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      placeholder="Song MP3 URL"
                    />
                    <input
                      type="text"
                      name="song_thumbnail"
                      value={song.song_thumbnail}
                      onChange={(event) => handleSongChange(index, event)}
                      className="mt-1 block w-full border rounded px-4 py-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      placeholder="Song Thumbnail URL"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSongField}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Add Another Song
                </button>
              </div>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
              >
                {isCreatingNew ? "Create Playlist" : "Update Playlist"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <SongBar/>
    </Layout>
  );
};

export default CreatePlaylist;
