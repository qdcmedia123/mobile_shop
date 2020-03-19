import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async dispatch  => {
    // any async code you want!
    try{
      const response = await fetch('https://mobileshop-458de.firebaseio.com/products.json');
      
      if(!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      console.log(resData);
      
      // Transform ot array 
      const loadedProducts = [];
      for(const key in resData) {
        loadedProducts.push(new Product
                                        (key,
                                        'u1',
                                        resData[key].title,
                                        resData[key].imageUrl,
                                        resData[key].description,
                                        resData[key].price
                                      ))
      }
      dispatch({
        type: SET_PRODUCTS, products: loadedProducts
      })
    } catch(err){
      // Send to custom alalytics server 
      throw err;
    }
   

  }
}

export const createProduct = (title, description, imageUrl, price) => {
  return async dispatch => {
    // any async code you want!
   const response = await fetch('https://mobileshop-458de.firebaseio.com/products.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price
      })
    });
    
    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  }
 
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async dispatch => {
    // any async code you want!
   const response = await fetch(`https://mobileshop-458de.firebaseio.com/products/${id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl
     
      })
    });
    
  if(!response.ok) {
    throw new Error('Something went wrong!')
  }

  dispatch({
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    },
  });
}};

export const deleteProduct = productId => {
  return async dispatch => {
   const response =  await fetch(`https://mobileshop-458de.firebaseio.com/products/${productId}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Check if response.ok is true 
    if(!response.ok) {
      throw new Error('Something went wrong!')
    }

    return dispatch({ type: DELETE_PRODUCT, pid: productId });
  }
  
};
