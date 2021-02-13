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
      wheelEventHandeler(e);
    });
  }, []);

  return (
    <div className="home-container" ref={homeRef}>
      <HomeSection
        isActive={counter === 0}
        title={["We’re a website", "design and", "development agency."]}
        right={
          <>
            <PickOfWeek />
            <ArtistsSlider />
          </>
        }
      >
        <p>
          ❤ We partner with global brands and emerging businesses to create
          exciting and meaningful experiences, whether digital or non-digital.
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
