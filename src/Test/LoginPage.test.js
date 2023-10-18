import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { LoginPage } from "Layout";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "Redux/reducer";

describe("TEST_LoginPage", () => {
  it("should show correct data when fill username", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
    const username = component.getByLabelText("Password:");
    const testData = "password";
    expect(username.value).toEqual("");
    fireEvent.change(username, { target: { value: testData } });
    expect(username.value).toEqual(testData);
  });

  it("should render correct1", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
  });

  it("should render correct2", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
