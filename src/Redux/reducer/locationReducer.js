
let locationState = "/"

export const locationReducer = (state = locationState, action) => {
    switch (action.type) {
        case "CHANGE_LOCATION":
            return action.location
        default:
            return state
    }
}