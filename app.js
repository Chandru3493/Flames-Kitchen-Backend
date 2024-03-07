
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Add JWT module
const bcrypt = require('bcrypt'); // Add bcrypt module

const { sequelize } = require('./db.js');

const hash=(pass)=>{
	return bcrypt.hash(pass,10);
}



const app = express();
const port = 4000;


const { Op } = require("sequelize");
const AnuragEmp = require("./models/employee_data.js");

const FinancialDay = require("./models/financial_day_data.js");
const Transaction = require("./models/transactions.js");
const Role = require("./models/role.js");
const Salary = require("./models/salary.js");
const MenuItem = require("./models/menu.js");
const OrderItem = require("./models/orderitem.js");
const Order = require("./models/order.js");
const Table = require("./models/table.js");

const menuItemController = require("./controllers/menuItemController");

AnuragEmp.belongsTo(Role, { targetKey: "roleid", foreignKey: "roleId" });
AnuragEmp.hasOne(Salary, { sourceKey: "id", foreignKey: "empid" });
Order.hasOne(AnuragEmp, { sourceKey: "waiter_id", foreignKey: "id" });
Order.hasMany(OrderItem, { sourceKey: "id", foreignKey: "order_id" });
Order.belongsTo(Table, { foreignKey: "table_id", targetKey: "id" });
MenuItem.hasOne(OrderItem, { sourceKey: "id", foreignKey: "menu_item_id" });
OrderItem.belongsTo(MenuItem, { targetKey: "id", foreignKey: "menu_item_id" });
OrderItem.hasOne(AnuragEmp, { sourceKey: "cook_id", foreignKey: "id" });

(async () => {
	await sequelize.sync({ logging: false, force: false });
	console.log("Tables synchronized successfully");

})();

app.use(express.json());
app.use(cors());
const router = express.Router();


app.get('/employee', async (req, res) => {
  console.log(req.query.name)
  
  const vals = await AnuragEmp.findAll({include:[Role,Salary],where: {name : req.query.name}})
  const menuItems = await OrderItem.findAll({
    include: [
      AnuragEmp // Include the Menu model // Specify the attributes you want to fetch, e.g., name
    ],
  });
 menuItems.forEach((item)=>{console.log(item.dataValues);});
  
  var x = []
  vals.forEach((item)=>{
    const v = item.dataValues.role.dataValues;
    const c = item.dataValues.salary.dataValues;
    
    x.push({...item.dataValues,role : v.rolename,salary: c.emp_salary})
  })
  
  res.send(x);
})

app.post('/addemployee',async(req,res)=>{
  
  const val = await AnuragEmp.findAll({where: {email_id: req.body.emailid}});
  
  if(val.length!=0){
    res.send("already exists");
  }else{
    
    const roletext = await Role.findAll({attributes:["rolename","roleid"],where: {"rolename": req.body.emprole}})
    console.log(roletext)
     const act = roletext[0].dataValues.roleid
     console.log(act)
    const hashed = await hash(req.body.password)
    console.log(hashed);
    const hal = await AnuragEmp.create({email_id: req.body.emailid,name: req.body.empname,roleId: act,password: hashed,address: req.body.empaddress});
   
    const q = await Salary.create({emp_salary: req.body.empsalary})
    res.send('ok');
  }
})



app.get("/datas", async (req, res) => {
  try {
    const data = await AnuragEmp.findAll({include:[Role,Salary],
      where:{deletedAt: null},order: [['roleId', 'ASC'],['name','ASC']]
    })
    const d = []
    data.forEach((item)=>{
      const v = item.dataValues.role.dataValues;
      const c = item.dataValues.salary.dataValues;
          d.push({...item.dataValues,salary: c.emp_salary,role : v.rolename});
    })
  
    res.json(d);

  } catch (err) {
    console.error(err.message);
  }
});

app.get("/prevdatas", async (req, res) => {
  try {
    const data = await AnuragEmp.findAll({include:[Role,Salary],
      where:{deletedAt: {[Op.not]:null}},
    })
    const d = []
    data.forEach((item)=>{
      const v = item.dataValues.role.dataValues;
      const c = item.dataValues.salary.dataValues;
          d.push({...item.dataValues,salary: c.emp_salary,role : v.rolename});
    })
  
    res.json(d);

  } catch (err) {
    console.error(err.message);
  }
});

app.get("/datas/:username", async (req, res) => {
  const username=req.params.username
  try {
    const data = await AnuragEmp.findAll({include:[Role,Salary],
      where:{name: username,deletedAt: null },order: [['roleId', 'ASC'],['name','ASC']],
    
      
    })
    const d = []
    data.forEach((item)=>{
      const v = item.dataValues.role.dataValues;
      const c = item.dataValues.salary.dataValues;
          d.push({...item.dataValues,salary: c.emp_salary,role : v.rolename});
    })
  
    res.json(d);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/data/:role", async (req, res) => {
  const role=req.params.role
  const roleid = await Role.findAll({where: {rolename: role}});
  const x =roleid[0].dataValues.roleid;
  try {
    const data = await AnuragEmp.findAll({ include:[Role,Salary],
      where:{roleId:x,deletedAt: null},order: [['name','ASC']]
    })
    var d = []
    data.forEach((item)=>{
      const v = item.dataValues.role.dataValues;
  const c = item.dataValues.salary.dataValues;
      d.push({...item.dataValues,salary: c.emp_salary,role : v.rolename});
    })
    console.log(d)
  res.json(d);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/restore/:id",async(req,res)=>{

  const {id}=req.params;

  const delsal=await Salary.update({deletedAt:null},{where:{empid:id,}});
  const delemp=await AnuragEmp.update({deletedAt:null},{where:{id:id,}});
  
  res.send("done");
})


app.put("/delemp/:id",async(req,res)=>{

const {id}=req.params;

const delsal=await Salary.update({deletedAt:new Date()},{where:{empid:id,}});
const delemp=await AnuragEmp.update({deletedAt:new Date()},{where:{id:id,}});

res.send("done");
})

app.put("/datas/:id", async (req,res) => {
const { id } = req.params;
const { name,email,address,role,salary } = req.body;

//
const exists = await AnuragEmp.findAll({where: {email_id:email,id:{[Op.ne]:id}}});
if (exists.length===0){
  if(role==="admin"){
    var ri=1;
  }else if(role==="waiter"){
    var ri=2;
  }else{
    var ri=3;
  }
//
  try {
    const data = await Salary.update(
      {emp_salary: Number(salary)},
      {where: {empid: id},}
    );
    const data1 = await AnuragEmp.update(
      {email_id:email,name:name,address:address,roleId:ri},
      {where: {id: id},}
    );

    const x =[];
    data.forEach((item)=>{
      x.push(item.dataValues);
    })
  res.json(exists);
  }catch (err) {
      console.error(err.message);
    }
  //
  }else{
    res.send(exists)
  }
  //
    });

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


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log(`Attempting login for email: ${email}`);

  // Find user by email
  const user = await AnuragEmp.findOne({
    where: {
      email_id: email,
      deletedAt: null // Condition to check if deletedAt is null
    },
    attributes: ['id', 'roleId', 'password','name'] // Include password in the returned user object
  });

  if (!user) {
    console.log(`Login failed for email: ${email}`);
    return res.status(401).json({ error: 'Invalid login' });
  }

  const { id, roleId, password: hashedPassword,name } = user; // Ensure correct assignment

  // Check if hashedPassword is null or undefined
  if (!hashedPassword) {
    console.log(`Login failed for email: ${email}`);
    return res.status(401).json({ error: 'Invalid login' });
  }

  // Compare hashed password with the provided password
  const passwordMatch = await bcrypt.compare(password, hashedPassword);

  if (!passwordMatch) {
    console.log(`Login failed for email: ${email}`);
    return res.status(401).json({ error: 'Invalid login' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: id, userRole: roleId,userName : name }, 'your_secret_key_here', { expiresIn: '1h' });

  console.log(`Login successful for email: ${email}, user ID: ${id}, roleId: ${roleId}`);

  // Send response with user details and token
  res.json({ message: 'Login successful', user_id: id, user_roleId: roleId, token });
});

// Handle PUT request to update orderitem status
app.put("/orderitems/:id", async (req, res) => {
	const { id } = req.params;
	const { status } = req.body;
	console.log("id: ", id, " status: ", status);
	try {
		// Find the OrderItem by ID
		const orderItem = await OrderItem.findByPk(id);
		console.log(orderItem.status);
		// console.log("snkldf");

		if (!orderItem) {
			return res.status(404).json({ error: "OrderItem not found" });
		}

		// Update the orderitem status column
		orderItem.status = status;
		await orderItem.save();

		// Respond with success message
		return res
			.status(200)
			.json({ message: "OrderItem status updated successfully" });
	} catch (error) {
		console.error("Error updating orderitem status:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
});

app.delete("/orderItems/:id", async (req, res) => {
	const { id } = req.params; // Extract the ID from the request parameters

	try {
		// Attempt to find the data by its ID and delete it
		const deletedData = await OrderItem.destroy({
			where: {
				id: id, // Filter based on the ID
			},
		});

		if (deletedData) {
			// If data was deleted successfully
			res.status(200).json({ message: "Data deleted successfully" });
		} else {
			// If no data was found with the provided ID
			res.status(404).json({ error: "Data not found" });
		}
	} catch (error) {
		// If an error occurred during the deletion process
		console.error("Error deleting data:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

app.get("/orderItems/:id", menuItemController.getMenuItemById);
app.get("/orderItems", menuItemController.getMenuItems);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});







module.exports = router;

