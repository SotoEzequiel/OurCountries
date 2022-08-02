
const session = require('supertest-session');
const app = require('../../src/app.js');
const agent = session(app);


 
describe("/country",() => {
  
  
  it("/country deberia retornar un status 200 y un array de 250 objetos", async()=> {
    
    await await agent.get("/country/").expect(200)
    
    let retorno= await  agent.get("/country")
    
    expect(retorno.body).toHaveLength(250)
  
  })
  
  it("deberia retornar un status 200 si le pasamos un id valido",async()=>{
    
    return  await agent.get("/country/arg").expect(200)
  
  })
  
  it("deberia retornar un status 400 si no le pasamos un id valido", async()=>{
    return await agent.get("/country/dsdsd").expect(400)
  
  })
  
  it("deberia retornar un status 200 si le pasamos un name valido por query",async()=>{
    return await agent.get("/country?name=argentina").expect(200)
  
  })
  
  
  it("deberia retornar un status 400 si le pasamos un name no valido",async()=>{
    
    
    return await agent.get("/country?name=asdsa").expect(400)
  
  
  })
  
 })
 
 
 describe("/activity",()=>{
  
  
  it("responde con un error si no se le envian los datos correctamente",async()=>{
    
    
    await agent.post("/activity",{datos:"incorrectos"}).expect(400)
   
  })
 })

