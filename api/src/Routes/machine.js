const { Router } = require("express")
const {postMachine,getMachine,putMachine,deleteMachine} = require("../controllers/machineControllers")
const {isAuthenticated}= require('../Helpers/auth')

const routerMachine= Router();

routerMachine.post("/machine",postMachine);
routerMachine.get("/machine",getMachine);
routerMachine.put("/machine/:id",isAuthenticated,putMachine);
routerMachine.delete("/machine/:id",deleteMachine);

module.exports = routerMachine