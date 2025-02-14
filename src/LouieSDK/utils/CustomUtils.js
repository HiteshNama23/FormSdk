//import { amount } from '../VoiceHandler/GlobalCommandProcessor';
const ViewParser = require('../Dataclasses/ViewParser');
const CreateVoiceData = require("../res/CreateVoiceData");
const VoiceEventProcessor = require('../VoiceHandler/VoiceEventProcessor');
const ContextFinder = require('../utils/ContextFinder');
//const CreateVoiceData = require('../utils/CreateVoiceData');

export const removeExtraWordsFromApiResponse = (voiceResult) => {
    console.log("removeExtraWordsFromApiResponse", "method call 5");
    const extraWords = CreateVoiceData.matchWords.get("ignore_words_from_api_response");
    var output = null;
    if (voiceResult !== null) {
        var str = (ViewParser.removeUnwantedPrefixAndSuffixChar(voiceResult)).toLowerCase().trim().split(" ");
        for (let j = 0; j < extraWords.length; j++) {
            if (str.includes(extraWords[j])) {
                const tempArr = [];
                for (let k = 0; k < str.length; k++) {
                    if (str[k] !== extraWords[j]) {
                        tempArr.push(str[k]);
                    }
                }
                str = tempArr;
            }
        }
        var tempStr = "";
        for (let t = 0; t < str.length; t++) {
            tempStr += ` ${str[t]}`;
        }
        tempStr = tempStr.trim();
        if (tempStr !== "") {
            output = tempStr;
        }
    } else {
        console.log("EW is null or empty", "EW is null or empty")
        const nullreturn = "     ";
        return nullreturn;
    }
    console.log(`output after EW removal = ${output}`)
    return output?.replace(/stop performing/gi, "top performing").replace(/stop performance/gi, "top performance");
} 


const englishNumberMap = {
    "zero": 0,
    "0":0,
    "first": 1,
    "fast": 1,
    "one":1,
    "1": 1,
    "1st": 1,
    "fist": 1,
    "won":1,
    "two": 2,
    "tu":2,
    "2":2,
    "second": 2,
    "2nd":2,
    "three": 3,
    "third":3,
    "3":3,
    "3rd": 3,
    "forth": 4,
    "four":4,
    "4": 4,
    "4th": 4,
    "fort": 4,
    "fourth": 4,
    "fifth":5,
    "five":5,
    "5":5,
    "5th": 5,
    "six": 6,
    "sex": 6,
    "sixth":6,
    "6":6,
    "6th": 6,
    "seventh": 7,
    "seven": 7,
    "7":7,
    "7th": 7,
    "eight": 8,
    "eighth": 8,
    "8":8,
    "8th": 8,
    "ninth": 9,
    "nine":9,
    "9":9,
    "9th": 9,
    "tenth": 10,
    "ten":10,
    "10":10,
    "10th": 10
};

const englishDigitMap = new Map([
    ['zero', 0],
    ['0', 0],
    ['first', 1],
    ['fast', 1],
    ['one', 1],
    ['1', 1],
    ['2', 2],
    ['three', 3],
    ['third', 3],
    ['3', 3],
    ['turd', 3],
    ['forth', 4],
    ['four', 4],
    ['4', 4],
    ['fort', 4],
    ['fourth', 4],
    ['fifth', 5],
    ['five', 5],
    ['5', 5],
    ['six', 6],
    ['sex', 6],
    ['sixth', 6],
    ['6', 6],
    ['seventh', 7],
    ['seven', 7],
    ['7', 7],
    ['eight', 8],
    ['eighth', 8],
    ['8', 8],
    ['ninth', 9],
    ['nine', 9],
    ['9', 9]
]);

export const englishNumberMatchWordsMap = new Map([
    ['first', 1],
    ['fast', 1],
    ['one', 1],
    ['1', 1],
    ['1st', 1],
    ['fist', 1],
    ['won', 1],
    ['two', 2],
    ['tu', 2],
    ['to', 2],
    ['do', 2],
    ['doo', 2],
    ['doom', 2],
    ['2', 2],
    ['second', 2],
    ['2nd', 2],
    ['three', 3],
    ['third', 3],
    ['3', 3],
    ['3rd', 3],
    ['turd', 3],
    ['tree', 3],
    ['free', 3],
    ['thud', 3],
    ['twriled', 3],
    ['forth', 4],
    ['four', 4],
    ['4', 4],
    ['4th', 4],
    ['fort', 4],
    ['fourth', 4],
    ['for', 4],
    ['food', 4],
    ['full', 4],
    ['fun', 4],
    ['foe', 4],
    ['fifth', 5],
    ['five', 5],
    ['5', 5],
    ['fine', 5],
    ['file', 5],
    ['fives', 5],
    ['filth', 5],
    ['six', 6],
    ['sex', 6],
    ['sixth', 6],
    ['6', 6],
    ['6th', 6],
    ['seventh', 7],
    ['seven', 7],
    ['7', 7],
    ['eight', 8],
    ['eighth', 8],
    ['8', 8],
    ['eat', 8],
    ['ate', 8],
    ['hate', 8],
    ['weight', 8],
    ['ninth', 9],
    ['nine', 9],
    ['9', 9],
    ['mine', 9],
    ['mind', 9],
    ['mime', 9],
    ['tenth', 10],
    ['ten', 10],
    ['10', 10],
    ['10th', 10],
    ['tent', 10],
    ['dent', 10],
    ['bend', 10],
    ['tan', 10],
    ['ken', 10],
    ['then', 10],
    ['den', 10],
    ['ben', 10],
    ['eleven', 11],
    ['eleventh', 11],
    ['11', 11],
    ['11th', 11],
    ['12', 12],
    ['12th', 12],
    ['twelve', 12],
    ['twelfth', 12],
    ['13', 13],
    ['13th', 13],
    ['thirteen', 13],
    ['thirteenth', 13],
    ['14', 14],
    ['14th', 14],
    ['fourteen', 14],
    ['fourteenth', 14],
    ['15', 15],
    ['15th', 15],
    ['fifteen', 15],
    ['fifteenth', 15],
    ['twenty', 20],
    ['20', 20],
    ['thirty', 30],
    ['30', 30],
    ['fourty', 40],
    ['40', 40],
    ['fifty', 50],
    ['50', 50],
    ['sixty', 60],
    ['60', 60],
    ['seventy', 70],
    ['70', 70],
    ['eighty', 80],
    ['80', 80],
    ['ninety', 90],
    ['90', 90]
]);

const numberToOrdinalName = new Map([
    [0, 'zeroth'],
    [1, 'first'],
    [2, 'second'],
    [3, 'third'],
    [4, 'fourth'],
    [5, 'fifth'],
    [6, 'sixth'],
    [7, 'seventh'],
    [8, 'eighth'],
    [9, 'ninth'],
    [10, 'tenth'],
    [11, 'eleventh'],
    [12, 'Twelfth'],
    [13, 'thirteenth'],
    [14, 'Fourteenth'],
    [15, 'Fifteenth']
]);

const numberToWord = new Map([
    [0, 'Zero'],
    [1, 'One'],
    [2, 'Two'],
    [3, 'Three'],
    [4, 'Four'],
    [5, 'Five'],
    [6, 'Six'],
    [7, 'Seven'],
    [8, 'Eight'],
    [9, 'Nine'],
    [10, 'Ten'],
    [11, 'Eleven'],
    [12, 'Twelve'],
    [13, 'thirteen'],
    [14, 'Fourteen'],
    [15, 'Fifteen']
]);

const units = [
    "", "One", "Two", "Three", "Four",
    "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
    "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
    "Eighteen", "Nineteen"
];

const tens = [
    "",  // 0
    "",  // 1
    "Twenty",  // 2
    "Thirty",  // 3
    "Forty",  // 4
    "Fifty",  // 5
    "Sixty",  // 6
    "Seventy",  // 7
    "Eighty",  // 8
    "Ninety" // 9
];

export function isAmountInDoller() {
    console.log("1","1");
    if (VoiceEventProcessor.rawVoiceResultContainsAnyKey("doller_match_words")) {
        console.log("2","2");
        return true;
    }
    
    const symbols = CreateVoiceData.matchWords.get("doller_symbol");
    for (let voice of VoiceEventProcessor.voiceResult) {
        //console.log("3","3");
        for (let symbol of symbols) {
            //console.log("4","4");
            if (voice.includes(symbol)) {
                console.log("5","5");
                return true;
            }
        }
    }
    return false;
}


export function getAmountFromVoiceResult(amountString) {
    // if(VoiceEventProcessor.voiceResult.length === 0) {
    //     return null;
    // }
    // console.log("inside amount check1 :", amount);
    // var result = VoiceEventProcessor.voiceResult.split(" ");
    // for(let i = 0; i < result.length; i++) {
    //    var extraWords = CreateVoiceData.matchWords.get("extra_words_for_amount");
    //    var indx = -1;
    //    console.log("check3 :", result, extraWords);
    //    for(let j = 0; j < extraWords.length; j++) {
    //     if (result.includes(extraWords[j])) {
    //         indx = result.indexOf(extraWords[j]);
    //     }
    //    }
    //    console.log("check after :", indx);
    //    var str = "";
    //    for(let k = 0; k < result.length; k++) {
    //     if (k !== indx-1) {
    //         str += result[k] + " ";
    //     }
    //    }
    //    console.log("result str :", str);
    //    VoiceEventProcessor.voiceResult = str.trim();
    // }
    // console.log("rawVoiceResult after parsing for amount = ", VoiceEventProcessor.voiceResult);
    // var rupeesArr = CreateVoiceData.matchWords.get("rupees");
    // var result = VoiceEventProcessor.voiceResult.split(" ");
    // for(let l = 0; l < result.length; l++) {
    //     var tAmount = result[l].toLowerCase();
    //     for(var m = 0; m < rupeesArr.length; m++) {
    //        if(tAmount.includes(rupeesArr[m])) {
    //         tAmount = tAmount.replace(rupeesArr[m], " rupees");
    //        }
    //     }
    //     result[l] = tAmount;
    // }
    // VoiceEventProcessor.voiceResult = "";
    // for(let i = 0; i < result.length; i++) {
    //     if(i != result.length-1) {
    //         VoiceEventProcessor.voiceResult += result[i] + " ";
    //     } else {
    //         VoiceEventProcessor.voiceResult += result[i];
    //     }
    // }
    // console.log("tAmount check :", VoiceEventProcessor.voiceResult);
    // amount = VoiceEventProcessor.voiceResult;
    console.log("amount string",amountString);
    var amount = ViewParser.removeUnwantedSuffixChar(amountString);
    //dot,point,.
    amount = amount.replace("dot","");
    console.log("updated amount string 1",amount);
    amount = amount.replace("point","");
    console.log("updated amount string 2",amount);
    // amount = amount.replace(/\.\d+(?=\s)/, "");
    // console.log("updated amount string",amount);
    if (textContainsAnyMatchWord("rupees", amount) && textContainsAnyMatchWord("paise", amount)) {
        // If so, try to extract the amount
        console.log("CU if is 1 =",amount);
        const amt = getAmountFromVoiceResultTextIfContainsRupeesAndPaise(amount);
        if (amt !== null) {
            console.log("Custom Utils Amount 1= ",amt);
            return amt;
        }
    } else if (textContainsAnyMatchWord("paise", amount)) {
        // If only "paise" is mentioned, return amount as 0.0
        console.log("CU if is 2 =",amount);
        return 0.0;
    } else {
        // Otherwise, try to extract the amount
        console.log("CU if is 3 =",amount);
        const amt = getAmountFromVoiceResultText(amount);
        console.log("CU filter amount = ",amt);
        if (amt !== null) {
            console.log("Custom Utils Amount 2= ",amt);
            return amt;
        }
    }
    
    // for (const amount of VoiceEventProcessor.voiceResult) {
    //     // Check if the voice result contains both "rupees" and "paise"
        
    // }

    // Return null if no valid amount is found
    //return null;
}

export const textContainsAnyMatchWord = (matchWord, voiceResult) => {
    // console.log("CU textContainAnyMatchWord = ",matchWord+" "+voiceResult);
    try{
        if (CreateVoiceData.matchWords.get("negative_matchword") !== null) {
            const matchWordsKeys = CreateVoiceData.matchWords.get("negative_matchword");
            for ( let i = 0; i < matchWordsKeys.length; i++) {
              if (ContextFinder.isMatchWithCommand(matchWordsKeys[i], voiceResult)) {
                console.log("textContainsAnyMatchWord- Match word found negative");
                return false;
              }
            }
        }
        if (CreateVoiceData.matchWords.get(matchWord) !== null ) {
            const matchWordsKeys = CreateVoiceData.matchWords.get(matchWord);
            for ( let i = 0; i < matchWordsKeys.length; i++) {
              if (ContextFinder.isMatchWithCommand(matchWordsKeys[i], voiceResult)) {
                console.log("textContainsAnyMatchWord- Match word found");
                return true;
              }
            }
        } 
    }catch(err){
        console.log("CU textContainAnyMatchWord exception = ",err);
    }
    return false;
}


function getAmountFromVoiceResultTextIfContainsRupeesAndPaise(amount) {
    if (amount === null) {
        return null;
    }

    const matchWords = CreateVoiceData.matchWords.get("rupees");
    let amt;

    for (const word of matchWords) {
        if (amount.toLowerCase().includes(word.toLowerCase())) {
            const splitArr = amount.toLowerCase().split(word.toLowerCase());
            const rupeesText = splitArr[0];
            const paiseText = splitArr.length > 1 ? splitArr[1] : null;

            const rupees = getAmountFromVoiceResultText(rupeesText);
            const paise = getAmountFromVoiceResultText(paiseText);

            if (rupees !== null && paise !== null && paise !== 0.0) {
                amt = parseFloat(`${parseInt(rupees)}.${parseInt(paise)}`);
            } else if (rupees !== null) {
                amt = Math.abs(rupees);
            } else if (paise !== null) {
                amt = parseFloat(`0.${parseInt(paise)}`);
            } else {
                return null;
            }

            if (amt !== null && textContainsAnyMatchWord("minus", amount)) {
                return -1 * amt;
            } else {
                return amt;
            }
        }
    }

    return null;
}

export function getAmountFromVoiceResultText(text) {
    console.log("CU getAmountFromVoiceResultText text =",text);
    if (text === null) {
        return null;
    }

    // const amountSuffix = CreateVoiceData.matchWords.get("amount_suffix");
    // console.log("CU Amount suffix = ",amountSuffix);
    // let finalAmount = text.toLowerCase();

    // for (const suffix of amountSuffix) {
    //     finalAmount = finalAmount.replace(new RegExp(suffix, 'g'), '');
    // }

    // finalAmount = finalAmount.replace(/,/g, '');
    // finalAmount = ViewParser.removeUnwantedPrefixAndSuffixChar(finalAmount);
    const amountSuffix = CreateVoiceData.matchWords.get("amount_suffix");
    let finalAmount = text.toLowerCase();

    for (const suffix of amountSuffix) {
        const regex = new RegExp(`\\b${suffix}\\b`, 'gi');
        finalAmount = finalAmount.replace(regex, "");
        // finalAmount = finalAmount.replace(suffix, "");
    }
    // const lumpsumWords = CreateVoiceData.matchWords.get("lumpsum");
    // //console.log("one shot lumpsum words", lumpsumWords);
    // for (const suffix of lumpsumWords) {
    //     //console.log("suffix", suffix);
    //     finalAmount = finalAmount.replace(suffix, "");
    // }
    // console.log("after filtered", finalAmount);
    finalAmount = finalAmount = finalAmount.replace(/,/g, "");
    finalAmount = ViewParser.removeUnwantedPrefixAndSuffixChar(finalAmount);
    finalAmount = finalAmount.replace("-", " ");

    const splitTextArr = finalAmount.split(' ');
    let found = false;
    let result = 0.0;
    let currentNum = 0.0;

    console.log("spiltArray length =",splitTextArr.length + splitTextArr[0]);

    // if(splitTextArr.length === 1 && (splitTextArr[0] === "crore" || splitTextArr[0] === "lakh" || splitTextArr[0] === "thousand" || splitTextArr[0] === "hundred" )){
    //     console.log("values is thousand")
    //     if(splitTextArr[0] === "thousand"){
    //         console.log("value formatted to 1000 ");
    //         result=1000.0;
    //         found=true;
    //     }else if(splitTextArr[0] === "crore"){
    //         console.log("value formatted to crore ");
    //         result=10000000.0;
    //         found=true;
    //     }else if(splitTextArr[0] === "lakh"){
    //         console.log("value formatted to lakh ");
    //         result=100000.0;
    //         found=true;
    //     }else if(splitTextArr[0] === "hundred"){
    //         console.log("value formatted to hundred ");
    //         result=100.0;
    //         found=true;
    //     }
    // }else{
    //     console.log("in----", splitTextArr[0], splitTextArr[1]);
    //     if(isNaN(splitTextArr[0]))splitTextArr[0] = englishNumberMatchWordsMap.get(splitTextArr[0]);
    //     console.log("arraya", splitTextArr[0], splitTextArr[1], finalAmount);
    //     finalAmount = splitTextArr[0] + " "+ splitTextArr[1];
    //     for (const splitText of splitTextArr) {
    //        // if(splitText)splitText = splitText.toLowerCase();
    //         if (!textContainsOnlySingleDigitsNumber(finalAmount)) {
    //             console.log("checking ",splitText)
    //             if (textContainsAnyMatchWord('crore', splitText)) {
    //                 result = result !== 0.0 ? result - currentNum + currentNum * 10000000 : currentNum * 10000000;
    //                 currentNum = 0.0;
    //             } else if (textContainsAnyMatchWord('lakh', splitText)) {
    //                 result = result !== 0.0 ? result - currentNum + currentNum * 100000 : currentNum * 100000;
    //                 currentNum = 0.0;
    //             } else if (textContainsAnyMatchWord('thousand', splitText)) {
    //                 result = result !== 0.0 ? result - currentNum + currentNum * 1000 : currentNum * 1000;
    //                 currentNum = 0.0;
    //             } else if (textContainsAnyMatchWord('hundred', splitText)) {
    //                 result = result !== 0.0 ? result - currentNum + currentNum * 100 : currentNum * 100;
    //                 currentNum = 0.0;
    //             } else {
    //                 console.log("amount is as :", splitText);
    //                 let amount = parseFloat(splitText);
    //                 console.log("inside this", amount);
    //                 if (isNaN(amount)) {
    //                     console.log("inside updated", amount);
    //                     amount = englishNumberMap[splitText] !== undefined
    //                         ? parseFloat(englishNumberMap[splitText])
    //                         : null;
    //                 }
    //                 console.log("amount 2", amount, result);
    //                 if (amount !== null) {
    //                     found = true;
    //                     if (result === 0.0 || result > Math.abs(amount)) {
    //                         result += Math.abs(amount);
    //                         currentNum = Math.abs(amount);
    //                     }
    //                 }
    //             }
    //         } else {
    //             const amount = parseFloat(splitText) || null;
    //             console.log("amount is as :",amount);
    //             if (amount !== null) {
    //                 found = true;
    //                 result = result * 10 + amount;
    //             }
    //         }
    //     }
    // }
    for (let splittext of splitTextArr) {
        if (!textContainsOnlySingleDigitsNumber(finalAmount)) {
            if (textContainsAnyMatchWord("crore", splittext.toLowerCase())) {
                result = result !== 0.0 ? result - currentNum + (currentNum * 10000000) : currentNum * 10000000;
                currentNum = 0.0;
            } else if (textContainsAnyMatchWord("lakh", splittext.toLowerCase())) {
                result = result !== 0.0 ? result - currentNum + (currentNum * 100000) : currentNum * 100000;
                currentNum = 0.0;
            } else if (textContainsAnyMatchWord("thousand", splittext.toLowerCase())) {
                console.log("thousand matches","thousand");
                result = result !== 0.0 ? result - currentNum + (currentNum * 1000) : currentNum * 1000;
                console.log("thousand matches",result);
                currentNum = 0.0;
            } else if (textContainsAnyMatchWord("hundred", splittext.toLowerCase())) {
                result = result !== 0.0 ? result - currentNum + (currentNum * 100) : currentNum * 100;
                currentNum = 0.0;
            } else {
                let amount = parseFloat(splittext.toLowerCase());
                if (isNaN(amount)) {
                    amount = parseFloat(englishNumberMap[splittext.toLowerCase()]);
                }
                if (!isNaN(amount)) {
                    found = true;
                    if (result === 0.0 || result > Math.abs(amount)) {
                        result += Math.abs(amount);
                        currentNum = Math.abs(amount);
                    } else if (result < Math.abs(amount) && isPerfectInteger(result) && isPerfectInteger(result)) {
                        const temp = result.toFixed(0) + Math.abs(amount).toFixed(0);
                        result = parseFloat(temp);
                        currentNum = result;
                    }
                }
            }
        } else {
            let amount = parseFloat(splittext.toLowerCase());
            if (isNaN(amount)) {
                amount = parseFloat(englishNumberMap[splittext.toLowerCase()]);
            }
            if (!isNaN(amount)) {
                found = true;
                result = result * 10 + amount;
            }
        }
    }
    
    console.log("1234", result);
    return found
        ? textContainsAnyMatchWord('minus', text)
            ? -1 * result
            : result
        : null;
}

function textContainsOnlySingleDigitsNumber(text) {
    const splitTextArr = text.split(' ');
    let found = false;
    //console.log("inside check====", text);
    for (const splitText of splitTextArr) {
        //if(splitText) splitText = splitText.toLowerCase();
        if (englishDigitMap.hasOwnProperty(splitText)) {
            found = true;
        } else {
            const num = parseFloat(splitText);

            if (num !== null && num >= 10) {
                return false;
            } else if (textContainsAnyMatchWord('crore', splitText)) {
                return false;
            } else if (textContainsAnyMatchWord('lakh', splitText)) {
                return false;
            } else if (textContainsAnyMatchWord('thousand', splitText)) {
                return false;
            } else if (textContainsAnyMatchWord('hundred', splitText)) {
                return false;
            }
        }
    }

    return found;
}

export function convertAmountIntoWords(textAmount, rupeesBeforeAmount = false) {
    try {
    const amount = getAmountFromText(textAmount);
    if (amount !== null) {
        console.log("inside amount");
        if (isPerfectInteger(amount)) {
            const rupees = parseInt(amount);
            // if (!rupeesBeforeAmount) {
            //     return `${convertIntToWords(rupees)} Rupees`;
            // } else {
            //     return `Rupees ${convertIntToWords(rupees)}`;
            // }
            if (rupees === 0) {
                if (!rupeesBeforeAmount) {
                    return `Zero Rupees`;
                } else {
                    return `Rupees ${convertIntToWords(rupees)}`;
                }
            } else {
                if (!rupeesBeforeAmount) {
                    return `${convertIntToWords(rupees)} Rupees`;
                } else {
                    return `Rupees ${convertIntToWords(rupees)}`;
                }
            }
        } else {
            const rupees = parseInt(amount);
            const paise = parseFloat(amount).toFixed(2).split(".")[1];
            if (!rupeesBeforeAmount) {
                return `${convertIntToWords(rupees)} Rupees ${convertIntToWords(paise)} Paise`;
            } else {
                return `Rupees ${convertIntToWords(rupees)} ${convertIntToWords(paise)} Paise`;
            }
        }
    } else {
        return null;
    }
   } catch (err) {
    console.log("exception occured while converting amount to words", err);
    return "";
   }
}

export function numberToWords(num) {
    const words = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen"];

    if (num < 1 || num > 16) {
        return "Number out of range";
    }

    return words[num - 1];
}

function getAmountFromText(text) {
    if (text === null) {
        return null;
    }

    let amount = "";
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (/\d|\-|\./.test(char)) {
            amount += char;
        }
    }

    return parseFloat(amount);
}

function isPerfectInteger(value) {
    return value % 1 === 0;
}

export function convertIntToWords(n) {
    n = Number(n);
    if (n < 0) {
        return "Minus " + convertIntToWords(-n);
    }

    // if (n == 0) {
    //     return "Zero ";
    // }

    if (n < 20) {
        return units[n];
    }

    if (n < 100) {
        return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " : "") + units[n % 10];
    }

    if (n < 1000) {
        return units[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " " : "") + convertIntToWords(n % 100);
    }

    if (n < 100000) {
        return convertIntToWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " : "") + convertIntToWords(n % 1000);
    }

    if (n < 10000000) {
        return convertIntToWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 !== 0 ? " " : "") + convertIntToWords(n % 100000);
    }

    return convertIntToWords(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 !== 0 ? " " : "") + convertIntToWords(n % 10000000);
}

export function getDigitTextInReadableForm (digitText) {
    let res = "";
    const finalDigitText = addSpaceBetweenChar(removeSpaceFromText(digitText));
    for (let i = 0; i < finalDigitText.length; i++) {
        const char = finalDigitText[i];
        if (char === "0") {
            res += "Zero";
        } else {
            res += char;
        }
    }
    return res;
}

function removeSpaceFromText (text) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char !== " ") {
            result += char;
        }
    }
    return result;
}

function addSpaceBetweenChar(text) {
    const finalText = removeSpaceFromText(text);
    let result = "";
    for (let i = 0; i < finalText.length; i++) {
        const char = finalText[i];
        result = `${result}${char} `;
    }
    return result.trim();
}

export function cleanTitleSpaces(names) {
    // Ensure the input is an array
    if (!Array.isArray(names)) {
        return names; // Return the input as-is if it's not an array
    }

    // Regular expression to match titles with extra spaces and clean them
    const regex = /^(Mr\.|Ms\.|Mrs\.|Miss\.)\s+/;

    // Map over each name in the array and clean up spaces
    return names.map(name => {
        // Check if the current element is a string
        if (typeof name !== 'string') {
            return name; // Return the input as-is if it's not a string
        }

        // Replace extra spaces after the title with a single space
        return name.replace(regex, (match, p1) => {
            // If the title is "Ms.", replace it with "Miss"
            const title = p1 === 'Ms.' ? 'Miss' : p1.replace('.', '');
            return `${title} `;
        });
    });
}



