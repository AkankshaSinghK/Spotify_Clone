import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineHeart, AiOutlinePlaySquare } from "react-icons/ai";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { CgScreen } from "react-icons/cg";
import { BiRepeat, BiShuffle } from "react-icons/bi";
import { FaPause, FaPlay } from "react-icons/fa";
import { PiMicrophoneStageDuotone, PiQueueLight } from "react-icons/pi";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import { BsArrowsAngleContract, BsSpeakerFill } from "react-icons/bs";
import { pauseMaster, playMaster, playSong } from "../../states/Actors/SongActor";
import { useGlobalContext } from "../../states/Contet";
import "./SongBar.css";
import { songs } from "../Home/Home";

const SongBar = () => {
    const { masterSong, isPlaying } = useSelector((state) => state.mainSong);
    const {
        progress,
        setProgress,
        resetEverything,
        songIdx,
        setSongIdx,
        currTime,
        setCurrTime,
        duration,
        setDuration,
    } = useGlobalContext();
    const dispatch = useDispatch();
    const [volume, setVolume] = useState(50);

    // Handle play/pause functionality
    const handleMaster = () => {
        if (isPlaying) {
            dispatch(pauseMaster());
        } else {
            dispatch(playMaster());
        }
    };

    // Add song to liked list
    const addToLiked = async () => {
        let data = JSON.stringify({
            song_mp3: masterSong.mp3.src,
            song_title: masterSong.title,
            song_artist: masterSong.artist,
            song_thumbnail: masterSong.img,
        });
        const res = await fetch('https://spotify-clone-server-eta.vercel.app/api/playlist/like', {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                token: localStorage.getItem('token'),
            },
            body: data,
        });

        let d = await res.json();
        
    };

    // Update duration and playback status
    useEffect(() => {
        if (masterSong.mp3) {
            const updateDuration = () => {
                if (masterSong.mp3.duration) {
                    setDuration(formatTime(masterSong.mp3.duration));
                }
            };

            updateDuration();
            masterSong.mp3.addEventListener("loadedmetadata", updateDuration);

            if (isPlaying) {
                masterSong.mp3.play();
            } else {
                masterSong.mp3.pause();
            }

            const intervalId = setInterval(() => {
                if (isPlaying && masterSong.mp3) {
                    if (masterSong.mp3.currentTime >= masterSong.mp3.duration) {
                        dispatch(pauseMaster());
                        resetEverything();
                    } else {
                        setProgress(
                            Math.round(
                                (masterSong.mp3.currentTime / masterSong.mp3.duration) * 100
                            )
                        );
                        setCurrTime(formatTime(masterSong.mp3.currentTime));
                    }
                }
            }, 1000);

            return () => {
                clearInterval(intervalId);
                masterSong.mp3.removeEventListener("loadedmetadata", updateDuration);
            };
        }
    }, [masterSong, isPlaying, dispatch, resetEverything]);

    // Handle progress change
    const changeProgress = (e) => {
        const newProgress = e.target.value;
        setProgress(newProgress);
    
        if (masterSong.mp3) {
            const newCurrentTime = (newProgress / 100) * masterSong.mp3.duration;
            masterSong.mp3.currentTime = newCurrentTime;
            setCurrTime(formatTime(newCurrentTime));
        }
    };

    // Handle volume change
    const changeVolume = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (masterSong.mp3) {
            masterSong.mp3.volume = newVolume / 100;
        }
    };

    // Format time for display
    const formatTime = (durationInSeconds) => {
        let minutes = Math.floor(durationInSeconds / 60);
        let seconds = Math.round(durationInSeconds % 60);

        return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    };

    // Navigation functions
    const backwardSong = () => {
        if (songIdx <= 0) return;
        if (masterSong.mp3) {
            masterSong.mp3.pause();
            masterSong.mp3.currentTime = 0;
        }
        resetEverything();
        setSongIdx(songIdx - 1);
        dispatch(playSong(songs[songIdx - 1]));
    };

    const forwardSong = () => {
        if (songIdx >= songs.length - 1) return;
        if (masterSong.mp3) {
            masterSong.mp3.pause();
            masterSong.mp3.currentTime = 0;
        }
        resetEverything();
        setSongIdx(songIdx + 1);
        dispatch(playSong(songs[songIdx + 1]));
    };

    return (
        <div className="fixed w-full flex px-4 md:px-8 items-center justify-between bottom-0 left-0 h-20 bg-black">
            {/* Left Section: Song Info */}
            <div className="hidden md:flex w-1/4 md:w-2/12 items-center gap-2">
                <img src={masterSong.img} alt="" className="h-12 w-12 object-cover" />
                <div>
                    <h3 className="text-xs font-medium mb-1 truncate">
                        {masterSong?.title || "Unknown Title"}
                    </h3>
                    <span className="text-[10px] truncate">
                        {masterSong?.artist || "Unknown Artist"}
                    </span>
                </div>
                <AiOutlineHeart onClick={addToLiked} className="ml-3 cursor-pointer hover:text-green-400" />
                <CgScreen className="ml-3" />
            </div>

            {/* Center Section: Playback Controls */}
            <div className="flex flex-col justify-center items-center w-full md:w-5/12">
                <div className="flex justify-center items-center mb-2 gap-6">
                    <BiShuffle className="text-xl " />
                    <IoMdSkipBackward onClick={backwardSong} className="text-xl " />
                    {isPlaying ? (
                        <button
                            onClick={handleMaster}
                            className="flex items-center rounded-full bg-white justify-center p-2"
                        >
                            <FaPause className="text-black text-lg" />
                        </button>
                    ) : (
                        <button
                            onClick={handleMaster}
                            className="flex items-center rounded-full bg-white justify-center p-2"
                        >
                            <FaPlay className="text-black text-lg" />
                        </button>
                    )}
                    <IoMdSkipForward onClick={forwardSong} className="text-xl " />
                    <BiRepeat className="text-xl " />
                </div>
                <div className="flex items-center gap-2 w-full">
                    <span className="text-xs">{currTime}</span>
                    <div className="relative w-full flex items-center">
                        <input
                            type="range"
                            min={0}
                            value={progress}
                            disabled={!masterSong.mp3}
                            onChange={changeProgress}
                            className="w-full block accent-green-500"
                            max={100}
                        />
                        <div
                            className="absolute top-0 left-0 h-full bg-green-500"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <span className="text-xs">{duration}</span>
                </div>
            </div>

            {/* Right Section: Additional Controls */}
            <div className="hidden md:flex w-1/4 md:w-2/12 items-center gap-2">
                <AiOutlinePlaySquare className="text-2xl " />
                <PiMicrophoneStageDuotone className="text-2xl " />
                <PiQueueLight className="text-2xl " />
                <BsSpeakerFill className="text-2xl " />
                {volume <= 0 ? (
                    <HiSpeakerXMark className="text-2xl " />
                ) : (
                    <HiSpeakerWave className="text-2xl " />
                )}
                <div className="relative w-full flex items-center">
                    <input
                        type="range"
                        min={0}
                        value={volume}
                        disabled={!masterSong.mp3}
                        onChange={changeVolume}
                        className="w-full block accent-green-500"
                        max={100}
                    />
                    <div
                        id="volume"
                        className="absolute top-0 left-0 h-full bg-green-500"
                        style={{ width: `${volume}%` }}
                    ></div>
                </div>
                <BsArrowsAngleContract className="text-2xl " />
            </div>
        </div>
    );
};

export default SongBar;
