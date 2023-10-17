import { _getUsers, _saveQuestion, _saveQuestionAnswer } from "../Utils/_DATA";

describe("TEST_getUsers", () => {
  it("should return the users object", async () => {
    const users = await _getUsers();
    expect(users).toBeDefined();
    expect(typeof users).toBe("object");
  });
});

describe("TEST_saveQuestion", () => {
  it("will return saved question and all expected fields are populated", async () => {
    let testData = {
      optionOneText: "optionOneText",
      optionTwoText: "optionTwoText",
      author: "sarahedo",
    };
    let result = await _saveQuestion(testData);
    expect(result).not.toBeNull();
    expect(result.author).toEqual(testData.author);
    expect(result.optionOne).not.toBeNull();
    expect(result.optionOne.text).toEqual(testData.optionOneText);
    expect(result.optionTwo).not.toBeNull();
    expect(result.optionTwo.text).toEqual(testData.optionTwoText);
  });

  it("an error is returned if incorrect data is passed to the function.", async () => {
    let testData = {
      optionOneText: "optionOneText",
      optionTwoText: "optionTwoText",
    };
    await expect(_saveQuestion(testData)).rejects.toEqual(
      new Error("User not found")
    );
  });
});

describe("TEST_saveQuestionAnswer", () => {
  it("true is returned when correctly formatted data is passed to the function", async () => {
    let testData = {
      authedUser: "sarahedo",
      qid: "xj352vofupe1dqz9emx13r",
      answer: "optionOne",
    };
    let result = await _saveQuestionAnswer(testData);
    expect(result).toBe(true);
  });

  it("an error is returned if incorrect data is passed to the function.", async () => {
    let testData = {
      optionOneText: "optionOneText",
      optionTwoText: "optionTwoText",
    };
    await expect(_saveQuestion(testData)).rejects.toEqual(expect.any(Error));
  });
});
