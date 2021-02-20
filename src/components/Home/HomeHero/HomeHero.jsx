import React, { useEffect, useRef, useState } from "react";
import { initStagger } from "../../../utils/animation";
import { spotifyData as spotifyDataDefault } from "../../../utils/artists";

export default function HomeHero({ active, title, children, right }) {
  return (
    <div className="home-hero" data-is-active={active}>
      <div className="_left">
        <Dots />
        <>
          {title.map((line, index) => (
            <h1 key={index}>
              <span className="mv-down">{line}</span>
            </h1>
          ))}

          <div className="mv-down _description">{children}</div>
        </>
      </div>

      <div className="_right">{right}</div>
    </div>
  );
}

export function ArtistsSlider({ spotifyData }) {
  spotifyData = spotifyData || spotifyDataDefault;
  const [activeAnimation, setActiveAnimation] = useState(true);
  const [activeSliderIndex, setactiveSliderIndex] = useState(0);

  const goToNext = () => {
    setActiveAnimation(prev => !prev);

    setTimeout(() => {
      setActiveAnimation(prev => !prev);

      setactiveSliderIndex(prev =>
        prev >= spotifyData.artists.length - 1 ? 0 : prev + 1
      );
    }, 500);
  };
  const prevArtist =
    spotifyData?.artists[activeSliderIndex - 1] ||
    spotifyData?.artists[spotifyData?.artists?.length - 1];
  const currentArtist = spotifyData?.artists[activeSliderIndex];

  const popularityGIF = arg => {
    if (arg >= 70) {
      return `url('https://cdn.dribbble.com/users/527197/screenshots/9515248/skull-fire-dribbble.gif')`;
    } else if (arg >= 50) {
      return `url('https://cdn.dribbble.com/users/720114/screenshots/3361407/rocket_3.gif')`;
    } else if (arg) {
      return `url('https://cdn.dribbble.com/users/844087/screenshots/3025821/eyetom_ccccccc.gif')`;
    }
  };

  const popularityGrade = arg => {
    if (arg >= 70) {
      return `Blazing Hot`;
    } else if (arg >= 50) {
      return `Well Known`;
    } else if (arg) {
      return `Lowkey`;
    }
  };

  useEffect(() => {
    setInterval(() => {
      goToNext();
    }, 6000);
  }, []);

  return (
    <div className="main-image">
      <SliderItem artist={prevArtist} />
      <SliderItem artist={currentArtist} active={activeAnimation} />
      <div className="album-card">
        <div className="img-holder">
          {true && (
            <img
              src={`${prevArtist?.featuredTrack.album.images[0].url}`}
              style={{
                display: prevArtist ? "block" : "none"
              }}
              data-active={activeAnimation}
              alt=""
              srcset=""
            />
          )}
          <img
            src={`${currentArtist?.featuredTrack.album.images[0].url}`}
            data-active={activeAnimation}
            alt=""
            srcset=""
          />
        </div>

        <div className="slider-card">
          <p data-active={activeAnimation}>
            <span>Featured Track</span>
            <span>{prevArtist?.featuredTrack.album.name}</span>
          </p>
          <p data-active={activeAnimation}>
            <span>Featured Track</span>
            <span>{currentArtist?.featuredTrack.album.name}</span>
          </p>
        </div>
      </div>

      <div className="album-card popularity-status">
        <div className="slider-card">
          <p data-active={activeAnimation}>
            <span
              className="icon-holder"
              style={{
                backgroundImage: popularityGIF(prevArtist?.popularity)
              }}
            ></span>
            <div>
              <span>Popularity</span>
              <span>{popularityGrade(prevArtist?.popularity)}</span>
            </div>
          </p>
          <p data-active={activeAnimation}>
            <span
              className="icon-holder"
              style={{
                backgroundImage: popularityGIF(currentArtist?.popularity)
              }}
            ></span>
            <div>
              <span>Popularity</span>
              <span>{popularityGrade(currentArtist?.popularity)}</span>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
}

export function PickOfWeek() {
  const staggerRef = useRef();

  useEffect(() => {
    initStagger(staggerRef.current);
  }, []);

  return (
    <div className="picks-of-week">
      <div className="content">
        <div className="stagger-group" ref={staggerRef} data-stagger-gap=".2">
          <Note />
          <img
            src="https://i.scdn.co/image/ab67706c0000bebbf4689cfc6ae366bd65f5187a"
            className="stagger-item image"
            alt=""
          />
          <p className="stagger-item">Picks of the week</p>
          <p className="stagger-item title">Quarantine Jams for ya!</p>
          <a href="/" className="stagger-item play-btn">
            <PlayIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

function SliderItem({ active, artist }) {
  return (
    artist && (
      <div className={`main-image__item ${active ? "active" : ""}`}>
        {!!artist?.images?.[0].url && (
          <img src={artist?.images?.[0].url} alt="" className="bg" />
        )}
        <div className="info">
          <p className="name fadeup">{artist.name}</p>

          {!!artist.genres?.length && (
            <div className="tags">
              <div className="tag fadeup">{artist.genres[0]}</div>
              {artist.genres.length > 1 && (
                <div className="tag num fadeup">
                  +{artist.genres.length - 1}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  );
}

function Dots() {
  return (
    <div className="home-hero__dots">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width="20"
      height="20"
    >
      <path
        fill="#FFF"
        fill-rule="evenodd"
        d="M4.871 14.553c.027 1.117 1.236 1.794 2.295 1.262l8.516-4.576c.464-.25.779-.707.779-1.242 0-.536-.315-.993-.779-1.243L7.166 4.185c-1.06-.532-2.268.138-2.295 1.256v9.112z"
      ></path>
    </svg>
  );
}

function Note() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      height="30"
      width="30"
      className="note"
    >
      <defs>
        <linearGradient
          id="Ljre7ehjkr"
          x1="0.39"
          y1="-0.03"
          x2="0.95"
          y2="1.12"
        >
          <stop
            offset="0"
            stop-color="rgb(255,255,255)"
            stop-opacity="1"
          ></stop>
          <stop
            offset="1"
            stop-color="rgb(255,255,255)"
            stop-opacity="1"
          ></stop>
        </linearGradient>
      </defs>
      <g opacity="1">
        <g opacity="1">
          <path
            fill="url(#Ljre7ehjkr)"
            opacity="1"
            fill-rule="evenodd"
            d="M24.16422986984253,8.752537727355957 L24.16422986984253,11.807964324951172 C23.91267728805542,11.778694152832031 23.658259868621826,11.779394149780273 23.403762340545654,11.810504913330078 C21.922332286834717,11.991178512573242 20.74710988998413,13.196361541748047 20.606126308441162,14.680527687072754 C20.426894664764404,16.57168960571289 21.90462064743042,18.197200775146484 23.795138835906982,18.197200775146484 C25.406928539276123,18.197200775146484 26.77229642868042,16.995994567871094 26.995517253875732,15.39293384552002 L26.999999523162842,6.373223304748535 C26.999999523162842,5.684641361236572 26.442397594451904,5.126777172088623 25.75395154953003,5.126596450805664 L16.523982524871826,5.126596450805664 C15.83557653427124,5.126596450805664 15.277917385101318,5.684483051300049 15.277917385101318,6.373034954071045 L15.277917385101318,15.322906494140625 C14.973084926605225,15.286554336547852 14.664035320281982,15.294351577758789 14.35576581954956,15.34695053100586 C12.94139051437378,15.586512565612793 11.84531545639038,16.76666259765625 11.710397243499756,18.195655822753906 C11.532002925872803,20.086389541625977 13.009456157684326,21.711301803588867 14.899428844451904,21.711301803588867 C16.668574810028076,21.711301803588867 18.103322505950928,20.276309967041016 18.104215145111084,18.50627326965332 L18.10499906539917,8.752568244934082 C18.10499906539917,8.491497993469238 18.316102504730225,8.280294418334961 18.57686948776245,8.280294418334961 L23.692359447479248,8.280294418334961 C23.953128337860107,8.280294418334961 24.16422986984253,8.491497993469238 24.16422986984253,8.752537727355957 L7.828202247619629,8.288698196411133 C7.139795303344727,8.288698196411133 6.582136154174805,8.84658432006836 6.582136154174805,9.535136222839355 L6.582136154174805,18.485008239746094 C6.277304172515869,18.44865608215332 5.968255996704102,18.45645523071289 5.65998649597168,18.509052276611328 C4.245609283447266,18.748615264892578 3.1495344638824463,19.92876625061035 3.0146143436431885,21.357755661010742 C2.836221694946289,23.248491287231445 4.3136749267578125,24.873403549194336 6.203647613525391,24.873403549194336 C7.972794532775879,24.873403549194336 9.407541275024414,23.438411712646484 9.408432960510254,21.668376922607422 L9.409217834472656,11.91466999053955 C9.409217834472656,11.653599739074707 9.620321273803711,11.44239616394043 9.881088256835938,11.44239616394043 L12.7107253074646,11.44239616394043 L12.7107253074646,8.288698196411133 L7.828202247619629,8.288698196411133 L24.16422986984253,8.752537727355957Z"
          ></path>
        </g>
      </g>
    </svg>
  );
}
