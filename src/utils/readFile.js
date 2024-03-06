import fs from "fs";

// Function to read JSON data from a file
const  readJsonFromFile = (filePath) => {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const dataRead = JSON.parse(data);
      return dataRead;
    } catch (error) {
      return null;
    }
  }

  export default readJsonFromFile;