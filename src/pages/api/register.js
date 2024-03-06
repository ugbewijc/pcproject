import fs from "fs";
import calSectors from "../../utils/calSectors";

// Function to write JSON data to a file
function writeJsonToFile(data, filePath) {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData);
    console.log('Data written to file successfully.');
  } catch (error) {
    console.error('Error writing to file:', error);
  }
}

// Function to read JSON data from a file
function readJsonFromFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const dataRead = JSON.parse(data);
    return dataRead;
  } catch (error) {
    // console.error('Error reading from file:', error);
    return null;
  }
}

// Function to check if a value exists in an object within the array
function valueExistsInArray(array, key, value) {
  return array.some(obj => Object.values(obj).includes(value) && obj[key] === value);
}

export async function POST({ params, request }) {
  const formData = await request.formData();
  const username = formData.get("username") || null;
  const email = formData.get("email") || null;
  const phoneNumber = formData.get("phone") || null;
  const pwd = formData.get("pwd") || null;
  const pwdArray = JSON.parse(pwd);
  const filePath = 'data/users.json';

  const sectors = calSectors(pwdArray);

  //check sectors length
  if (sectors.length != 4) {
    // console.log("Invalid Detailss")
    return new Response(
      JSON.stringify({
        status: 'Failed',
        message: 'Invalid Details'
      }), {
      status: 401,
    }
    )
  }
  // User JSON data
  const jsonDataToWrite = {
    username,
    email,
    phoneNumber,
    pwd,
    sectors
  };

  const jsonDataRead = readJsonFromFile(filePath);
  if (!jsonDataRead) {
    // Write JSON data to the file
    writeJsonToFile([jsonDataToWrite], filePath);
    return new Response(
      JSON.stringify({
        status: 'success',
      }), {
      status: 201,
    }
    )
  } else if (valueExistsInArray(jsonDataRead, 'username', username) || valueExistsInArray(jsonDataRead, 'email', email)) {
    return new Response(
      JSON.stringify({
        status: 'Failed',
        message: 'User exist'
      }), {
      status: 401,
    }
    )
  } else {
    // console.log(jsonDataRead);

    const newData = [...jsonDataRead];
    newData.push(jsonDataToWrite);
    writeJsonToFile(newData, filePath);
    return new Response(
      JSON.stringify({
        status: 'success',
      }), {
      status: 201,
    }
    )
  }
}