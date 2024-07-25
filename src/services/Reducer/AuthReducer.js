let initState = {
    user: null,
    isLogin: false,
    isLoading: false,
    error: null
};

const AuthReducer = (state = initState, action) => {

    switch (action.type) {

        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
                isLogin: true,
                isLoading: false,
                error: null
            }

        case 'REGISTER':
            return {
                ...state,
                user: action.payload,
                isLogin: false,
                isLoading: false,
                error: null
            }

        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isLogin: false,
                isLoading: false,
                error: null
            }

        case 'ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        case 'LOADING':
            return {
                ...state,
                isLoading: true,
                error: null
            }

        default:
            return state

    }

}

export default AuthReducer