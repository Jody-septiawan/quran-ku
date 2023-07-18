import * as React from "react";

import { useQuranStore } from "@/state/useQuranStore";

export const useMediaPlayer = () => {
  const { surah: allSurah, surahDetail, setSurahDetail } = useQuranStore();

  const audioRef = React.useRef<HTMLAudioElement>(null);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isPlay, setIsPlay] = React.useState<boolean>(false);
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const [duration, setDuration] = React.useState<number>(0);

  const progress: number = (currentTime / duration) * 100;

  const surah = React.useMemo(() => {
    if (!surahDetail) return null;

    return surahDetail;
  }, [surahDetail]);

  const handlePlayAudio = React.useCallback((): void => {
    const audioElement = audioRef.current;

    if (
      audioElement &&
      audioElement.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA
    ) {
      audioElement.play();
      setIsPlay(true);
    }
  }, []);

  const handleLoadedData = React.useCallback((): void => {
    setIsLoading(false);
    handlePlayAudio();
  }, [handlePlayAudio]);

  const handleLoadStart = React.useCallback((): void => {
    setIsLoading(true);
  }, []);

  const handleNext = React.useCallback((): void => {
    if (!surah) return;
    const nextSurahNumber = surah?.nomor + 1;
    const nextSurah =
      allSurah.find((surah) => surah.nomor === nextSurahNumber) ?? null;
    setSurahDetail(nextSurah);
    handlePlayAudio();
  }, [allSurah, handlePlayAudio, setSurahDetail, surah]);

  const handlePrevious = (): void => {
    if (!surah) return;
    const nextSurahNumber = surah?.nomor - 1;
    const nextSurah =
      allSurah.find((surah) => surah.nomor === nextSurahNumber) ?? null;
    setSurahDetail(nextSurah);
    handlePlayAudio();
  };

  const handleEnded = React.useCallback((): void => {
    setIsPlay(false);
    audioRef.current!.pause();
    audioRef.current!.currentTime = 0;
    handleNext();
  }, [handleNext]);

  const handlePauseAudio = (): void => {
    audioRef.current!.pause();
    setIsPlay(false);
  };

  const formatTime = React.useCallback((time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  const isHead = React.useMemo(() => {
    if (!surah) return false;

    return surah.nomor === 1;
  }, [surah]);

  const isTail = React.useMemo(() => {
    if (!surah) return false;

    return surah.nomor === 114;
  }, [surah]);

  const handleClose = React.useCallback(() => {
    // setIsPlay(false);
    // audioRef.current!.pause();
    // audioRef.current!.currentTime = 0;
    setSurahDetail(null);
  }, [setSurahDetail]);

  return {
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
  };
};
