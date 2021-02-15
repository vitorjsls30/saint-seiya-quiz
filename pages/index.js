/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import QuizExternal from '../src/components/QuizExternal';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Footer from '../src/components/Footer';

import db from '../db.json';

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

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
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

        <QuizExternal externals={db.external} />

        <Footer />

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/vitorjsls30/saint-seiya-quiz" />
    </QuizBackground>
  );
}
