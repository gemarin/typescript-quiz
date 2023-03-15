import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';

import { GlobalStyle, Wrapper } from './App.styles';

//Components
import QuestionCard from './components/QuestionCard';
import Loading from './components/Loading';

//Types
import { QuestionState, Difficulty } from './API';

export type AnswerObject = {
	question: string;
	answer: string;
	correct: boolean;
	correctAnswer: string;
};

const TOTAL_Q = 10;

const App = () => {
	//states
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState<
		QuestionState[]
	>([]);
	const [currNum, setCurrNum] = useState(0);
	const [userAnswers, setUserAnswers] = useState<
		AnswerObject[]
	>([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);

	const startTrivia = async () => {
		setLoading(true);
		setGameOver(false);

		const newQuestions = await fetchQuizQuestions(
			TOTAL_Q,
			Difficulty.EASY
		);

		setQuestions(newQuestions);
		setScore(0);
		setUserAnswers([]);
		setCurrNum(0);
		setLoading(false);
	};

	const checkAnswer = (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		if (!gameOver) {
			//get user's answer
			const answer = e.currentTarget.value;

			//Check answer against correct answer
			const correct =
				questions[currNum].correct_answer === answer;

			//increment score if correct
			if (correct) {
				setScore((prev) => prev + 1);
			}

			//Save user's answer
			const answerObj = {
				question: questions[currNum].question,
				answer,
				correct,
				correctAnswer: questions[currNum].correct_answer,
			};

			setUserAnswers((prev) => [...prev, answerObj]);
		}
	};

	const nextQuestion = () => {
		const nextQNum = currNum + 1;

		if (nextQNum === TOTAL_Q) {
			setGameOver(true);
		} else {
			setCurrNum(nextQNum);
		}
	};

	return (
		<>
			<GlobalStyle />
			<Wrapper>
				<h1>Trivia Generator</h1>
				{gameOver || userAnswers.length === TOTAL_Q ? (
					<button className='start' onClick={startTrivia}>
						Start Quiz
					</button>
				) : null}
				{!gameOver ? (
					<p className='score'>Score: {score}</p>
				) : null}
				{loading ? <Loading /> : null}
				{!loading && !gameOver && (
					<QuestionCard
						questionNum={currNum + 1}
						totalQuestions={TOTAL_Q}
						question={questions[currNum].question}
						answers={questions[currNum].answers}
						userAnswer={
							userAnswers ? userAnswers[currNum] : null
						}
						callback={checkAnswer}
					/>
				)}
				{!gameOver &&
				!loading &&
				userAnswers.length === currNum + 1 &&
				currNum !== TOTAL_Q - 1 ? (
					<button className='next' onClick={nextQuestion}>
						Next Question
					</button>
				) : null}
			</Wrapper>
		</>
	);
};

export default App;
