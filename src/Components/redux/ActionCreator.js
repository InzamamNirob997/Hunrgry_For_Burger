// import * as ActionType from "./ActionType"
// import axios from "axios"

// export const addIngredient = ingtype => {
//     return {
//         type: ActionType.ADD_INGREDIENT,
//         payload: ingtype


//     }
     
// }

// export const removeIngredient = ingtype => {
//     return {
//         type: ActionType.REMOVE_INGREDIENT,
//         payload: ingtype


//     }
     
// }

// export const updatePurchaseable = () => {
//     return {
//         type: ActionType.UPDATE_PURCHASEABLE,
       


//     }
     
// }

// export const resetIngredient = () =>{
//     return {
//         type: ActionType.RESET_INGREDIENT
//     }
// }

// export const loadOrder = orders => {
//     return {
//         type: ActionType.LOAD_ORDERS,
//         payload: orders
//     }
// }


// export const FailOrder = () => {
//     return {
//         type: ActionType.ORDER_LOAD_FAIL,
        
//     }
// }

// export const fetchData = (token, userId) => dispatch => {
//     const queryParams = '&orderBy="userId"&equalTo="'+ userId + '"'
//     axios.get('https://burger-builder-43d6c-default-rtdb.firebaseio.com/orders.json?auth=' + token + queryParams)
//     .then(response =>{
//        dispatch(loadOrder(response.data))
//     })
//     .catch(err =>{
//         dispatch(FailOrder())
//     })
    
// }




import * as ActionType from "./ActionType";
import axios from "axios";

export const addIngredient = ingtype => ({
    type: ActionType.ADD_INGREDIENT,
    payload: ingtype
});

export const removeIngredient = ingtype => ({
    type: ActionType.REMOVE_INGREDIENT,
    payload: ingtype
});

export const updatePurchaseable = () => ({
    type: ActionType.UPDATE_PURCHASEABLE
});

export const resetIngredient = () => ({
    type: ActionType.RESET_INGREDIENT
});

export const loadOrder = orders => ({
    type: ActionType.LOAD_ORDERS,
    payload: orders
});

export const failOrder = () => ({
    type: ActionType.ORDER_LOAD_FAIL
});

export const fetchData = (token, userId) => dispatch => {
    const queryParams = `&orderBy="userId"&equalTo="${userId}"`;
    axios.get(`https://burger-builder-43d6c-default-rtdb.firebaseio.com/orders.json?auth=${token}${queryParams}`)
        .then(response => {
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                });
            }
            dispatch(loadOrder(fetchedOrders));
        })
        .catch(err => {
            dispatch(failOrder());
        });
};
