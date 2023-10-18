import React, { useState } from "react";
import loginImage from "../../Assets/LoginImage.png";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { login } from "../../Redux/action/userAction";
import { asyncfetchAllQuestion } from "../../Redux/reducer/questionReducer";

function LoginPage() {
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });

  const allUser = useSelector((state) => state.users?.allUser);
  const currentLocation = useSelector((state) => state.currentLocation);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeInput = (event) => {
    setLoginInfo((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    let user = allUser.find((user) => user.id === loginInfo.username);
    if (user) {
      dispatch(login(user));
      dispatch(asyncfetchAllQuestion(user?.answers));
      navigate(currentLocation || "/");
    }
  };
  return (
    <div className="LoginPage__box">
      <div className="LoginPage__title">Employee Polls</div>
      <div className="LoginPage__imageBox">
        <img className="LoginPage__image" src={loginImage} alt="loginImage" />
      </div>
      <Form className="LoginPage__formBox" onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label className="LoginPage__label" htmlFor="username">
            User:
          </Form.Label>
          <Form.Select
            value={loginInfo.username}
            onChange={handleChangeInput}
            required
            id="username"
            placeholder="fill username..."
          >
            <option value="" disabled>
              Select user
            </option>
            {allUser &&
              allUser?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.id}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="LoginPage__label" htmlFor="password">
            Password:
          </Form.Label>
          <Form.Control
            value={loginInfo.password}
            onChange={handleChangeInput}
            required
            id="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        {false ? (
          <Button className="LoginPage__btnLogin" variant="primary" disabled>
            <Spinner animation="border" size="sm" />
          </Button>
        ) : (
          <Button
            className="LoginPage__btnLogin"
            type="submit"
            variant="primary"
          >
            Submit
          </Button>
        )}
      </Form>
    </div>
  );
}

export default LoginPage;
