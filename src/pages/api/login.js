import fs from "fs";
import points from "../../../data/points";
import readJsonFromFile from "../../utils/readFile";
import validateUser from "../../utils/validateUser";


export async function POST({ params, request }) {
    const sector = [];
    const formData = await request.formData();
    const username = formData.get("username") || null;
    const pwd = formData.get("pwd") || null;
    const pwdArray = JSON.parse(pwd);
    const filePath = 'data/users.json';

    // console.log(points);
    // console.log(pwdArray);

    for (const value of pwdArray) {
        // console.log(value);
        points.forEach((ele, index) => {
            if (((Number(value[0]) >= Number(ele[0])) && (Number(value[0]) <= Number(ele[1])))
                && ((Number(value[1]) >= Number(ele[2])) && (Number(value[1]) <= Number(ele[3])))) {
                sector.push(index);
                // console.log(index);
                // console.log(`${ele[2]} <= ${value[1]} >= ${ele[3]}`)
                // console.log(`${ele[0]} <= ${value[0]} >= ${ele[1]}`)
                // console.log(sector);
            }
        });
    }
    //check sectors length
    if (sector.length != 4) {
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

    const jsonDataRead = readJsonFromFile(filePath);
    // console.log(jsonDataRead);
    if (!jsonDataRead) {
        return new Response(
            JSON.stringify({
                status: 'Failed',
                message: 'User Does Not Exist'
            }), {
            status: 401,
        });
    } else if(validateUser(jsonDataRead, 'username', username, sector)) {
        return new Response(
            JSON.stringify({
                status: 'Success',
                message: 'Valid User'
            }), {
            status: 200,
        });
    } else{
        return new Response(
            JSON.stringify({
                status: 'Failed',
                message: 'User Does Not Exist'
            }), {
            status: 401,
        });
    }

    // const jsonDataRead =  readJsonFromFile(filePath);
    // if(valueExistsInArray(jsonDataRead, 'username', username)){
    //     return new Response(
    //         JSON.stringify({
    //           status: 'Success',
    //         }), {
    //         status: 200,
    //       }
    //       );
    // } else {
    //     return new Response(
    //         JSON.stringify({
    //           status: 'Failed',
    //           message: 'User Does Not Exist'
    //         }), {
    //         status: 404,
    //       }
    //       )
    // }
}