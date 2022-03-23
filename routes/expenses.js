const router = require("express").Router();
let expense = require("../models/expense");

// http://Localhost:8070/expense/add
router.route("/add").post((req,res)=>{

    const expensetype=req.body.expensetype;
    const date=req.body.date;
    const totalamount=Number(req.body.totalamount);
    const description=req.body.description; 

    const newexpense = new expense({

         
         expensetype,
         date,
         totalamount,
         description

    })
    newexpense.save().then(()=>{
        res.json("expense added")
    }).catch((err)=>{
        console.log(err);

    })

})
//fetch

http://Localhost:8070/expense
router.route("/").get((req,res)=>{

    expense.find().then((expenses)=>{
        res.json(expenses)
    }).catch((err)=>{
        console.log(err)
    })
})
//update

http://Localhost:8070/expense/update
//async function (runs simaltaneously)
//fetching userid 
router.route("/update/:id").put(async (req, res) => {
    let userid = req.params.id;
    const{ expensetype,date,totalamount,description} = req.body;

    const updateexpense = {
        expensetype,
        date,
        totalamount,
        description
    }
    //waiting till update is over
    const update = await expense.findByIdAndUpdate(userid,updateexpense).then(() => {
        res.status(200).send({status:"user updated"})
    }).catch((err)=>{
    res.status(500).send({status:"error with updating data" ,error: err.message});
  })
   
})
//delete

http://Localhost:8070/expense/delete
router.route("/delete/:id").delete(async(req,res)=>{
  let userid=req.params.id;
  await expense.findByIdAndDelete(userid).then(()=>{
      res.status(200).send({status:"user deleted"});
  }).catch((err)=>{
      console.log(err.message);
      res.status(500).send({status:"error with delete user", error:err.message});
  })
  
})

router.route("/get/:id").get(async (req,res) =>{
    let userid = req.params.id;
    await expense.findById(userid).then(()=>{
        res.status(200).send({status:"user fetched"})
        console.log(err.message);
        res.status(500).send({status:"error with get user",error: err.message});
    })
})



module.exports = router;
