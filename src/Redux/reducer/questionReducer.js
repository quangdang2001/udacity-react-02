import {
  fetchAllQuestion,
  preFetchAllQuestion,
} from "Redux/action/questionAction";
import { refreshData } from "Utils/actionUtil";
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from "Utils/_DATA";

let questionState = {
  allQuestion: [],
  newQuestions: [],
  doneQuestions: [],
  pending: false,
};

const isAnsweredQuestion = (answeredQuestionIdsArray, questionId) => {
  let check = answeredQuestionIdsArray.find(
    (ansQuestionId) => ansQuestionId === questionId
  );
  if (check) return true;
  else return false;
};

const sortQuestion = (questionA, questionB) => {
  return questionA?.timestamp < questionB?.timestamp ? 1 : -1;
};

export const asyncfetchAllQuestion = (answeredQuestions = {}) => {
  let answeredQuestionIdsArray =
    Object.entries(answeredQuestions).map((tupple) => tupple[0]) || [];
  return async (dispatch) => {
    dispatch(preFetchAllQuestion());
    let rawResult = await _getQuestions();
    let result = Object.entries(rawResult).map((tupple) => tupple[1]);
    let newQuestions = result
      .filter(
        (question) => !isAnsweredQuestion(answeredQuestionIdsArray, question.id)
      )
      .sort(sortQuestion);
    let doneQuestions = result
      .filter((question) =>
        isAnsweredQuestion(answeredQuestionIdsArray, question.id)
      )
      .sort(sortQuestion);
    dispatch(
      fetchAllQuestion({
        allQuestion: result,
        newQuestions: newQuestions,
        doneQuestions: doneQuestions,
      })
    );
  };
};

export const asyncAddQuestion = (question) => {
  return async (dispatch) => {
    dispatch(preFetchAllQuestion());
    await _saveQuestion(question);
    await refreshData(dispatch, question.author);
  };
};

export const asyncAddVotedQuestion = (votedData) => {
  return async (dispatch) => {
    dispatch(preFetchAllQuestion());
    await _saveQuestionAnswer(votedData);
    await refreshData(dispatch, votedData.authedUser);
  };
};

export const questionReducer = (state = questionState, action) => {
  switch (action.type) {
    case "FETCH_ALL_QUESTION":
      return {
        ...action.data,
        pending: false,
      };
    case "PRE_FETCH_ALL_QUESTION":
      return {
        allQuestion: [],
        newQuestions: [],
        doneQuestions: [],
        pending: true,
      };
    default:
      return state;
  }
};
