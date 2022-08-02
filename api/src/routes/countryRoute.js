const { Router } = require('express');
const {Country,Activity}=require("../db")
const axios =require("axios");
const { Op } = require("sequelize");



const router = Router();


/////////////////////RUTAS////////////////
router.get("/", async(req,res,next)=>{
    //traer los datos de la api
    //guardarlos en nuestra base de datos
    //devolver todos los paises que tenemos en nuestra base de datos
    try {
        
        let existe=await Country.findAll({
            include:{model:Activity}
           })
        if(!existe.length){
        
            
            let apidata=await axios.get("https://restcountries.com/v3/all")
            /////////////////////////
            let info=apidata.data.map(c=>{
                            return{
                                id:c.cca3,
                                name:c.name.common.toLowerCase(),
                                img:c.flags?c.flags[1]:"https://img.freepik.com/vector-gratis/ilustracion-mapa-mundo-banderas-todos-paises_37674-7.jpg?w=826",
                                continente:c.region,
                                capital:c.capital ? c.capital[0] : "not capital",
                                subregion:c.subregion?c.subregion:c.region,
                                area:c.area,
                                poblacion:c.population
                            }     
                    })
                         
                    await Country.bulkCreate(info)

                    
                    
                }else{
                    let {name}=req.query;
                    if(name){
                        
                        let retornoB=await Country.findAll({
                            where:{name:{[Op.like]:`%${name.toLowerCase()}%`}},
                            include:{model:Activity}
                        })
                        retornoB.length?res.status(200).send(retornoB): res.status(400).send("no se encontro ese pais")
                         
                    }else{
                        
                            res.status(200).send(existe)
                        }
    
                } 
    } catch (error) {
        next(error)
    }
            
        

        
                    


    // let api=axios.get("https://restcountries.com/v3/all");
    // Promise.resolve(api)
    // .then(e=>{
    //      let datos=e.data.map(c=>{
    //         if(c.capital && c.flags&&c.cca3){
    //             return{
    //                 id:c.cca3,
    //                 name:c.name.common,
    //                 img:c.flags[1],
    //                 continente:c.region,
    //                 capital:c.capital[0],
    //                 subregion:c.subregion,
    //                 area:c.area,
    //                 poblacion:c.population
    //             }
    //         }
    //     })
    //     let array=[];
    //         for (let i = 0; i < datos.length; i++) {
    //             if (datos[i]!==undefined) {
    //                 array.push(datos[i])
    //             }
                
    //         }
        


    //     let loco=Country.bulkCreate(array);
    //     Promise.resolve(loco)
    //     .then(e=>{
    //         let retorno=Country.findAll({
    //             include:{model:Activity}
    //         })

    //         Promise.resolve(retorno)
    //         .then(e=>res.send(e))
    //     }).catch()
        

    // })
    
    
})



router.get("/:id",async (req,res,next)=> {
    let idRecibido=req.params.id
    try {
        let retorno=await Country.findByPk(idRecibido.toUpperCase(),{include:{model:Activity}})
        if(retorno) return res.send(retorno)
        else{return res.status(400).send("no existe un pais con ese id")}
    } catch (error){
        res.send(error)
    }
})






module.exports = router;