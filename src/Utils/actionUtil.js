import { fetchInfo } from "Redux/action/userAction";
import { asyncFetchAllUser } from "Redux/reducer/allUserReducer";
import { asyncfetchAllQuestion } from "Redux/reducer/questionReducer";
import { _getUsers } from "./_DATA";

export const refreshData = async (dispatch, userId) => {
  let users = await _getUsers();
  let user = Object.entries(users).find((tupple) => tupple[0] === userId);
  dispatch(fetchInfo(user[1]));
  dispatch(asyncFetchAllUser());
  dispatch(asyncfetchAllQuestion(user[1]?.answers));
};
