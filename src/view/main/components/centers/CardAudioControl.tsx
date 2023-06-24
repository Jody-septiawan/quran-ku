import * as React from "react";
import Box from "@mui/material/Box";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";

interface Props {
  url: string;
}

export function CardAudioControl({ url }: Props) {
  const [isPlay, setIsPlay] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  const playAudio = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    audioRef.current!.play();
    setIsPlay(true);
  };

  const pauseAudio = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    audioRef.current!.pause();
    setIsPlay(false);
  };

  const stopAudio = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    audioRef.current!.pause();
    audioRef.current!.currentTime = 0;
    setIsPlay(false);
  };

  React.useEffect(() => {
    const audioElement = audioRef.current;

    if (!audioElement) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime);
    };

    const handleLoadedData = () => {
      setDuration(audioElement.duration);
    };

    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    audioElement.addEventListener("loadeddata", handleLoadedData);

    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("loadeddata", handleLoadedData);
    };
  }, []);

  const progress = (currentTime / duration) * 100;

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Box bgcolor="#DBF1EC" padding={1} marginTop={2} borderRadius={2}>
      <audio ref={audioRef} src={url}></audio>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {!isPlay && (
          <PlayArrowIcon
            style={{ cursor: "pointer", color: "#00AB66" }}
            onClick={playAudio}
          />
        )}
        {isPlay && (
          <PauseIcon
            style={{ cursor: "pointer", color: "gray" }}
            onClick={pauseAudio}
          />
        )}
        <StopIcon style={{ cursor: "pointer" }} onClick={stopAudio} />
      </Box>
      <Box
        style={{ width: "100%", height: "3px", background: "white" }}
        marginTop={2}
      >
        <Box
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "green",
          }}
        ></Box>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between" }}
        marginTop={1}
      >
        <Box sx={{ fontSize: "0.8rem" }}>{formatTime(currentTime)}</Box>
        <Box sx={{ fontSize: "0.8rem" }}>{formatTime(duration)}</Box>
      </Box>
    </Box>
  );
}
