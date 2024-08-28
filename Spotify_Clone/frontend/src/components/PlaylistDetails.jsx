import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import playlistImage from '/assets/playlist.jpg';
import Layout from '../Layout/Layout';


const PlaylistDetails = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const response = await fetch(`https://spotify-clone-server-eta.vercel.app/${playlistId}`);
        const data = await response.json();
        
        console.log('API Response:', data); // For debugging
        
        if (data.success) {
          setPlaylist(data.playlist);
        } else {
          toast.error('Failed to fetch playlist details');
        }
      } catch (error) {
        console.error('Failed to fetch playlist details', error);
        toast.error('Failed to fetch playlist details');
      }
    };

    if (playlistId) {
      fetchPlaylistDetails();
    }
  }, [playlistId]);

  if (!playlist) return <div>Loading...</div>;

  return (
    <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen tertiary_bg m-3 p-6">
      <div className="md:w-1/2 flex items-center justify-center mb-6 md:mb-0 -mt-20">
        <img
          src={playlistImage}
          alt="Playlist"
          className="object-cover rounded-lg shadow-lg w-full h-60 md:h-auto"
        />
      </div>

      <div className="md:w-1/2 flex items-center justify-center mb-6">
        <div className="secondary_bg text-white rounded-lg shadow-lg p-8 w-full max-w-lg mb-6">
          <h1 className="text-3xl font-bold mb-6 text-center">{playlist.title}</h1>
          
          <h3 className="text-xl font-semibold mb-4">Singers</h3>
          <ul>
            {playlist.singers.length ? playlist.singers.map((singer) => (
              <li key={singer._id.$oid} className="mb-2">{singer.singer_name}</li>
            )) : <li>No singers available</li>}
          </ul>
          
          <h3 className="text-xl font-semibold mb-4">Songs</h3>
          <ul>
            {playlist.songs.length ? playlist.songs.map((song) => (
              <li key={song._id.$oid} className="mb-4">
                <div><strong>Title:</strong> {song.song_title}</div>
                <div><strong>Artist:</strong> {song.song_artist}</div>
                <div><strong>MP3 URL:</strong> <a href={song.song_mp3} target="_blank" rel="noopener noreferrer">Listen</a></div>
                <div><strong>Thumbnail:</strong> <img src={song.song_thumbnail} alt={song.song_title} className="w-24 h-24 object-cover mt-2" /></div>
              </li>
            )) : <li>No songs available</li>}
          </ul>
        </div>
      </div>
    </div>
    </Layout>
    
  );
};

export default PlaylistDetails;
