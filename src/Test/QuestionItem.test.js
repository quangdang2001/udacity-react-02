import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { QuestionItem } from "Component";
import { BrowserRouter } from "react-router-dom";

describe("TEST_QuestionItem", () => {
  it("renders the correct content correct", () => {
    let props = { id: "ID", timestamp: 1692160780929, author: "TUAN" };
    const questionItem = render(
      <BrowserRouter>
        <QuestionItem questionInfo={props} />
      </BrowserRouter>
    );
    expect(questionItem).toBeDefined();
  });

  it("renders the correct content with Snapshot", () => {
    let props = { id: "ID", timestamp: 1692160780929, author: "TUAN" };
    const questionItem = render(
      <BrowserRouter>
        <QuestionItem questionInfo={props} />
      </BrowserRouter>
    );

    expect(questionItem).toMatchSnapshot();
  });
});
