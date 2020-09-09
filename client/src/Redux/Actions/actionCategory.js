import {ADD_CATEGORY, UP_CATEGORY, DEL_CATEGORY,GET_DATA} from "./constants";

export const GetCategories = (data) => {
    return {type:GET_DATA,
            categories:data
        };    
};

export const AddCategory = (data) => {
    return {type:ADD_CATEGORY,
            product:data
        };    
};

export const DelCategory = (id)=>{
    return {
        type: DEL_CATEGORY,
        id:id
    };
};

export const UpCategory = (id,data)=>{
    return {
        type: UP_CATEGORY,
        id: id,
        product:data
    };
};