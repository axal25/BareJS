'use strict';

export class CustomErrorClass extends Error {

    // override constructor
    constructor( message, code, exampleProperty, customProperty ) {
        // super( message );
        super();
        super.message = message;
        this.message = message;
        super.name = "Error";
        this.name = "CustomErrorClass";
        this.name = this.name + " extends " + super.name;
        this.code = "Default ExampleErrorCode";
        this.exampleProperty = "Default valueOfExampleProperty";
        this.customProperty = "Default valueOfCustomProperty";

        this.code = code;
        this.exampleProperty = exampleProperty;
        this.customProperty = customProperty;

        // Error.captureStackTrace - to streamline stack trace // node.js
        // make CustomErrorClass constructor( message ) not part of the resulting stuck trace
        // Error.captureStackTrace(this, CustomErrorClass);
    }

    setCode( code ) {
        this.code = code;
    }

    getCode() {
        return this.code;
    }
}

// export default CustomErrorClass;
