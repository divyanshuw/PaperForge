import { color } from "motion";


export default function ColoredLine({color}:{color:string}){
    return (
        <hr style={{color: color, backgroundColor: color,height:0.5,width:"100%"}}>
        </hr>
    )
}