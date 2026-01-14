import { errorCodes } from "./ErrorCodes.jsx";

export function getErrorMessage(code, lang){
    if (!code) return errorCodes.unknown_error[lang];
    
    if (!errorCodes[code]) return errorCodes.unknown_error[lang];

    return errorCodes[code][lang] || errorCodes.unknown_error[lang];
}