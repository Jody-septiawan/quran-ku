import * as React from "react";

import Box from "@mui/material/Box";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import CloseIcon from "@mui/icons-material/Close";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

import BarLoader from "react-spinners/BarLoader";

import { useQuranStore } from "@/state/useQuranStore";
import { Surah } from "@/types";

export function CardAudioControl(): JSX.Element {
  const { surah: allSurah, surahDetail, setSurahDetail } = useQuranStore();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isPlay, setIsPlay] = React.useState<boolean>(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const [duration, setDuration] = React.useState<number>(0);

  const playAudio = (): void => {
    const audioElement = audioRef.current;

    if (
      audioElement &&
      audioElement.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA
    ) {
      audioElement.play();
      setIsPlay(true);
    }
  };

  const pauseAudio = (): void => {
    audioRef.current!.pause();
    setIsPlay(false);
  };

  const stopAudio = (): void => {
    audioRef.current!.pause();
    audioRef.current!.currentTime = 0;
    setIsPlay(false);
  };

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
  }, []);

  const progress: number = (currentTime / duration) * 100;

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleLoadStart = (): void => {
    setIsLoading(true);
  };

  const handleLoadedData = (): void => {
    setIsLoading(false);
    playAudio();
  };

  const handleClose = (): void => {
    setSurahDetail(null);
  };

  const handleEnded = (): void => {
    setIsPlay(false);
    audioRef.current!.pause();
    audioRef.current!.currentTime = 0;
    handleNext();
  };

  const surah = React.useMemo(() => {
    if (!surahDetail) return null;

    return surahDetail;
  }, [surahDetail]);

  const handleNext = (): void => {
    if (!surah) return;
    const nextSurahNumber = surah?.nomor + 1;
    const nextSurah =
      allSurah.find((surah) => surah.nomor === nextSurahNumber) ?? null;
    setSurahDetail(nextSurah);
    playAudio();
  };

  const handlePrevious = (): void => {
    if (!surah) return;
    const nextSurahNumber = surah?.nomor - 1;
    const nextSurah =
      allSurah.find((surah) => surah.nomor === nextSurahNumber) ?? null;
    setSurahDetail(nextSurah);
    playAudio();
  };

  const isHead = React.useMemo(() => {
    if (!surah) return false;

    return surah.nomor === 1;
  }, [surah]);

  const isTail = React.useMemo(() => {
    if (!surah) return false;

    return surah.nomor === 114;
  }, [surah]);

  return (
    <Box width="100%" position="absolute" bottom={0} display="flex" padding={1}>
      <Box
        sx={{
          background:
            "linear-gradient(90deg, rgba(38,171,123,1) 0%, rgba(66,175,133,1) 100%)",
        }}
        paddingX={2}
        paddingY={1}
        borderRadius={2}
        width="90%"
        flex={1}
        boxShadow="0px 0px 20px #264B3C"
      >
        <audio
          ref={audioRef}
          src={(surah as Surah)?.audioFull["05"]}
          onLoadedData={handleLoadedData}
          onLoadStart={handleLoadStart}
          onEnded={handleEnded}
        ></audio>
        {isLoading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="20px"
          >
            <BarLoader loading={isLoading} color="#36d7b7" width={10000} />
          </Box>
        )}
        {!isLoading && (
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box color="white">
                {surah?.nomor}. {surah?.namaLatin} {surah?.nama}
              </Box>
              <Box>
                {!isHead && (
                  <SkipPreviousIcon
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={handlePrevious}
                  />
                )}
                {!isPlay && (
                  <PlayArrowIcon
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={playAudio}
                  />
                )}
                {isPlay && (
                  <PauseIcon
                    style={{ cursor: "pointer", color: "gray" }}
                    onClick={pauseAudio}
                  />
                )}
                <StopIcon
                  style={{ cursor: "pointer", color: "white" }}
                  onClick={stopAudio}
                />

                {!isTail && (
                  <SkipNextIcon
                    style={{ cursor: "pointer", color: "white" }}
                    onClick={handleNext}
                  />
                )}

                <CloseIcon
                  style={{ cursor: "pointer", marginLeft: 10 }}
                  onClick={handleClose}
                />
              </Box>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between" }}
              marginTop={0}
            >
              <Box sx={{ fontSize: "0.7rem" }}>{formatTime(currentTime)}</Box>
              <Box sx={{ fontSize: "0.7rem" }}>{formatTime(duration)}</Box>
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
                }}
              ></Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
