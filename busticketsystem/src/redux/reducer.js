const initialState = {
    price:"",
    To:"",
    From:"",
    Date:"",
    TIME:"",
    BUS_NO:"",
    customerName:[],
    totalPrice:"",
    userName:"",
    password:""
};

const reducer = (state=initialState, action) => {
    const newState = {...state};

    switch(action.type){
        case 'AGE_UP': 
            newState.price = action.value;
            newState.To=action.To;
            newState.From=action.From;
            newState.Date=action.Date;
            newState.TIME=action.TIME;
            newState.BUS_NO=action.BUS_NO;
            break;
        
        case 'BOOKING_DETAILS': 
            if(action.name!=""){
                if(action.name!=undefined){
            
            newState.customerName=newState.customerName.concat(action.name);
            newState.totalPrice=action.ticketPrice
            }}
            break;
        case 'REG_DETAILS' :
            newState.userName=action.userName;
            newState.password=action.password;
            break

    }
    return newState;
};

export default reducer;