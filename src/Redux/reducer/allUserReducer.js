import { _getUsers } from "../../Utils/_DATA";
import { fetchAllUser } from "../../Redux/action/allUserAction";

let allUserState = {
  allUser: [],
  pending: false,
};

export const asyncFetchAllUser = () => {
  return async (dispatch) => {
    let rawResult = await _getUsers();
    let result = Object.entries(rawResult).map((tupple) => tupple[1]);
    dispatch(fetchAllUser(result));
  };
};

export const allUserReducer = (state = allUserState, action) => {
  switch (action.type) {
    case "FETCH_ALL_USER":
      return {
        allUser: [...action.data],
        pending: false,
      };
    default:
      return state;
  }
};
