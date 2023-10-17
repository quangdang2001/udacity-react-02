import { QuestionItem } from "../../Component";
import { Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./HomePage.css";

function HomePage() {
  const doneQuestions = useSelector((state) => state.questions?.doneQuestions);
  const newQuestions = useSelector((state) => state.questions?.newQuestions);
  const pending = useSelector((state) => state.questions?.pending);

  return (
    <div className="HomePage__box">
      {pending ? (
        <div className="text-center mt-3">
          <Spinner animation="border" />
        </div>
      ) : (
        <div>
          <div className="HomePage__childBox">
            <div className="HomePage__childTitle">New Question</div>
            <Row className="mx-0 mt-3">
              {newQuestions.map((question) => (
                <QuestionItem key={question.id} questionInfo={question} />
              ))}
            </Row>
          </div>
          <div className="HomePage__childBox">
            <div className="HomePage__childTitle">Done</div>
            <Row className="mx-0 mt-3">
              {doneQuestions.map((question) => (
                <QuestionItem key={question.id} questionInfo={question} />
              ))}
            </Row>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
