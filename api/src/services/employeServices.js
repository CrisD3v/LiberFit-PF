const { Employees } = require('../db')
const bcrypt= require("bcrypt")
const {Op}= require("sequelize");
const crearEmpleado = async (
    name,
    email,
    phone,
    password,
    account,
    image
) => {
  await Employees.create({
    name,
    email,
    phone,
    password,
    account,
    image,
  })

}

const buscarEmpleadoTotal= async ()=>{
  
  const Employee= await Employees.findAll();
  console.log(Employee);
  return Employee
}

const buscarEmpleadoPorNameAndCorreo= async(name,email)=>{
  const Employee= await Employees.findAll({
    where:{[Op.and]:[
      {name:name},
      {email:email}
    ]}
  });
  return Employee
}


const buscarEmpleadoPorName= async(name)=>{
  const Employee= await Employees.findAll({
    where:{name:name}
  });
  return Employee
}

const buscaEmail= async(email)=>{
  const Employee= await Employees.findAll({
    where:{email:email}
  })
  return Employee
}

const ModificarEmpleado=async(DatoEmple)=>{

  const encontrarUsuario= await Employees.findByPk(DatoEmple.id)
  if(encontrarUsuario){
    
    const passwordEncript= await bcrypt.hash(DatoEmple.password,15)
    await Employees.update({
      name:DatoEmple.name,
      email:DatoEmple.email,
      phone:DatoEmple.phone,
      password:passwordEncript,
      
      image:DatoEmple.image,
    },{
      where:{
        id:DatoEmple.id
      }
    })
    return true;
  }else{
    return false
  }
 

 
}

const datoEliminado=async(id)=>{

  const datoElimar =  await Employees.destroy({ where: { id: id } }) ? true:false;

  return datoElimar
}

const inactivarCuenta=async(id)=>{

  await Employees.update({
    account:false,
  },{
    where:{
      id:id
    }
  })

  return "La cuenta se desactivo correctamente"
}

const activarCuenta=async(id)=>{

 Employees.update({
    account:true,
  },{
    where:{
      id:id
    }
  })

  return "La cuenta se activo correctamente"
}


module.exports = {crearEmpleado,buscarEmpleadoTotal,buscarEmpleadoPorNameAndCorreo,buscarEmpleadoPorName,buscaEmail,ModificarEmpleado,datoEliminado,inactivarCuenta,activarCuenta}