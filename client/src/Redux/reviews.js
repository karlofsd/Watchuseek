import axios from 'axios'
// CONSTANTS
const GET_REVIEWS = 'GET_REVIEWS'

// REDUCER

const initialState = {
    allReviews: []
}

export default function reviewsReducer(state = initialState, action){
    switch (action.type){
        case GET_REVIEWS:
            return {...state,
                allReviews : action.payload}
        default:
            return {...state}
    }
}

// ACTIONS
export const getReviews = (productId) => async (dispatch,getState) => {
    try{
        const {data} = await axios.get(`http://localhost:3001/reviews/${productId}`)
        dispatch({
            type: GET_REVIEWS,
            payload: data
        })
    } catch(error){
        console.log(error)
    }
}