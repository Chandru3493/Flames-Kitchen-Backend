const express = require('express')
const {sequelize, Employee} = require('./models')
const app = express()
app.use(express.json())

app.post("/datas", async (req, res) => {
    const {id,username,email,role,salary} = req.body;
    try {
      const data = await Employee.create({id,username,email,role,salary})
      res.json(data.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

app.get("/datas", async (req, res) => {
    try {
      const data = await Employee.findAll()
      res.json(data.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

app.get("/datas/:username", async (req, res) => {
    const username=req.params.username
    try {
      const data = await Employee.findAll({
        where:{username:username,},
      })
      res.json(data.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  app.get("/data/:role", async (req, res) => {
    const role=req.params.role
    try {
      const data = await Employee.findAll({
        where:{role:role,},
      })
    res.json(data.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

app.put("/datas/:id", async (req,res) => {
  const { id } = req.params;
  const { description } = req.body;
    try {
      const data = await Employee.update(
        {salary: description,},
        {where: {id: id},}
      );
    res.json(data.rows);
    }catch (err) {
        console.error(err.message);
      }});

app.listen({port:5000}, async() => {
    console.log("server has started on port 5000");
    await sequelize.authenticate()
});

