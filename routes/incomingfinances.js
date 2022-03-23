const router = require("express").Router();
let incomingfinance = require("../models/incomingfinance");

// http://Localhost:8070/incomingfinance/add
router.route("/add").post((req,res)=>{

    const orderid=req.body.orderid;
    const ordertype=req.body.ordertype;
    const numberofunits=Number(req.body.numberofunits);
    const unitprice=Number(req.body.unitprice);
    const totalamount=Number(req.body.totalamount);

    const newincomefinance = new incomingfinance({

         
         orderid,
         ordertype,
         numberofunits,
         unitprice,
         totalamount

    })
    newincomefinance.save(),then(()=>{
        res.json("incomingfinance added")
    }).catch((err)=>{
        console.log(err);

    })

})
//fetch

//http://Localhost:8070/incomingfinance
router.route("/").get((req,res)=>{

    incomingfinance.find().then((incomingfinances)=>{
        res.json(incomingfinances)
    }).catch((err)=>{
        console.log(err)
    })
})
//update

//http://Localhost:8070/incomingfinance/update
//async function (runs simaltaneously)
//fetching userid 
router.route("/update/:id").put(async (req, res) => {
    let userid = req.params.id;
    const{ orderid,ordertype,numberofunits,unitprice,totalamount} = req.body;

    const updateincomingfinance = {
        orderid,
        ordertype,
        numberofunits,
        unitprice,
        totalamount
    }
    //waiting till update is over
    const update = await incomingfinance.findByIdAndUpdate(userid,updateincomingfinance).then(() => {
        res.status(200).send({status:"user updated"})
    }).catch((err)=>{
    res.status(500).send({status:"error with updating data" ,error: err.message});
  })
   
})
//delete

//http://Localhost:8070/incomingfinance/delete
router.route("/delete/:id").delete(async(req,res)=>{
  let userid=req.params.id;
  await incomingfinance.findByIdAndDelete(userid).then(()=>{
      res.status(200).send({status:"user deleted"});
  }).catch((err)=>{
      console.log(err.message);
      res.status(500).send({status:"error with delete user", error:err.message});
  })
  
})

router.route("/get/:id").get(async (req,res) =>{
    let userid = req.params.id;
    await incomingfinance.findById(userid).then(()=>{
        res.status(200).send({status:"user fetched"})
        console.log(err.message);
        res.status(500).send({status:"error with get user",error: err.message});
    })
})



module.exports = router;
