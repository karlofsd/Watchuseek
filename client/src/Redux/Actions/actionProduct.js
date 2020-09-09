import {ADD,DEL,UP, GET} from './constants'

export const GetProduct = (data) => {
    return {
        type:GET, 
        product:data
    };   
};

export const AddProduct = (data) => {
    return {
        type:ADD,
        product:data
    }; 
};


export const DelProduct = (id)=>{
    return {
        type: DEL,
        id:id
    };
};

export const UpProduct = (id,data)=>{
    return {
        type: UP,
        id: id,
        product:data
    };
};

