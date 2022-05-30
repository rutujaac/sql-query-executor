export const initialState = {
    currentQuery : "",
    result: null,
    statusMessage: "",
}


function reducer(state, action) {
    switch(action.type) {      
        case "SET_QUERY":
            return {...state,
                currentQuery: action.currentQuery,
                result: action.result,
                statusMessage: action.statusMessage
            }
        default:
            return state
    }
}

export default reducer