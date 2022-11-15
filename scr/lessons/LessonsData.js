import React, { useState } from "react";
import * as K from "../constants";

const createLesson = ({
  n,
  difficulty,
  beatScore = false,
  liveGame = false,
}) => {
  const numbers = [];
  const answers = [];
  const missing = [];
  const correctAnswers = [];
  for (let i = 0; i < n * 10; i++) {
    const mis = decideMissingNumber();
    const num = createNumbers();
    const c = num[mis];
    const r = Math.floor(Math.random() * 4);
    numbers.push(num);
    var a = [];
    for (let j = 0; j < 4; j++) {
      if (j == r) {
        a.push(c);
      } else {
        a.push(c + j - r);
      }
    }
    answers.push(a);
    missing.push(mis);
    correctAnswers.push(num[mis]);
  }
  const lesson = {
    numbers: numbers,
    answers: answers,
    missing: missing,
    correctAnswers: correctAnswers,
    lessonNumber: 0,
    points: 0,
    fails: 0,
    nCorrectAnswersToFinish: n,
    nSecondsBotFinishIn: getDifficulty({ difficulty, n }),
    maxScore: scoreToEarn({ n }),
    lessonFinished: false,
    lessonStarted: false,
    lessonPaused: false,
    timePunish: 0.5,
    place: 1,
    beatScore: beatScore,
    timeToFinish: null,
    contestant: getContestant({ difficulty, n }),
    answerCorrect: false,
    coinsPrQuestion: 2,
    liveGame: liveGame,
  };
  return lesson;
};

function randomArrayShuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

const getContestant = ({ difficulty, n }) => {
  const time = getDifficulty({ difficulty, n });
  const avatar = K.contestants;
  const name = randomArrayShuffle([
    "Malala",
    "Einstein",
    "E. Blackwell",
    "Marie Curie",
    "Vera Rubin",
    "Rosalind Franklin",
  ]);
  const contestant = [
    { time: time[0], avatar: avatar[0], name: name[0] },
    { time: time[1], avatar: avatar[1], name: name[1] },
    { time: time[2], avatar: avatar[2], name: name[2] },
    { time: time[3], avatar: avatar[3], name: name[3] },
  ];
  return contestant;
};

const getDifficulty = ({ difficulty, n }) => {
  if (difficulty == "easy") {
    return randomArrayShuffle([
      (7 + K.questionDelay) * n,
      (5.5 + K.questionDelay) * n,
      (4 + K.questionDelay) * n,
      (3 + K.questionDelay) * n,
    ]);
  } else if (difficulty == "medium") {
    return randomArrayShuffle([4 * k, 3.5 * k, 3 * k, 2 * k]);
  } else {
    return randomArrayShuffle([3.5 * k, 3.2 * k, 2.5 * k, 1.8 * k]);
  }
};

const scoreToEarn = ({ n }) => {
  return n * 100;
};

const printLesson = ({ numbers }) => {
  console.log("\n Lesson");
  console.log(`numbers: ${numbers["1"]}`);
  console.log(`length: ${Object.keys(numbers).length}`);
  return;
};

const createNumbers = () => {
  const first = Math.floor(Math.random() * 20) + 1;
  const second = Math.floor(Math.random() * 20) + 1;
  const third = first + second;
  return [first, second, third];
};

const decideMissingNumber = () => {
  return (missing = Math.floor(Math.random() * 3));
};

export default createLesson;
