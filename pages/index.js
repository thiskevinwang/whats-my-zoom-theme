import styled from "styled-components";

const Errthang = styled.div`
  top: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  max-width: 800px;
  margin: auto;
`;

export default function Home() {
  return (
    <Errthang>
      <h1>What's my Zoom theme?</h1>

      <details>
        <summary>What is this?</summary>
        <p>
          This is a fun little tool to help you pick a theme for your next zoom
          meeting! This theme could be anything from a background picture of
          your favorite kind of animal, or a fun yoga position for you and your
          team!
        </p>
      </details>
    </Errthang>
  );
}
