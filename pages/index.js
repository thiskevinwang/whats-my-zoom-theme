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
    border: 1px solid lightgray;
    border-radius: 3px;
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
export default function Home({ themes }) {
  const [theme, setTheme] = useState();

  const selectRandomTHeme = () => {
    const randomIndex = random(0, themes.length - 1);
    setTheme(themes[randomIndex]);
  };

  return (
    <Errthang>
      <h1>What's my Zoom theme?</h1>

      {theme?.text ? (
        <>
          <h2>{theme?.text}</h2>
          <button onClick={selectRandomTHeme}>Try another one!</button>
        </>
      ) : (
        <button onClick={selectRandomTHeme}>Show me the Theme!</button>
      )}

      <details>
        <summary>What is this?</summary>
        <p>
          This is a fun little tool to help you pick a theme for your next zoom
          meeting!
        </p>
        <p>
          The theme could be anything from...&nbsp;
          <i>"share a background picture of your favorite kind of animal"</i>
          &nbsp;...to...&nbsp;doing 30 seconds of meditative breathing!
        </p>
      </details>

      <br />
      <Link href="/submit">
        <a>Want to submit your own?</a>
      </Link>
    </Errthang>
  );
}

export async function getServerSideProps(context) {
  const themes = await fetch(process.env.ENDPOINT)
    .then((res) => {
      return res.json();
    })
    .then((themes) => {
      return themes;
    });

  return {
    props: { themes }, // will be passed to the page component as props
  };
}
