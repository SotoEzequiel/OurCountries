import React from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import estilos from "../style/Details.module.css"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { GetCountries } from "../redux/actions"


export function Details({id}){
    

    let stateRedux=useSelector(e=>e)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(GetCountries())
        
    },[])

    
    const history=useHistory()
    return(
        <>
            {stateRedux.allCountry?stateRedux.allCountry.map(e=>{
                if (e.id==id) {
                    return(
                        <div className={estilos.todo}>
                            <button onClick={()=>history.push('/home')} className={estilos.volver}>Volver</button>
                            <div className={estilos.pais}>
                                <img className={estilos.img}  src={e.img} alt={"imagen de "+e.name}/>
                                <h1 className={estilos.name}>{e.name}</h1>
                                <h2 className={estilos.datos}>Capital: {e.capital}</h2>
                                <h3 className={estilos.datos}>Continent: {e.continente}</h3>
                                <p className={estilos.datos}>Subregion: {e.subregion}</p>
                                <p className={estilos.datos}>Area: {e.area}km²</p>
                                <p className={estilos.datos}>Population: {e.poblacion}</p>
                            </div>
                            <div>
                                {e.activities.length?
                                <div className={estilos.actividades}>
                                    <h1 className={estilos.ATitulo}>Activities</h1>
                                    {e.activities.map(a=>{
                                        return(
                                                <div className={estilos.datosActividades}>
                                                    <p className={estilos.p}>Name: {a.name}</p>
                                                    <p className={estilos.p}>Season: {a.temporada}</p>
                                                    <p className={estilos.p}>Difficulty level: {a.dificultad==1&&"(1) very easy" } {a.dificultad==2&&"(2) easy"}{a.dificultad==3&&"(3) normal"}{a.dificultad==4&&"(4) hard"}{a.dificultad==5&&"(5) very hard"}</p>
                                                    <p className={estilos.p}>Duration: {a.duracion}:00 hours</p>
                                                </div>
                                        )
                                    })}
                                </div>
                                :<div></div>}
                            </div>

                        </div>
                    )
                }
            }):<h1>Cargando...</h1>
            }
        </>
    )


   
}