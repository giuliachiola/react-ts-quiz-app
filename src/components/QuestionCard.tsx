import React from 'react';

import { AnswerObject } from '../App'

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswers: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
  question, answers, callback, userAnswers, questionNr, totalQuestions,
}) => (
  <div>
    <p className="number">
      Question:
      {' '}
      {questionNr}
      /
      {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map(answer => (
        // convert `userAnswers` to Boolean value
        <div className='question' key={answer}>
          {userAnswers && <span>{userAnswers?.correctAnswer === answer ? '✅' : '❌'}</span> }
          <button
            className={`btn ${userAnswers?.answer === answer ? 'btn--clicked': ''} ${userAnswers?.correctAnswer === answer ? 'btn--correct' : 'btn--wrong'}`}
            disabled={!!userAnswers}
            value={answer}
            onClick={callback}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }}></span>
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default QuestionCard;
