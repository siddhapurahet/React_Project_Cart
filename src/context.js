import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'

const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const Initialstate = {
    loading: false,
    cart: cartItems,
    total: 0,
    amount: 0, 
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, Initialstate)

  const clearcart = () => {
    dispatch({type: 'Clear_Cart'})
  }

  const remove = (id) => {
    dispatch({type: 'Remove', payload: id})
  }

  const increase = (id) => {
    dispatch({type: 'Increase', payload: id})
  }

  const decrease = (id) => {
    dispatch({type: 'Decrease', payload: id})
  }

//   const fetchdata = async () => {
//     dispatch({type: 'Loading'})
//     const response = await fetch(url);
//     const cart = await response.json();
//     dispatch({type: 'Display_items', payload: cart})
//   }

//   useEffect(() => {
//     fetchdata()
//   }, [])

useEffect(() => {
    dispatch({type: 'Get_Total'})
}, [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearcart,
        remove,
        increase,
        decrease
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }