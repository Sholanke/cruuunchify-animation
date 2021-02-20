import React, { useEffect, useRef, useState } from "react";
import {
  debounce,
  DECREMENTER,
  INCREMENTER,
  wheelDirection
} from "../../utils/helpers";
import HomeHero from "./HomeHero/HomeHero";
import "./index.scss";
import { ArtistsSlider, PickOfWeek } from "../Home/HomeHero/HomeHero";
import getArtists from "../../getArtists";
import Cursor from "../Others/Cursor/Cursor";

const sections = ["hero", "we-create"];

export default function Index() {
  const [counter, setCounter] = useState(0);
  const [artists, setArtists] = useState();
  const homeRef = useRef();

  useEffect(() => {
    const wheelEventHandeler = debounce(e => {
      const direction = wheelDirection(e);
      direction === "BOTTOM" &&
        setCounter(prev => INCREMENTER(prev, sections.length - 1));
      direction === "TOP" && setCounter(DECREMENTER);
    });

    window.addEventListener("wheel", e => {
      wheelEventHandeler(e);
    });

    getArtists().then(setArtists);
  }, []);

  return artists ? (
    <div className="home-container" ref={homeRef}>
      <Cursor />
      <HomeSection
        isActive={counter === 0}
        title={["Make the Most", "of Spotify."]}
        right={
          <>
            <PickOfWeek />
            <ArtistsSlider spotifyData={artists} />
          </>
        }
      >
        <p>
          With Spotify, it’s easy to find the right music or podcast for every
          moment – on your phone, your computer, your tablet and more.
        </p>
      </HomeSection>
      <HomeSection isActive={counter === 1} title={["Who built this Clone?"]}>
        <p>
        Sholanke Olamide is a Frontend Engineer that focuses on improving the quality of front-end code by paying close attention to minor details with the help of grade A softwares and developer tools/processes.
        </p>
      </HomeSection>
    </div>
  ) : (
    ""
  );
}

function HomeSection({ isActive, title, children, ...props }) {
  return (
    <div data-is-active={isActive} className="home-section">
      <HomeHero active={isActive} title={title} {...props}>
        {children}
      </HomeHero>
    </div>
  );
}
