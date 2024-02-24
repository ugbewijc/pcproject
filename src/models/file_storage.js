/**
 * 
 */
import fs from 'fs';
// import {ap} from 'fs'

export default class FileStorage{
    constructor(){}

    // Users
    static async addUsers(){
        fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
    }
}