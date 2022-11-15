import createDataContext from "./createDataContext";
import createLesson from "../lessons/LessonsData";

const lessonReducer = (state, action) => {
  // state === { count: number }
  // action === { type: 'increment' || 'decrement', payload: number }

  switch (action.type) {
    case "get_lesson":
      return action.payload;
    case "start_lesson":
      return { ...state, lessonStarted: true };
    case "correct_answer":
      return {
        ...state,
        //lessonNumber: state.lessonNumber + 1,
        points: state.points + 1,
        lessonFinished: action.payload.lessonFinished,
        answerCorrect: true,
        lessonPaused: true,
      };
    case "wrong_answer":
      return {
        ...state,
        fails: state.fails + 1,
        lessonPaused: true,
        answerCorrect: false,
      };
    case "unpause_lesson":
      return {
        ...state,
        lessonNumber: state.lessonNumber + 1,
        lessonPaused: false,
      };
    case "lesson_finished":
      return {
        ...state,
        timeToFinish: action.payload,
      };
    case "place_in_race":
      return {
        ...state,
        place: action.payload.place,
      };
    default:
      return state;
  }
};

const getLesson = (dispatch) => {
  return ({ beatScore = false, liveGame = false }) => {
    const lessons = createLesson({
      n: 3,
      difficulty: "easy",
      beatScore: false,
      liveGame: liveGame,
    });
    dispatch({ type: "get_lesson", payload: lessons });
  };
};

const startLesson = (dispatch) => {
  return () => {
    dispatch({ type: "start_lesson" });
  };
};

const questionAnswered = (dispatch) => {
  return ({ answer, state }) => {
    const correctAnswer = state.correctAnswers[state.lessonNumber];
    var n = state.lessonNumber + 1;
    var lessonFinished = false;
    if (n >= state.numbers.length) {
      n = 0;
    }
    if (state.lessonFinished) {
      return;
    } else if (correctAnswer == answer) {
      if (state.points + 1 >= state.nCorrectAnswersToFinish) {
        lessonFinished = true;
      }
      dispatch({
        type: "correct_answer",
        payload: { lessonFinished: lessonFinished },
      });
    } else {
      dispatch({ type: "wrong_answer" });
    }
  };
};

const lessonFinished = (dispatch) => {
  return ({ timeToFinish }) => {
    dispatch({ type: "lesson_finished", payload: timeToFinish });
  };
};

const unpauseLesson = (dispatch) => {
  return ({ state }) => {
    var n = state.lessonNumber + 1;
    if (n >= state.numbers.length) {
      n = 0;
    }
    dispatch({ type: "unpause_lesson" });
  };
};

const placeInRace = (dispatch) => {
  return ({ place }) => {
    dispatch({ type: "place_in_race", payload: { place: place } });
  };
};

export const { Provider, Context } = createDataContext(
  lessonReducer,
  {
    getLesson,
    startLesson,
    questionAnswered,
    unpauseLesson,
    placeInRace,
    lessonFinished,
  },
  {}
);
