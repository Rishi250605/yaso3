import axios from 'axios';
import { productsFail, productsSuccess, productsRequest, adminProductsRequest, adminProductsSuccess, adminProductsFail } from '../slices/productsSlice';
import { productFail, productSuccess, productRequest, createReviewRequest, createReviewSuccess, createReviewFail, newProductRequest, newProductSuccess, newProductFail, deleteProductRequest, deleteProductSuccess, deleteProductFail, updateProductRequest, updateProductSuccess, updateProductFail, reviewsRequest, reviewsSuccess, reviewsFail, deleteReviewRequest, deleteReviewSuccess, deleteReviewFail } from '../slices/productSlice';
const baseURL =  'https://yaso-backend.onrender.com';
export const getProducts = (keyword, price, category, rating, currentPage) => async (dispatch) => {

    try {  
        dispatch(productsRequest()) 
        let link = `${baseURL}/api/v1/products?page=${currentPage}`;
        
        if(keyword) {
            link += `&keyword=${keyword}`
        }
        if(price) {
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
        }
        if(category) {
            link += `&category=${category}`
        }
        if(rating) {
            link += `&ratings=${rating}`
        }
        
        const { data }  =  await axios.get(link);
        dispatch(productsSuccess(data))
    } catch (error) {
        //handle error
        dispatch(productsFail(error.response.data.message))
    }
    
}


export const getProduct = id => async (dispatch) => {

    try {  
        dispatch(productRequest()) 
        const { data }  =  await axios.get(`${baseURL}/api/v1/product/${id}`);
        dispatch(productSuccess(data))
    } catch (error) {
        //handle error
        dispatch(productFail(error.response.data.message))
    }
    
}

export const createReview = reviewData => async (dispatch) => {

    try {  
        dispatch(createReviewRequest()) 
        const config = {
            headers : {
                'Content-type': 'application/json'
            }
        }
        const { data }  =  await axios.put(`${baseURL}/api/v1/review`,reviewData, config);
        dispatch(createReviewSuccess(data))
    } catch (error) {
        //handle error
        dispatch(createReviewFail(error.response.data.message))
    }
    
}

export const getAdminProducts  =  async (dispatch) => {

    try {  
        dispatch(adminProductsRequest()) 
        const { data }  =  await axios.get(`${baseURL}/api/v1/admin/products`, {
            withCredentials: true, // 👈 This is the key
        });
        dispatch(adminProductsSuccess(data))
    } catch (error) {
        //handle error
        dispatch(adminProductsFail(error.response.data.message))
    }
    
}

export const createNewProduct = (productData) => async (dispatch) => { 
    try {
        dispatch(newProductRequest());

        console.log("Product Data Before API Call:", productData); // Debugging log
        const { data } = await axios.post(`${baseURL}/api/v1/admin/product/new`, productData, {
            withCredentials: true, // 👈 This is the key
        });

        dispatch(newProductSuccess(data));
    } catch (error) {
        console.error("API Error Response:", error.response.data); // Debugging log
        dispatch(newProductFail(error.response.data.message));
    }
};


export const deleteProduct  =  id => async (dispatch) => {

    try {  
        dispatch(deleteProductRequest()) 
        await axios.delete(`${baseURL}/api/v1/admin/product/${id}`, {
            withCredentials: true, // 👈 This is the key
        });
        dispatch(deleteProductSuccess())
    } catch (error) {
        //handle error
        dispatch(deleteProductFail(error.response.data.message))
    }
    
}

export const updateProduct = (id, formData) => async (dispatch) => {
    try {
        dispatch(updateProductRequest());

        const { data } = await axios.put(
            `${baseURL}/api/v1/admin/product/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true, // 👈 This sends the auth cookie
            }
        );

        dispatch(updateProductSuccess(data));
    } catch (error) {
        dispatch(updateProductFail(error.response?.data?.message || "Update failed"));
    }
};      


export const getReviews =  id => async (dispatch) => {

    try {  
        dispatch(reviewsRequest()) 
        const { data }  =  await axios.get(`${baseURL}/api/v1/admin/reviews`,{params: {id}}, {
            withCredentials: true, // 👈 This is the key
        });
        dispatch(reviewsSuccess(data))
    } catch (error) {
        //handle error
        dispatch(reviewsFail(error.response.data.message))
    }
    
}

export const deleteReview =  (productId, id) => async (dispatch) => {

    try {  
        dispatch(deleteReviewRequest()) 
        await axios.delete(`${baseURL}/api/v1/admin/review`,{params: {productId, id}}, {
            withCredentials: true, // 👈 This is the key
        });
        dispatch(deleteReviewSuccess())
    } catch (error) {
        //handle error
        dispatch(deleteReviewFail(error.response.data.message))
    }
    
}