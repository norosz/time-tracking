/**
 * Check if the keyboard key is numeric and returns a boolean
 * @param key
 * @returns {boolean}
 */
const isNumeric = (key) =>{
    return key in {"0":0,"1":1, "2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9};
}


export default isNumeric;