/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Footer from '../src/components/Footer';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

import db from '../db.json';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  const onChange = (value, handlerFn) => {
    handlerFn(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    router.push(`quiz?name=${name}`);
  };

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Head>
          <title>Saint Seiya Quiz - Test you knowledge!</title>
        </Head>
        <QuizLogo />

        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit={(e) => onSubmit(e)}>
              <div>
                <Input
                  placeholder="What's your name?"
                  onChange={(e) => onChange(e.target.value, setName)}
                  name="name"
                  value={name}
                />
                <Button
                  type="submit"
                  value="Start Quiz"
                  disabled={!name}
                >
                  Start Quiz
                </Button>
              </div>
            </form>
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
      <GitHubCorner projectUrl="https://github.com/vitorjsls30/saint-seiya-quiz" />
    </QuizBackground>
  );
}
