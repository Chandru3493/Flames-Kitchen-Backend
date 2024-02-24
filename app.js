const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;
const {sequelize,pool} = require('./db.js');
const Employee = require('./models/employee_data.js');
const Login = require('./models/login.js');
const FinancialDay =require('./models/financial_day_data.js');
const Transaction = require('./models/transactions.js');
const Role =  require('./models/role.js')
const Salary = require('./models/salary.js');
// const {Employee,Login,FinancialDay,Transaction} = require('./models/index.js')
const bcrypt = require('bcrypt');
(async () => {
  await sequelize.sync({logging:false,force:false}); // Use `{ force: true }` with caution, as it drops existing tables
  console.log('Tables synchronized successfully');
})()

app.use(express.json())
app.use(cors())

const hash= async(password)=>{
  const salt =10
  const hash = await bcrypt.hash(password,salt)
  return hash
}

app.get('/employee', async (req, res) => {
  console.log(req.query.name)
  
  const vals = await Employee.findAll({include:[Role,Salary],where: {name : req.query.name}})
 
  var x = []
  vals.forEach((item)=>{
    const v = item.dataValues.role.dataValues;
    const c = item.dataValues.salary.dataValues;
    
    x.push({...item.dataValues,role : v.rolename,salary: c.emp_salary})
  })
  
  res.send(x);
})

app.post('/addemployee',async(req,res)=>{
  
  const val = await Employee.findAll({where: {email_id: req.body.emailid}});

  
  if(val.length!=0){
    res.send("already exists");
  }else{
    
    const roletext = await Role.findAll({attributes:["rolename","roleid"],where: {"rolename": req.body.emprole}})
    console.log(roletext)
     const act = roletext[0].dataValues.roleid
     console.log(act)
    const hashed = await hash(req.body.password)
    console.log(hashed);
    const hal = await Employee.create({email_id: req.body.emailid,name: req.body.empname,roleId: act,password: hashed,address: req.body.empaddress});
    const x = await Login.create({email_id: req.body.emailid,roleId: act,password: hashed})
    const q = await Salary.create({emp_salary: req.body.empsalary})
    res.send('ok');
  }
})

app.get('/day', async (req,res)=>{
  const resu = await  FinancialDay.findAll({where:{date: req.query.datestamp}});
  if(resu.length==0){
    res.send("No data for this date found")
  }else{
  
  var rows= resu[0].dataValues;
  const row1 =rows;
  
  
  
  
  const res2 = await Transaction.findAll({where:{date:req.query.datestamp}});
  const rows2= [];
  res2.forEach((item)=>{
    rows2.push(item.dataValues);
  })
  console.log(rows2)
  const send = {...rows,transactions: rows2}
  if(resu.length==0 && rows2.length===0){
    res.send("No data for this date found");
  }else{
  console.log(send);
  res.send(send);}

  }
})

app.listen(port, () => {
  console.log(`Running`);
});

