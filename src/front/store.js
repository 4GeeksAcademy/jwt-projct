export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    user: null,
    access_token: null
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
      //   case 'set_user':
      // return {
      //   ...store,
      //   user: action.payload.userId,
      // };

    case 'set_user':

      const { user,  access_token } = action.payload

      return {
        ...store,
        user: user,
        access_token: access_token
      };
    default:
      throw Error('Unknown action.');
  }    
}
