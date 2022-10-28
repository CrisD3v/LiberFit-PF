const { Sequelize } =require('sequelize')
const path =require('path')
const fs = require("fs");
const Rutine = require('./Models/Rutine');
require('dotenv').config();

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env
const sequelize =  new Sequelize(
	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/gym`,
	{
	  logging: false, }
)
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/Models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/Models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Traemos los modelos:
const { 
  Clients, 
  Employees, 
  Exercises, 
  Gyms, 
  Locacions, 
  Machines, 
  Owners, 
  Products, 
  Rols, 
  Rutines, 
  Subscriptions, 
  Trainings,
  Payments } = sequelize.models;

// Declaramos las relaciones:
Gyms.hasMany(Owners)
Owners.belongsTo(Gyms)

Locacions.belongsTo(Gyms)
Gyms.hasMany(Locacions)

Locacions.hasMany(Machines)
Machines.belongsTo(Locacions)

Locacions.belongsToMany(Products, { through: 'LocacionsProducts' })
Products.belongsToMany(Locacions, { through: 'LocacionsProducts' })

Locacions.belongsToMany(Trainings, { through: 'LocacionsTrainings' })
Trainings.belongsToMany(Locacions, { through: 'LocacionsTrainings' })

Locacions.belongsToMany(Clients, { through: 'LocacionsClients' })
Clients.belongsToMany(Locacions, { through: 'LocacionsClients' })

Locacions.belongsToMany(Employees, { through: 'LocacionsEmployees' })
Employees.belongsToMany(Locacions, { through: 'LocacionsEmployees' })

Locacions.belongsToMany(Subscriptions, { through: 'LocacionsSubscription' })
Subscriptions.belongsToMany(Locacions, { through: 'LocacionsSubscription' })

Trainings.belongsToMany(Rutines, { through: 'TrainingsRutines' })
Rutines.belongsToMany(Trainings, { through: 'TrainingsRutines' })

Clients.belongsToMany(Employees, { through: 'ClientsEmployees' })
Employees.belongsToMany(Clients, { through: 'ClientsEmployees' })

Clients.hasMany(Payments)
Payments.belongsTo(Clients)

Clients.belongsTo(Subscriptions)
Subscriptions.hasMany(Clients)

Clients.hasMany(Rutines)
Rutines.belongsTo(Clients)

Rutines.belongsToMany(Exercises, { through: 'RutinesExercises' })
Exercises.belongsToMany(Rutines, { through: 'RutinesExercises' })

Employees.hasMany(Rutines)
Rutines.belongsTo(Employees)

Employees.belongsToMany(Rols, { through: 'EmployeesRols' })
Rols.belongsToMany(Employees, { through: 'EmployeesRols' })












module.exports= {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};

	 
