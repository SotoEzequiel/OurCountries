const { Router } = require('express');
const {Country,Activity}=require("../db")



const router = Router();




router.post("/",async (req,res,next)=>{

    try {
        const{name,dificultad,duracion,temporada,paisID}=req.body
        let array=[]
        for (let i = 0; i < paisID.length; i++) {
            let e=await Country.findByPk(paisID[i])
            array.push(e)
        }
        let actividadCreada=await Activity.create({name,dificultad,duracion,temporada})

        for (let i = 0; i < array.length; i++) {
            await array[i].addActivities(actividadCreada.id)
            
        }
        let retorno=await Activity.findAll({
            include:{model:Country}
        })
        res.status(200).send(retorno)
    } catch (error) {
        res.status(400).send("los datos no se enviaron correctamente")
    }
})



module.exports = router;