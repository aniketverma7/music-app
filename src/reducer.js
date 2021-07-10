export const initialState ={
    curr : 0, 
}

const reducer = (state,action)=>{
    switch(action.type){
        case 'SET_CURR' : 
            return {
                ...state,
                curr:action.curr,
        };
        default:
            return state;
    }
}

export default reducer;