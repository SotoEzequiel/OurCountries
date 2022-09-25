const { Router } = require('express');
const { Country, Activity } = require("../db")
const axios = require("axios");
const { Op } = require("sequelize");



const router = Router();


/////////////////////RUTAS////////////////
router.get("/", async (req, res, next) => {
    //traer los datos de la api
    //guardarlos en nuestra base de datos
    //devolver todos los paises que tenemos en nuestra base de datos


    
        let { name } = req.query;
        if (name) {
            try {
                let retornoB = await Country.findAll({
                    where: { name: { [Op.like]: `%${name.toLowerCase()}%` } },
                    include: { model: Activity }
                })
                retornoB.length ? res.status(200).send(retornoB) : res.status(400).send("no se encontro ese pais")
                
            } catch (error) {
                res.status(400).send("error al obtener el pais", error)
            }

        } else {
            try {
                
                let countries = await Country.findAll({ include: { model: Activity } })
                console.log("esto es conuntries", countries)
                if (!countries.length) {
                    let apidata = await axios.get("https://restcountries.com/v3/all")
                    let info = apidata.data.map(c => {
                        return {
                            id: c.cca3,
                            name: c.name.common.toLowerCase(),
                            img: c.flags ? c.flags[1] : "https://img.freepik.com/vector-gratis/ilustracion-mapa-mundo-banderas-todos-paises_37674-7.jpg?w=826",
                            continente: c.region,
                            capital: c.capital ? c.capital[0] : "not capital",
                            subregion: c.subregion ? c.subregion : c.region,
                            area: c.area,
                            poblacion: c.population,
                            car: c.car.side,
                            timezone: c.timezones[0],
                            maps: c.maps.googleMaps,
                        }
                    })
                    await Country.bulkCreate(info)
                    let retorno = await Country.findAll({ include: { model: Activity } })
                    return res.send(retorno)
                }else return res.send(countries)
            } catch (errorAllCountries) {
                res.status(400).send({errorAllCountries})
            }
        }


    // try {  
    //     let existe=await Country.findAll({
    //         include:{model:Activity}
    //        })
    //     if(!existe.length){
    //         let apidata=await axios.get("https://restcountries.com/v3/all")
    //         /////////////////////////
    //         let info=apidata.data.map(c=>{
    //                         return{
    //                             id:c.cca3,
    //                             name:c.name.common.toLowerCase(),
    //                             img:c.flags?c.flags[1]:"https://img.freepik.com/vector-gratis/ilustracion-mapa-mundo-banderas-todos-paises_37674-7.jpg?w=826",
    //                             continente:c.region,
    //                             capital:c.capital ? c.capital[0] : "not capital",
    //                             subregion:c.subregion?c.subregion:c.region,
    //                             area:c.area,
    //                             poblacion:c.population,
    //                             car:c.car.side,
    //                             timezone:c.timezones[0],
    //                             maps:c.maps.googleMaps,
    //                         }     
    //                 })

    //                 await Country.bulkCreate(info)



    //             }else{
    //                 let {name}=req.query;
    //                 if(name){

    //                     let retornoB=await Country.findAll({
    //                         where:{name:{[Op.like]:`%${name.toLowerCase()}%`}},
    //                         include:{model:Activity}
    //                     })
    //                     retornoB.length?res.status(200).send(retornoB): res.status(400).send("no se encontro ese pais")

    //                 }else{

    //                         res.status(200).send(existe)
    //                     }

    //             } 
    // } catch (error) {
    //     next(error)
    // }







})



router.get("/:id", async (req, res, next) => {
    let idRecibido = req.params.id
    try {
        let retorno = await Country.findByPk(idRecibido.toUpperCase(), { include: { model: Activity } })
        if (retorno) return res.send(retorno)
        else { return res.status(400).send("no existe un pais con ese id") }
    } catch (error) {
        res.send(error)
    }
})






module.exports = router;