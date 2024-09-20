export const getBasketTotal=(basket)=>{
    return basket?.reduce((amount,item)=>item.price + amount ,0)
  }


export const initialState={
    basket:[],
    user:null
}

 const AppReducer=(state = initialState,action)=>{
    switch(action.type){
        case "SET_USER" :
            return{
                ...state,
                user:action.user
            };
            case "ADD_TO_BASKET":
                return{
                    ...state,
                    basket:[...state.basket,action.item]
                };
            case "EMPTY_BASKET":
                    return {
                      ...state,
                      basket: [],
                    };    
            case "REMOVE_FROM_BASKET":    
            return{
                ...state,
                basket:state.basket.filter(item=>item.id!==action.id)
            };
            default:
                return state;
    }
}

export default AppReducer;