


import * as ActionType from './ActionType';

const initialState = {
    data: [
        { type: "Cheese-of-bread", amount: 0 },
        { type: "Salad-of-bread", amount: 0 },
        { type: "Meat-of-bread", amount: 0 }
    ],
    orders: [],
    ordersLoading: true,
    ErrorOrder: false,
    totalPrice: 70,
    purchaseable: false,
    token: null,
    userId: null,
    authLoading: false,
    authError: null
};

const priceTags = {
    "Cheese-of-bread": 40,
    "Salad-of-bread": 30,
    "Meat-of-bread": 120
};

export const Reducer = (state = initialState, action) => {
    const data1 = [...state.data];
    switch (action.type) {
        case ActionType.ADD_INGREDIENT:
            for (let item of data1) {
                if (item.type === action.payload) item.amount++;
            }
            return {
                ...state,
                data: data1,
                totalPrice: state.totalPrice + priceTags[action.payload]
            };

        case ActionType.REMOVE_INGREDIENT:
            for (let item of data1) {
                if (item.type === action.payload) {
                    if (item.amount <= 0) return state;
                    item.amount--;
                }
            }
            return {
                ...state,
                data: data1,
                totalPrice: state.totalPrice - priceTags[action.payload]
            };

        case ActionType.UPDATE_PURCHASEABLE:
            const sum = state.data.reduce((sum, element) => {
                return sum + element.amount
            }, 0);
            return {
                ...state,
                purchaseable: sum > 0
            };

        case ActionType.RESET_INGREDIENT:
            return {
                ...state,
                data: [
                    { type: "Cheese-of-bread", amount: 0 },
                    { type: "Salad-of-bread", amount: 0 },
                    { type: "Meat-of-bread", amount: 0 }
                ],
                totalPrice: 70,
                purchaseable: false
            };

        case ActionType.LOAD_ORDERS:
            const orders = [];
            for (let key in action.payload) {
                orders.push({
                    ...action.payload[key],
                    id: key,
                });
            }
            return {
                ...state,
                orders,
                ordersLoading: false
            };

        case ActionType.ORDER_LOAD_FAIL:
            return {
                ...state,
                ErrorOrder: true,
                ordersLoading: false
            };

        case ActionType.AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                authLoading: false,
                authError: null
            };

        case ActionType.AUTH_FAILED:
            return {
                ...state,
                authLoading: false,
                authError: action.error
            };

        case ActionType.AUTH_LOADING:
            return {
                ...state,
                authLoading: true
            };

        case ActionType.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            };

        default:
            return state;
    }
};


