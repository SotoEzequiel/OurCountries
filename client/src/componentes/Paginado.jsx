import React from "react";
import estilos from "../style/paginado.module.css"


export default function Paginado({paginado,allCountries}) {
    
    let pageNumber=[]

    for (let i = 0; i < allCountries/10; i++) {
        pageNumber.push(i+1)
    }
    return(
        <nav className={estilos.nav}>
                {pageNumber &&
                pageNumber.map((n)=>(
                    <div className={estilos.paginas} key={n}>
                        <a className={estilos.pagina} onClick={()=>paginado(n)}>{n}</a>
                    </div>
                ))}
            
        </nav>
    )

}