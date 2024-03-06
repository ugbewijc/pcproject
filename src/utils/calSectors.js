/**
 * 
 */
import points from "../../data/points";

const calSectors = (passpoints) =>{
    const sector = [];
        
    for (const value of passpoints) {
        // console.log(value);
        points.forEach((ele, index) => {
            if(((Number(value[0]) >= Number(ele[0])) && (Number(value[0]) <= Number(ele[1])))
            && ((Number(value[1]) >= Number(ele[2])) && (Number(value[1]) <= Number(ele[3])))){
                sector.push(index);
                // console.log(index);
            }
         });
    }
    return sector;
};

export default calSectors