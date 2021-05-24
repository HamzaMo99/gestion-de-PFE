import * as ActionsTypes from './reducers/actions'

const initialState = {
  isLoged:false,
  userId:null,
  userInfo:{}
}

const reducer = (state=initialState,action) =>{

    if(action.type===ActionsTypes.LOGED){
        return {

            isLoged:true,
            userId:action.userid,
            userInfo:action.userinfo
        }
    }


    return state;
}

export default reducer ;