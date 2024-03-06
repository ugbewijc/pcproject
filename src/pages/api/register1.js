// // Outputs: /builtwith.json

// import { open, close, readFileSync, writeFileSync } from "fs";
import fs from "fs";

// function closeFile(fileDescriptor) {
//   close(fileDescriptor, (err) => {
//     // if (err) throw err;
//     console.log(err)
//   });
// }

// async function readFile(filePath) {
//   console.log("reading file");
//   open(filePath, 'a+', (err, fd) => {
//     if (err) {
//       //create file if not found 
//       if (err.code === 'ENOENT') {
//         console.log("file does not exist");
//         try {
//           console.log(`creating ${filePath}`);
//           const jsonDataToWrite = {
//             name: 'John Doe',
//             age: 30,
//             city: 'Example City'
//           };
//           const jsonData = JSON.stringify(jsonDataToWrite, null, 2);
//           writeFileSync(filePath, jsonData, 'utf-8');
//           const fileDetails = readFileSync(filePath, 'utf-8');
//           // closeFile(fd)
//           console.log(`file data ${fileDetails}`);
//           // return fileDetails;  
//           return JSON.parse(fileDetails);
//           // return null;
//         } catch (err) {
//           // throw err;
//           console.log(err);
//         }
//       }
//       console.log(err)
//       // throw err;
//     }
//     try {

//       // const fileDetails = JSON.parse(readFileSync(filePath,'utf-8'));
//       const fileDetails = readFileSync(filePath, 'utf-8');
//       // closeFile(fd)
//       console.log(`file data ${fileDetails}`);
//       // return fileDetails;  
//       return JSON.parse(fileDetails);
//     } catch (error) {
//       // closeFile(fd);
//       console.log(error);
//     }

//     // else {
//     //   // closeFile(fd);
//     //   console.log(fd);
//     // }
//   });
//   // try {
//   //   const data = fs.readFileSync(filePath, 'utf8');
//   //   return JSON.parse(data);
//   // } catch (error) {
//   //   // console.error('Error reading JSON file:', error);
//   //   return null;
//   // }
// }


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
    const dataRead =  JSON.parse(data);
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
  const filePath = 'data/users.json';
  // return new Response(null, { status: 404 });

  // return new Response(
  //   JSON.stringify({
  //     status: 'success',
  //   }), {
  //   status: 200,
  // }
  // )
  // console.log(path.dirname(filePath));
  // const filePath = path.resolve("data","users.json");
  // const __dirname = path.resolve(path.dirname(''));
  // console.log(path.join(process.cwd(), 'data', 'users.json'));
  // console.log(process.cwd());
  // console.log(path.resolve("data","users.json"));

  // User JSON data
  const jsonDataToWrite = {
    username,
    email,
    phoneNumber,
    pwd
  };

  const jsonDataRead =  readJsonFromFile(filePath);
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
  }else if(valueExistsInArray(jsonDataRead, 'username', username) || valueExistsInArray(jsonDataRead, 'email', email)){
    return new Response(
      JSON.stringify({
        status: 'Failed',
        message: 'User exist'
      }), {
      status: 404,
    }
    ) 
  } else{
    console.log(jsonDataRead);
    
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