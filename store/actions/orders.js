import Orders from '../../models/order';
import Order from '../../models/order';
export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
  return async (dispatch, getState)  => {
    // any async code you want!
    const userId = getState().auth.userId;
    try{
      const response = await fetch(`https://mobileshop-458de.firebaseio.com/orders/${userId}.json`);
      
      if(!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      //console.log(resData);
      
      // Transform ot array 
      const loadedOrders = [];
      for(const key in resData) {
        loadedOrders.push(
                          new Order(key,
                          resData[key].cartItems,
                          resData[key].totalAmount,
                          new Date(resData[key].date
                        )))
      }
      dispatch({
        type: SET_ORDERS, orders: loadedOrders
      })
    } catch(err){
      // Send to custom alalytics server 
      throw err;
    }
   

  }
}

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const date = new Date();
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    // any async code you want!
   const response = await fetch(`https://mobileshop-458de.firebaseio.com/orders/${userId}.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date.toISOString()
      })
    });
    
    // check response is ok
    if(!response.ok) {
      throw new Error('Could not created order, Something went wrong.');
    }

    dispatch({
      id: response.name,
      type: ADD_ORDER,
      orderData: {
                  items: cartItems,
                  amount: totalAmount,
                  date: date
                }
    });
  }
 
};
