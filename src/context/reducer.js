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
            break
        case "SAVE_QUERY":
            const savedQuery = state.savedQueries.filter(item => item == action.queryString)[0]
            console.log(savedQuery)
            if(!savedQuery) {
                console.log("saving query")
            return {
                ...state,
                savedQueries: [...state.savedQueries, action.queryString]
                }
            }
            return state
        default:
            return state
            break
    }
}

export default reducer