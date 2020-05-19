import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import random from "lodash/random";

const Errthang = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  max-width: 800px;
  margin: auto;
  padding: 1rem;

  button {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-family: var(--font-sans);
    font-size: 1rem;
  }

  input {
    font-family: var(--font-sans);
    font-size: 1rem;
  }
  p {
    max-width: 540px;
  }
  summary {
    cursor: pointer;
    outline: none;
  }
  summary::-webkit-details-marker {
    display: none;
  }
  summary:before {
    content: "ℹ️";
  }
  details[open] summary:before {
    content: "❌";
  }
`;

/**
 * theme object
 * PK: "THEME#a"
 * SK: "IP#0.1.2.3#1589859420439"
 * createdAt: 1589859420439
 * ip: "0.1.2.3"
 * text: "aaaaThis is some theme"
 */
export default function Home() {
  const [theme, setTheme] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const getData = async () => {
    return await fetch("/api/themes?")
      .then((res) => res.json())
      .then((themes) => {
        console.log(themes);
        const ran = random(0, themes.length - 1);
        setTheme(themes[ran]);
      });
  };

  return (
    <Errthang>
      <h1>What's my Zoom theme?</h1>

      {theme?.text ? (
        <>
          <h2>{theme?.text}</h2>
          <button onClick={getData}>Try another one!</button>
        </>
      ) : (
        <button onClick={getData}>Show me the Theme!</button>
      )}

      <details>
        <summary>What is this?</summary>
        <p>
          This is a fun little tool to help you pick a theme for your next zoom
          meeting! This theme could be anything from a background picture of
          your favorite kind of animal, or a fun yoga position for you and your
          team!
        </p>
      </details>

      <br />
      <Link href="/submit">
        <a>Want to submit your own?</a>
      </Link>
    </Errthang>
  );
}
