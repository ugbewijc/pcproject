/**
 * 
 * @param {Array} array 
 * @param {String} key 
 * @param {String} value 
 * @param {Array} sector 
 * @returns 
 */

const validateUser =(array, key, value, sector) =>{
    return array.some((obj) => {
        if(Object.values(obj).includes(value) && obj[key] === value){
            // console.log(obj['sectors'].sort());
            // console.log(sector.sort());
            const sortSector = sector.sort();
            return (obj['sectors'].length === sector.length 
            && obj['sectors'].sort().every((element, index) => element === sortSector[index]));
        }
    });
}

export default validateUser;