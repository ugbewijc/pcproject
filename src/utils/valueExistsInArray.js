
// Function to check if a value exists in an object within the array
const  valueExistsInArray = (array, key, value) => {
    return array.some(obj => Object.values(obj).includes(value) && obj[key] === value);
};

export default valueExistsInArray;


