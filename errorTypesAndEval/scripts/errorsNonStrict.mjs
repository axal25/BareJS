import { handleError, ReturnMsgObj } from "./errors.mjs";

export function errorHandlingExampleEval(param) {
    let functionName = "errorHandlingExampleEval(param)";
    let errorMsgObj = undefined;
    let processedParam = undefined;
    let isSuccessful = undefined;
    try{
        processedParam = eval( param );
        isSuccessful = true;
    }
    catch( error ) {
        errorMsgObj = handleError( error );
        isSuccessful = false;
    }
    finally {
        let returnMsgObj = ReturnMsgObj(
            functionName,
            param,
            isSuccessful,
            processedParam,
            errorMsgObj
        );
        console.log( returnMsgObj );
        return returnMsgObj;
    }
}