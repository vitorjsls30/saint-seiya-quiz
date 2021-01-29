import styled from 'styled-components'
import Footer from '../components/Footer';
import QuizBackground from '../components/QuizBackground';
import QuizLogo from '../components/QuizLogo';
import Widget from '../components/Widget';
import GitHubCorner from '../components/GitHubCorner';

import db from '../db.json';

export const QuizContainer = styled.div`
  widht: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  return (
    <QuizBackground>
      <QuizContainer>

        <QuizLogo />

        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <p>Quizes da Galera</p>
            <p>Lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>

        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/vitorjsls30/saint-seiya-quiz"/>
    </QuizBackground>
  );
}
