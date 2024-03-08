import CONSTANTS from "./constants.json";

const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const numberPattern = /^\d{10}$/;

interface Validator {
    type: string,
    stringToTest: string,
}

const validator = ({ type, stringToTest }: Validator) => {

    let test, msg;

    switch (type) {
        case CONSTANTS.EMAIL:
            test = emailPattern.test(stringToTest);
            msg = CONSTANTS.EMAIL_ERROR;
            break;


        case CONSTANTS.NUMBER:
            test = numberPattern.test(stringToTest);
            msg = CONSTANTS.NUMBER_ERROR;
            break;

        default:
            msg = "Invalid Choice";
            break;
    }

    if (!test) {
        alert(msg);
    }
    return test;
};


export default validator;