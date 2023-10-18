import { QuestionItem } from "../../Component";
import { Row, Spinner, Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./HomePage.css";
import { useState } from "react";

function HomePage() {
  const doneQuestions = useSelector((state) => state.questions?.doneQuestions);
  const newQuestions = useSelector((state) => state.questions?.newQuestions);
  const pending = useSelector((state) => state.questions?.pending);
  const [currentShow, setCurrentShow] = useState("unanswered");

  return (
    <div className="HomePage__box">
      {pending ? (
        <div className="text-center mt-3">
          <Spinner animation="border" />
        </div>
      ) : (
        <Tabs
          activeKey={currentShow}
          onSelect={(k) => setCurrentShow(k)}
          className="mb-3"
        >
          <Tab eventKey="unanswered" title="Unanswered">
            <div className="HomePage__childBox">
              <div className="HomePage__childTitle">New Question</div>
              <Row className="mx-0 mt-3">
                {newQuestions.map((question) => (
                  <QuestionItem key={question.id} questionInfo={question} />
                ))}
              </Row>
            </div>
          </Tab>
          <Tab eventKey="answered" title="Answered">
            <div className="HomePage__childBox">
              <div className="HomePage__childTitle">Done</div>
              <Row className="mx-0 mt-3">
                {doneQuestions.map((question) => (
                  <QuestionItem key={question.id} questionInfo={question} />
                ))}
              </Row>
            </div>
          </Tab>
        </Tabs>
      )}
    </div>
  );
}

export default HomePage;
