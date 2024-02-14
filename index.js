const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;
const pool = require('./db');




app.use(express.json())
app.use(cors())

app.get('/employee', async (req, res) => {
  
  const vals = await pool.query('SELECT * from employee_data where name = $1',[req.query.name]
   
)

  res.send(vals.rows);
})

app.post('/addemployee',async(req,res)=>{
  
  const val = await pool.query('SELECT * from employee_data where empid= $1',[req.body.empid]);
  if(val.rows.length!=0){
    res.send("already exists");
  }else{
    const hal = await pool.query('Insert into employee_data (name,salary,address,empid,role) values ($1,$2,$3,$4,$5)',[req.body.empname,req.body.empsalary,req.body.empaddress,req.body.empid,req.body.emprole]);
   
    res.send('ok');
  }
})

app.get('/day', async (req,res)=>{
  const resu = await pool.query ('select * from financial_day_data where date=$1',[req.query.datestamp]);
  var rows= resu.rows[0];
  const row1 =rows;
  
  
  
  const res2 = await pool.query ('select * from transactions where date=$1',[req.query.datestamp]);
  const rows2= res2.rows;
  const send = {...rows,transactions: rows2}
  if(resu.rows.length==0 && rows2.length===0){
    res.send("No data for this date found");
  }else{
 
  res.send(send);}

    
})

app.listen(port, () => {
  console.log(`Running`);
});