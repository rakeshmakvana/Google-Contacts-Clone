let initState = {
    number: [],
    isLoading: false,
    error: null
};

const NumReducer = (state = initState, action) => {

    switch (action.type) {

        case 'ADD':
            return {
                ...state,
                number: action.payload,
                isLoading: false,
                error: null
            }

        case 'GET':
            return {
                ...state,
                number: action.payload,
                isLoading: false,
                error: null
            }

        case 'UPDATE':
            return {
                ...state,
                number: action.payload,
                isLoading: false,
                error: null
            }

        case 'DELET':
            return {
                ...state,
                data: null,
                loading: false,
                error: null
            };

        case 'LOADING':
            return {
                ...state,
                loading: true,
                error: null
            };

        case 'ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state

    }

}

export default NumReducer