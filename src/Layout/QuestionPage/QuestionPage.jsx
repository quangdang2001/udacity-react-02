import { QuestionOptionDetail } from "Component";
import { useEffect, useState } from "react";
import { Image, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./QuestionPage.css";

const getQuestionInfo = (allQuestion = [], allUser = [], question_id) => {
  let question = allQuestion.find((question) => question.id === question_id);
  let author = allUser.find((user) => user.id === question?.author);
  if (question && author) {
    question.avatarURL = author.avatarURL;
    question.authorName = author.name;
    return question;
  } else {
    return null;
  }
};

const checkIsVoted = (question_id, doneQuestions = []) => {
  let existed = doneQuestions.find((question) => question.id === question_id);
  if (existed) return true;
  return false;
};

function QuestionPage() {
  const { question_id } = useParams();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const questions = useSelector((state) => state.questions);
  const doneQuestions = useSelector((state) => state?.questions?.doneQuestions);
  const answers = useSelector((state) => state?.user?.info?.answers);
  const [questionInfo, setQuestionInfo] = useState({});
  const [pending, setPending] = useState(true);
  const [voted, setVoted] = useState(false);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    if (!users.pending && !questions.pending) {
      let question = getQuestionInfo(
        questions.allQuestion,
        users.allUser,
        question_id
      );
      let hasAnswer = checkIsVoted(question_id, doneQuestions);
      if (question) {
        setQuestionInfo(question);
        setVoted(hasAnswer);
        setAnswer(answers ? answers[question_id] : null);
      }
      setPending(false);
    } else {
      setPending(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, questions, question_id]);

  if (pending)
    return (
      <div className="text-center mt-3">
        <Spinner animation="border" />
      </div>
    );
  else if (questionInfo)
    return (
      <div className="QuestionPage__box">
        <div className="QuestionPage__author">
          Poll by {questionInfo.authorName}
        </div>
        <Image
          className="QuestionPage__authorAvatar"
          width={130}
          height={130}
          roundedCircle
          src={questionInfo.avatarURL}
        />
        <h5 className="mx-auto my-1">Would You Rather</h5>
        <div className="QuestionPage__optionBox">
          <QuestionOptionDetail
            questionInfo={questionInfo}
            optionId="optionOne"
            isVoted={voted}
            answer={answer}
            setPending={setPending}
          />
          <QuestionOptionDetail
            questionInfo={questionInfo}
            optionId="optionTwo"
            isVoted={voted}
            answer={answer}
            setPending={setPending}
          />
        </div>
      </div>
    );
  else navigate("/");
}

export default QuestionPage;
