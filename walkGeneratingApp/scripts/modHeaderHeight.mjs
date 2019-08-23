'use strict';

import { toFormattedJsonStringIfJson } from "../../utils/scripts/jsonUtils.mjs";

export function adjustHeaderHeight() {
    adjustHeaderHeightForH1StringLength();
}

function adjustHeaderHeightForH1StringLength() {
    if( checkH1StringLength() ) {
        let firstHeader = get1stHeader();
        if( firstHeader ) {
            let firstHeaderComputedStyle = getElementsComputedStyle( firstHeader );
            if( firstHeaderComputedStyle.height ) {
                firstHeader.style.height = getNewHeight( firstHeaderComputedStyle.height );
                // console.log( "getStyle(firstHeader, \"height\") = " + getStyle(firstHeader, "height") );
            }
        }
    }
}

function getNewHeight( firstHeaderComputedStyleHeight ) {
    let newHeight = returnValueWithoutUnit( firstHeaderComputedStyleHeight );

    let bodyMaxWidthInH1FontSize = returnValueWithoutUnit( getBodyMaxWidth() ) / returnValueWithoutUnit( getH1FontSize() );
    let preparedH1InnerTextLength = bodyMaxWidthInH1FontSize;
    while( preparedH1InnerTextLength < get1stH1().innerText.length ) {
        newHeight += returnValueWithoutUnit( getH1LineHeight() );
        preparedH1InnerTextLength += bodyMaxWidthInH1FontSize;
    }

    newHeight += returnUnitWithoutValue( firstHeaderComputedStyleHeight );
    return newHeight;
}

function returnValueWithoutUnit( string ) {
    return parseFloat( string.replace('px','').replace('em','').replace('pt','') );
}

function returnUnitWithoutValue( string ) {
    return string.replace(/[0-9]/g,'');
}

function getElementsComputedStyle( element ) {
    let elementStyle = undefined;
    if( element.currentStyle ) {
        elementStyle = element.currentStyle;
    }
    else {
        if( document.defaultView.getComputedStyle( element ) ) {
            elementStyle = document.defaultView.getComputedStyle( element );
        }
    }
    return elementStyle;
}

function checkH1StringLength() {
    let firstH1 = get1stH1();
    if( firstH1 ) {
        let lineLength = returnValueWithoutUnit( getBodyMaxWidth() ) / returnValueWithoutUnit( getH1FontSize() );
        if( firstH1.innerText.length > lineLength ) return true;
        else return false;
    }
    else return false;
}

function get1emInPx() {
    let body = document.body;
    let testElement = document.createElement('div');

    testElement.style.cssText='display:inline-block; padding:0; line-height:1; position:absolute; visibility:hidden; font-size:1em';

    testElement.appendChild(document.createTextNode('M'));
    body.appendChild(testElement);
    let fs = [ testElement.offsetWidth, testElement.offsetHeight ];
    body.removeChild(testElement);
    return fs;
}
/**
 * Not sure about that.
 * Experimentally it's okay.
 * **/
function get1emInPxWidth() {
    return get1emInPx()[1];
}

function get1emInPxHeight() {
    return get1emInPx()[0];
}

function getH1LineHeight() {
    let firstH1Style = getElementsComputedStyle( get1stH1() );
    if( returnUnitWithoutValue(firstH1Style.lineHeight) === "px" ) return firstH1Style.lineHeight;
    else throw new Error("getElementsComputedStyle( get1stH1() ).lineHeight does not return value in px");
}

function getH1FontSize() {
    let firstH1Style = getElementsComputedStyle( get1stH1() );
    if( returnUnitWithoutValue(firstH1Style.fontSize) === "px" ) return firstH1Style.fontSize;
    else throw new Error("getElementsComputedStyle( get1stH1() ).fontSize does not return value in px");
}

function getBodyMaxWidth() {
    let body = getBody();
    if( body ) {
        if( getElementsComputedStyle(body) ) {
            if( getElementsComputedStyle(body).maxWidth ) {
                return getElementsComputedStyle(body).maxWidth;
            }
            else throw new Error("Could NOT get document element \"body\" style max width.");
        }
        else throw new Error("Could NOT get document element \"body\" style.");
    }
    else throw new Error("Could NOT get document element \"body\".");
}

function getBody() {
    let bodys = document.getElementsByTagName("body");
    if( bodys ) {
        if( bodys[bodys.length-1] ) {
            return bodys[bodys.length-1];
        }
        else throw new Error("Could not find last element \"body\".");
    }
    else throw new Error("Could not find any element \"body\".");
}

function get1stH1() {
    let h1s = document.getElementsByTagName("h1");
    if( h1s ) {
        if( h1s[0] ) {
            return h1s[0];
        }
        else return undefined;
    }
    else return undefined;
}

function get1stHeader() {
    let headers = document.getElementsByTagName("header");
    if( headers ) {
        if( headers[0] ) {
            return headers[0];
        }
        else return undefined;
    }
    else return undefined;
}

function getStyle(oElm, strCssRule){
    let strValue = "";
    if(document.defaultView && document.defaultView.getComputedStyle){
        strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
    }
    else if(oElm.currentStyle){
        strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
            return p1.toUpperCase();
        });
        strValue = oElm.currentStyle[strCssRule];
    }
    return strValue;
}