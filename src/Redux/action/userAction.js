export const login = (userInfo) => {
    return {
        type: "LOGIN",
        payload: userInfo,
    };
};
export const logout = () => {
    return {
        type: "LOGOUT"
    };
};

export const fetchInfo = (userInfo) => {
    return {
        type: "FETCH_USER_INFO",
        payload: userInfo,
    };
};