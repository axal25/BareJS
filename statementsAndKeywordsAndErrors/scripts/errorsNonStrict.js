function errorHandlingExampleEval(param) {
    var functionName = "errorHandlingExampleEval(param)";
    var errorMsgObj = undefined;
    var processedParam = undefined;
    var isSuccessful = undefined;
    try{
        processedParam = eval( param );
        isSuccessful = true;
    }
    catch( error ) {
        errorMsgObj = handleError( error );
        isSuccessful = false;
    }
    finally {
        var returnMsgObj = ReturnMsgObj(
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