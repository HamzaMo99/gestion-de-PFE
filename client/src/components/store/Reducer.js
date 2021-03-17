import * as ActionsTypes from './reducers/actions'

const initialState = {
  isLoged:false,
  userId:null
}

const reducer = (state=initialState,action) =>{

    if(action.type===ActionsTypes.LOGED){
        return {

            isLoged:true,
            userId:action.user
        }
    }


    return state;
}

export default reducer ;