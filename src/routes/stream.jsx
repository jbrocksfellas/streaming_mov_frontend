import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

export default function Stream() {
  //   useEffect(() => {
  //     const ws = new WebSocket("wss://enfkfvim6h.execute-api.ap-south-1.amazonaws.com/production");

  //     ws.onopen = (event) => {
  //       console.log("Websocket connection opened", event);
  //       ws.send("Hello from the client");
  //     };

  //     ws.onmessage = (event) => {
  //       console.log("Received message", event.data);
  //     };

  //     ws.onclose = (event) => {
  //       console.log("Websocket connection closed", event);
  //     };
  //     return () => {
  //       ws.close();
  //     };
  //   }, []);

  const [playing, setPlaying] = useState(false);

  const ref = useRef();
  setTimeout(() => {
    ref.current.seekTo(10);
    console.log("ran");
    setPlaying(true);
  }, 5000);

  return (
    <div>
      <ReactPlayer url={"https://www.youtube.com/watch?v=WmR9IMUD_CY"} ref={ref} playing={playing} />
    </div>
  );
}
