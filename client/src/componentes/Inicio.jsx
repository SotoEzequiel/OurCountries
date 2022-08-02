import React from "react"
import {Link, Redirect} from "react-router-dom"
import stilos from  "../style/Inicio.module.css"
function Inicio(params) {
  
    return(
        <div className={stilos.fondo}>
            <h1 className={stilos.letra}>Countries</h1>
            <Link className={stilos.link} to="/home">
                <h1 className={stilos.link}>Start</h1>
            </Link>
        </div>
    )
}
export default Inicio;