const express = require("express");
const Playlist = require("../Models/Playlist");
const router = express.Router();
const mongoose = require('mongoose');

// get all playlist
router.get("/", async (req, res) => {
  const playlists = await Playlist.find();
  res.json({ playlists, success: true, message: "playlists found" });
});



// Get playlist by ID
router.get('/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    
    if (!playlist) {
      return res.status(404).json({ success: false, message: 'Playlist not found' });
    }

    res.json({ playlist, success: true, message: 'Playlist details fetched successfully' });
  } catch (error) {
    
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

//create liked song playlist
router.post("/like", async (req, res) => {
  const { song_mp3, song_title, song_artist, song_thumbnail } = req.body;
  const playlist = await Playlist.findOne({ title: "Liked Songs" });
  playlist.songs.push({ song_mp3, song_title, song_artist, song_thumbnail });
  playlist.save();
  res.json({ playlist, success: true, message: "song liked" });
});

//Create playlist

router.post("/create", async (req, res) => {
  const { title, singers, songs } = req.body;

  // Basic validation to ensure required fields are present
  if (!title || !Array.isArray(songs) || songs.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid data provided." });
  }

  try {
      // Create the new playlist document in the database
      const playlist = await Playlist.create({ title, singers, songs });

      // Send a success response back to the client
      res.json({ playlist, success: true, message: "Playlist created successfully." });
  } catch (error) {
      // Log and return error if something goes wrong
     
      res.status(500).json({ success: false, message: "Server error. Could not create playlist." });
  }
});

// Update playlist
router.put('/update', async (req, res) => {
  try {
    const { playlistId, title, singers, songs } = req.body;

    // Find the playlist
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ success: false, message: 'Playlist not found' });
    }

    // Update title and singers
    if (title) playlist.title = title;
    if (singers) playlist.singers = singers;

    // Merge new songs with existing songs
    if (songs) {
      const existingSongs = playlist.songs.map(song => song.song_title); // Extract existing song titles
      const newSongs = songs.filter(song => !existingSongs.includes(song.song_title)); // Filter out existing songs
      playlist.songs = [...playlist.songs, ...newSongs]; // Merge new songs
    }

    await playlist.save();
    res.json({ success: true, message: 'Playlist updated successfully' });
  } catch (error) {
   
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



module.exports = router;


