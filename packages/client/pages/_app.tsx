import { useEffect } from "react";
import { initActivityRoom } from "../colyseus/activity-room";
import "../styles/global.css";
import "../styles/highlight.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    initActivityRoom();
  }, []);

  return <Component {...pageProps} className="h-screen w-screen" />;
}
