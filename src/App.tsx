import React from 'react';
import './App.css'

import QuestionCard from './components/QuestionCard';
import { QuestionState, fetchQuizQuestions } from './API';
import { Difficulty } from './API';

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10

const App = () => {
  const [loading, setLoading] = React.useState(false)
  const [questions, setQuestions] = React.useState<QuestionState[]>([])
  const [number, setNumber] = React.useState(0)
  const [userAnswers, setUserAnswers] = React.useState<AnswerObject[]>([])
  const [score, setScore] = React.useState(0)
  const [gameOver, setGameOver] = React.useState(true)

  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // user answer
      const answer = e.currentTarget.value;
      // check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // add score if answer is correct
      if (correct) setScore((prev) => prev + 1)
      // save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion =  () => {

  }

  return (
    <div className="App">
      <div className="container">
        {/* Intro */}
        <h1>React TypeScript Quiz</h1>
        <img className='bg-image' src="https://images.unsplash.com/photo-1539628399213-d6aa89c93074?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" alt="https://unsplash.com/photos/jvBXiynINGE" />

        {/* start button */}
        {
          gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <button className='start' onClick={startTrivia}>Start</button>
          ): null
        }

        {/* score */}
        {!gameOver ?
          <p className='score'>Score:</p>: null
        }

        {/* loading */}
        {
          loading? <p>Loading questions...</p> : null
        }

        {/* not loading and not gameover */}
        {
          !loading && !gameOver ?
            <QuestionCard
              questionNr={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswers={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          : null
        }

        {/* next button */}
        {
          !gameOver
          && !loading
          && userAnswers.length === number + 1
          && number !== TOTAL_QUESTIONS - 1 ?
          <button className='next' onClick={nextQuestion}>Next question</button> : null
        }

      </div>

    </div>
  );
}

export default App;
