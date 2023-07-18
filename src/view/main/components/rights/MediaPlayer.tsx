import * as React from "react";

import { keyframes } from "@emotion/react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Image from "next/image";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import CloseIcon from "@mui/icons-material/Close";

import masjidImg from "@/assets/image/masjid.jpg";

import { Surah } from "@/types";

import { useMediaPlayer } from "./hooks";

const rotateAnimation = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

export function MediaPlayer() {
  const {
    audioRef,
    currentTime,
    duration,
    formatTime,
    handleClose,
    handleEnded,
    handleLoadedData,
    handleLoadStart,
    handleNext,
    handlePauseAudio,
    handlePlayAudio,
    handlePrevious,
    isHead,
    isLoading,
    isPlay,
    isTail,
    progress,
    setCurrentTime,
    setDuration,
    surah,
  } = useMediaPlayer();

  React.useEffect(() => {
    const audioElement = audioRef.current;

    if (!audioElement) return;

    const handleTimeUpdate = (): void => {
      setCurrentTime(audioElement.currentTime);
    };

    const handleLoadedData = (): void => {
      setDuration(audioElement.duration);
    };

    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    audioElement.addEventListener("loadeddata", handleLoadedData);

    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [audioRef, currentTime, duration, setCurrentTime, setDuration]);

  if (!surah) return null;

  return (
    <Box
      borderRadius={7}
      minHeight="200px"
      // overflow="hidden"
      padding={3}
      boxShadow="0px 0px 10px #00ff77"
      sx={{
        background:
          "linear-gradient(90deg, rgba(38,171,123,1) 0%, rgba(66,175,133,1) 100%)",
        borderTopRightRadius: 10,
        position: "relative",
      }}
    >
      <Box
        sx={{
          opacity: 0.7,
          position: "absolute",
          top: -7,
          right: -7,
          background: "#fff",
          display: "flex",
          borderRadius: "50%",
          padding: 0.3,
          ":hover": {
            opacity: 1,
            cursor: "pointer",
            color: "red",
          },
        }}
        onClick={handleClose}
      >
        <CloseIcon sx={{ fontSize: 15 }} />
      </Box>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          height: "100px",
          borderRadius: 3,
        }}
      >
        <Image
          src={masjidImg}
          alt="Image"
          fill={true}
          style={{ objectFit: "cover" }}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 800px"
        />
      </Box>
      <audio
        ref={audioRef}
        src={(surah as Surah)?.audioFull["05"]}
        onLoadedData={handleLoadedData}
        onLoadStart={handleLoadStart}
        onEnded={handleEnded}
      ></audio>
      <Box color="white" textAlign="center" fontSize={25} marginTop={2}>
        {surah?.nama}
      </Box>
      <Box color="white" textAlign="center" fontSize={12}>
        {surah?.nomor}. {surah?.namaLatin}
      </Box>
      {isLoading && (
        <Box justifyContent="center" display="flex" marginTop={2}>
          <RotateLeftIcon
            sx={{
              fontSize: 40,
              color: "white",
              animation: `${rotateAnimation} 1s linear infinite`,
            }}
          />
        </Box>
      )}
      {!isLoading && (
        <>
          <Stack
            justifyContent="center"
            alignItems="center"
            direction="row"
            marginTop={2}
            spacing={1}
          >
            <SkipPreviousIcon
              sx={{
                color: "white",
                cursor: "pointer",
                ":hover": {
                  color: "#264B3C",
                },
                visibility: isHead ? "hidden" : "visible",
              }}
              onClick={handlePrevious}
            />
            {isPlay && (
              <PauseIcon
                sx={{
                  padding: 1,
                  fontSize: 50,
                  bgcolor: "white",
                  color: "#264B3C",
                  cursor: "pointer",
                  borderRadius: "50%",
                  ":hover": {
                    boxShadow: "0px 0px 10px #00ff77",
                    color: "#00ff77",
                  },
                }}
                onClick={handlePauseAudio}
              />
            )}
            {!isPlay && (
              <PlayArrowIcon
                sx={{
                  padding: 1,
                  fontSize: 50,
                  bgcolor: "white",
                  color: "#264B3C",
                  cursor: "pointer",
                  borderRadius: "50%",
                  ":hover": {
                    boxShadow: "0px 0px 10px #00ff77",
                    color: "#00ff77",
                  },
                }}
                onClick={handlePlayAudio}
              />
            )}
            <SkipNextIcon
              sx={{
                color: "white",
                cursor: "pointer",
                ":hover": {
                  color: "#264B3C",
                },
                visibility: isTail ? "hidden" : "visible",
              }}
              onClick={handleNext}
            />
          </Stack>
          <Box
            sx={{ display: "flex", justifyContent: "space-between" }}
            marginTop={0}
          >
            <Box sx={{ fontSize: "0.7rem", color: "white" }}>
              {formatTime(currentTime)}
            </Box>
            <Box sx={{ fontSize: "0.7rem", color: "white" }}>
              {formatTime(duration)}
            </Box>
          </Box>
          <Box
            style={{ width: "100%", height: "3px", background: "white" }}
            marginTop={0.5}
          >
            <Box
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "green",
                transition: "width .5s",
              }}
            ></Box>
          </Box>
        </>
      )}
    </Box>
  );
}
