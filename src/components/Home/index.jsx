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

const sections = ["hero", "we-create"];

export default function Index() {
  const [counter, setCounter] = useState(0);
  const homeRef = useRef();

  useEffect(() => {
    const wheelEventHandeler = debounce(e => {
      const direction = wheelDirection(e);
      direction === "BOTTOM" &&
        setCounter(prev => INCREMENTER(prev, sections.length - 1));
      direction === "TOP" && setCounter(DECREMENTER);
    });

    window.addEventListener("wheel", e => {
      // uncomment this line for onwheel animation...
      // wheelEventHandeler(e);
    });
  }, []);

  return (
    <div className="home-container" ref={homeRef}>
      <HomeSection
        isActive={counter === 0}
        title={["Make the Most", "of Spotify."]}
        right={
          <>
            <PickOfWeek />
            <ArtistsSlider />
          </>
        }
      >
        <p>
          With Spotify, it’s easy to find the right music or podcast for every
          moment – on your phone, your computer, your tablet and more.
        </p>
      </HomeSection>
      <HomeSection
        isActive={counter === 1}
        title={["We create modern", "experiences for", " tomorrows' brands."]}
      >
        <p>
          😎 Think of us as more of a creative partner than a resource. This
          means we have shared perspective on how we can work together to
          achieve your goals.
        </p>
      </HomeSection>
    </div>
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
