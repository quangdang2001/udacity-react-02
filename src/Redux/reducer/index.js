import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { allUserReducer } from "./allUserReducer";
import { userReducer } from "./userReducer";
import { questionReducer } from "./questionReducer";

const middleware = [thunk, createLogger()];

const allReducers = combineReducers({
  users: allUserReducer,
  user: userReducer,
  questions: questionReducer,
});

export const store = createStore(allReducers, applyMiddleware(...middleware));
