'use strict';

export function getTemplateStringsExample1_1() {
    let a = 15;
    let b = 20;
    return `a = ${a}\nb = ${b}\na + b = ${ a + b }`;
}

export function getTemplateStringsExample1_2() {
    let a = 25;
    let b = 30;
    let c = 35;
    return "\na = ${a}\nb = ${b}\nc = ${c}\na + b + c = ${ a + b + c }\n" +
        "\n ==[getTaggedTemplateStringsExample`...`]==> \n" +
        "\n" + getTaggedTemplateStringsExample`a = ${a}\nb = ${b}\nc = ${c}\na + b + c = ${ a + b + c }` + "\n";
}

const answer = `abbbaaasdadqwdqwdasd`;
const overridingAnswer = `"this is overriding answer?"`;
const messages = {
    success: `the answer = ${answer}. coz everything is good.`,
    failure: `the answer = ${answer}. coz everything is fucking trash.`
};

const messages2 = ( answer2 ) => {
    return {
        success: `the answer = ${answer2}. coz everything is good.`,
        failure: `the answer = ${answer2}. coz everything is fucking trash.`
    };
};

export function getTemplateStringsExample1_3() {
    return messages[ "success" ];
}
export function getTemplateStringsExample1_4() {
    return messages[ "failure" ];
}

export function getTemplateStringsExample1_5() {
    let answer = "\"this is overriding answer?\"";
    return messages[ "failure" ];
}

export function getTemplateStringsExample1_6() {
    return messages2(overridingAnswer)[ "failure" ];
}

function getTaggedTemplateStringsExample(strings, ...values) {
    let formattedResult = "strings[";
    let i = 0;
    strings.forEach( string => {
        formattedResult += `\n${i}:\n "${string}"`;
        if(i!==strings.length-1) formattedResult += ", ";
        i++;
    });
    formattedResult += "]\n";
    formattedResult += "values[";
    i = 0;
    values.forEach( value => {
        formattedResult += `\n${i}:\n "${value}"`;
        if(i!==values.length-1) formattedResult += ", ";
        i++;
    });
    formattedResult += "]";
    return formattedResult;
}