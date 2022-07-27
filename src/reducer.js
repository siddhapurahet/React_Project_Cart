const reducer = (state, action) => {
    
    if(action.type === 'Clear_Cart'){
        return {...state, cart: []}
    }
    if(action.type === 'Remove'){
        return {...state, cart: state.cart.filter((cartitem) => cartitem.id != action.payload)}
    }
    if(action.type === 'Increase'){
        let tempamt = state.cart.map((singleitem) => {
            if(singleitem.id === action.payload){
                return {...singleitem, amount: singleitem.amount+1}
            }
            return singleitem;
        });
        return {...state, cart: tempamt}
    }
    if(action.type === 'Decrease'){
        let tempamt = state.cart.map((singleitem) => {
            if(singleitem.id === action.payload){
                return {...singleitem, amount: singleitem.amount-1}
            }
            return singleitem;
        }).filter((singleitem) => singleitem.amount !== 0)
        return {...state, cart: tempamt}

    }
    if(action.type === 'Get_Total'){
        let {total, amount} = state.cart.reduce(
            (carttotal, cartitem) => {
                const {price, amount} = cartitem;
                const totalitem = price * amount;

                carttotal.total = carttotal.total + totalitem;
                carttotal.amount = carttotal.amount + amount;
                return carttotal;
            }, {
                total: 0,
                amount: 0,
            })
            total = parseFloat(total.toFixed(2))
            return {...state, total, amount}
        }
    if(action.type === 'Loading'){
        return {...state, loading: true}
    }
    if(action.type === 'Display_items'){
        return {...state, cart: action.payload, loading: false}
    }
    return state
    
}

export default reducer;