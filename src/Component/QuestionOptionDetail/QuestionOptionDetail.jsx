import { asyncAddVotedQuestion } from "Redux/reducer/questionReducer";
import { useDispatch, useSelector } from "react-redux";
import "./QuestionOptionDetail.css";

const totalAnswer = (question) => {
  let totalOptionOne = question?.optionOne?.votes?.length || 0;
  let totalOptionTwo = question?.optionTwo?.votes?.length || 0;
  return totalOptionOne + totalOptionTwo;
};

const totalAnswerByOption = (question = {}, option) => {
  let total = question[option]?.votes?.length || 0;
  return total;
};

const percentVoted = (question = {}, option) => {
  let totalVoted = totalAnswer(question);
  let totalVotedOption = totalAnswerByOption(question, option) || 0;
  let divied =
    (totalVotedOption / (totalVoted === 0 ? 1 : totalVoted)) * 100 || 0;
  return divied.toFixed(0);
};

function QuestionOptionDetail({
  questionInfo,
  optionId,
  isVoted,
  answer,
  setPending,
}) {
  const userId = useSelector((state) => state?.user?.info?.id);
  const dispatch = useDispatch();

  const submit = async () => {
    setPending(true);
    dispatch(
      asyncAddVotedQuestion({
        authedUser: userId,
        qid: questionInfo?.id,
        answer: optionId,
      })
    );
  };

  return (
    <div
      className={
        answer === optionId
          ? "QuestionOptionDetail__option active"
          : "QuestionOptionDetail__option"
      }
    >
      <div className="QuestionOptionDetail__optionText">
        {questionInfo[optionId]?.text}
      </div>
      {isVoted ? (
        <div className="QuestionOptionDetail__boxDetail">
          <div>{`${totalAnswerByOption(
            questionInfo,
            optionId
          )} persons voted this option`}</div>
          <div>{`${percentVoted(questionInfo, optionId)}% voted`}</div>
        </div>
      ) : (
        <div className="QuestionOptionDetail__btnClick" onClick={submit}>
          Click
        </div>
      )}
      {answer === optionId && (
        <div className="QuestionOptionDetail__markChosen">
          You have chosen this
        </div>
      )}
    </div>
  );
}

export default QuestionOptionDetail;
