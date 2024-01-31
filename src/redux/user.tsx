import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
    user: {},
    categories: [],
    subcategories: [],
    brands: [],
    systemData: {},
    lastOrders: [],
    loading: false,
    checkAll: false,
}
const FETCH_USER_DONE = 'FETCH_USER_DONE'
const FETCH_CATEGORIES_DONE = 'FETCH_CATEGORIES_DONE'
const FETCH_LAST_ORDERS = 'FETCH_LAST_ORDERS'
const FETCH_SYSTEM_DATA = 'FETCH_SYSTEM_DATA'
const CHECK_ALL = 'CHECK_ALL'




export const fetchUserDone = (user: any) => {
    return {
        type: FETCH_USER_DONE,
        payload: user
    }
}
export const fetchCategoriesDone = (categories: any) => {
    return {
        type: FETCH_CATEGORIES_DONE,
        payload: categories
    }
}

export const fetchSystemData = (data: any) => {
    return {
        type: FETCH_SYSTEM_DATA,
        payload: data
    }
}

export const fetchLastOrders = (data: any) => {
    return {
        type: FETCH_LAST_ORDERS,
        payload: data
    }
}

export const checkAllFunc = (checkValue: boolean) => {
    return {
        type: CHECK_ALL,
        payload: checkValue
    }
}

const reducer: any = (state = initialState, action: any) => {
    switch (action.type) {

        case FETCH_USER_DONE:
            return {
                ...state,
                user: action.payload,
            }
        case FETCH_CATEGORIES_DONE:
            return {
                ...state,
                categories: action.payload,
            }
        case FETCH_SYSTEM_DATA:
            return {
                ...state,
                systemData: action.payload
            }
        case FETCH_LAST_ORDERS:
            return {
                ...state,
                lastOrders: action.payload
            }
        case CHECK_ALL:
            return {
                ...state,
                checkAll: action.payload
            }
        default:
            return state
    }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store