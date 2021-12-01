import {ErrorRequestHandler}  from "express";
import{ValidationError} from 'yup';


 const errorHandler = (error, request, response, next) => {
       if (error instanceof ValidationError){
             const errors = {};

             error.inner.forEach(err => {
                    errors[err.path] = err.errors;
             });

             return alert({message:'validation fails', errors })
              
       } 
       
       
       console.error(error.errors);
       
        return alert({message: 'Internal Server Error' });
 };
        export default errorHandler;