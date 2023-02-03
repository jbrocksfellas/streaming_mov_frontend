import React, { useRef, useState } from "react";
// import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { useSocket } from "../providers/socket";

export default function Room() {
  const { id } = useParams();

  const [playing, setPlaying] = useState(false);

  const ref = useRef();

  const {} = useSocket();

  return (
    <div>
      <ReactPlayer url={"https://www.youtube.com/watch?v=WmR9IMUD_CY"} ref={ref} playing={playing} />
    </div>
  );
}
