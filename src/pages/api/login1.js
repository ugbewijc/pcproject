import fs from "fs";


// Function to read JSON data from a file
function readJsonFromFile(filePath) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const dataRead =  JSON.parse(data);
      return dataRead;
    } catch (error) {
      return null;
    }
  }

  function valueExistsInArray(array, key, value) {
    return array.some(obj => Object.values(obj).includes(value) && obj[key] === value);
  }

  
export async function POST({ params, request }) {
    const formData = await request.formData();
    const username = formData.get("username") || null;
    const pwd = formData.get("pwd") || null;
    const filePath = 'data/users.json';

    const jsonDataRead =  readJsonFromFile(filePath);
    if(valueExistsInArray(jsonDataRead, 'username', username)){
        return new Response(
            JSON.stringify({
              status: 'Success',
            }), {
            status: 200,
          }
          );
    } else {
        return new Response(
            JSON.stringify({
              status: 'Failed',
              message: 'User Does Not Exist'
            }), {
            status: 404,
          }
          )
    }
}