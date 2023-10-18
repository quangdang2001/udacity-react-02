import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { asyncFetchAllUser } from "../Redux/reducer/allUserReducer";
import { changeLocation } from "Redux/action/locationAction";

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.user.isLogin);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    let isSubscribed = true;
    const unsubscribed = async () => {
      if (!matchPath("/login", location.pathname)) {
        dispatch(changeLocation(location.pathname));
      }
      if (!isLogin) {
        dispatch(asyncFetchAllUser());
        navigate("/login");
      }
    };

    if (isSubscribed) {
      unsubscribed();
    }
    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, navigate]);

  return <>{children}</>;
}

export default AuthProvider;
