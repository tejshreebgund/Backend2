const express = require("express");

const router = express.Router();

const redis=require("../configs/redis")

const Product = require("../models/product.model");

router.get("",(req,res)=>{

  const page= +req.query.page || 1
  const size= +req.query.size || 4;

  const offset=(page-1)*size

  redis.get(`products.${page}.${size}`,async(err,productitems)=>{
    if(err) console.log(err)

    if(productitems) return res.status(201).send(JSON.parse(productitems))

    const products=await Product.find().skip(offset).limit(size).lean().exec();

    const totalpage=await Product.find().countDocuments();
    const totalpages=Math.ceil(totalpage/size)


    redis.set("products",JSON.stringify(products))

    return res.status(200).send({products,totalPages:totalpages});


  });
})

router.post("",async(req,res)=>{
  const product = await Product.create(req.body);

  redis.set(`product.${product._id}`,JSON.stringify(product))

  const products=await Product.find().lean().exec();

  redis.set("products",JSON.stringify(products))

  return res.status(201).send(products)



})

router.get("/:id",(req,res)=>{
  redis.get(`products.${req.params.id}`,async(err,productitems)=>{
    if(err) console.log(err)

if(productitems) return res.status(201).send(JSON.parse(productitems))

const products=await Product.findById(req.params.id).lean().exec();

redis.set(`products.${req.params.id}`,JSON.stringify(products))

return res.status(201).send(products)

  })
})

router.patch("/:id",async(req,res)=>{
  const product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})

  redis.set(`products.${req.params.id}`,JSON.stringify(product));

  const products=await Product.find().lean().exec();

  redis.set("products",JSON.stringify(products));

  return res.status(201).send(product)


})

router.delete("/:id",async(req,res)=>{
  const product=await Product.findByIdAndDelete(req.params.id)

  redis.del(`product.${req.params.id}`);

  const products=await Product.find().lean().exec();

  redis.set("products",JSON.stringify(products));

  return res.status(201).send(product)


})



module.exports = router;
