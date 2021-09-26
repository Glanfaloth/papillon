import { GlobalStateClientFrontend } from "@papillon/helpers/lib/types";
import { useEffect, useState } from "react";
import { ColyseusContext, useSetupColyseus } from "../colyseus/use-room";
import "../styles/global.css";
import "../styles/highlight.css";
import "../styles/butterfly.css";

export default function App({ Component, pageProps }) {
  const [context, setContext] = useState<GlobalStateClientFrontend>({
    type: "loading",
  });
  useSetupColyseus(context, setContext);

  return (
    <ColyseusContext.Provider value={context}>
      <Component
        {...pageProps}
        className="h-screen w-screen overflow-hidden"
        myContext={{ context, setContext }}
      />
    </ColyseusContext.Provider>
  );
}
