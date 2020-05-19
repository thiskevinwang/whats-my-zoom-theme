import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

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

  input,
  textarea {
    border: 1px solid lightgray;
    border-radius: 3px;
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

export default function Submit() {
  const [text, setText] = useState("");
  const [validationError, setValidationError] = useState();
  const [success, setSuccess] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    const regex = RegExp(/^([a-zA-Z0-9_\-'"., ])*$/g);
    if (value.includes("\n")) {
      setValidationError("🙅‍♀️ no line breaks please!");
    } else if (regex.test(value)) {
      setValidationError("");
    } else {
      setValidationError("🔤🔢 no funky characters please!");
    }
    setText(value.trimStart());
  };

  const handleSubmit = async () => {
    setIsFetching(true);
    try {
      await fetch(process.env.ENDPOINT, {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      setSuccess(true);
      setIsFetching(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Errthang>
      <h1>Submit your own theme!</h1>

      <p>🙏 Please be nice!</p>
      {success ? (
        <>
          <h2>Thanks!</h2>
        </>
      ) : (
        <>
          <textarea id="input" value={text} onChange={handleChange} />
          <label htmlFor="input">{validationError}</label>
          <button
            disabled={!!validationError || isFetching || text.length < 3}
            onClick={handleSubmit}
          >
            {isFetching ? "..." : "Submit"}
          </button>
        </>
      )}
      <Link href="/">
        <a>Go home</a>
      </Link>
      <br />
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={"https://twitter.com/thekevinwang"}
      >
        Say hi 👋
      </a>
    </Errthang>
  );
}
