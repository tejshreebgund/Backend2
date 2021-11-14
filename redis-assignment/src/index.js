const path = require('path')
const express = require("express");
const productController=require("./controllers/product.controller");

const app = express();
app.use(express.json())

app.use(express.urlencoded({extended:false}))
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')
app.use("/products",productController)


module.exports=app;






// router.get("",(req,res)=>{
//     const page = +req.query.page || 1;
//     const size = +req.query.size || 5;
//     const offset = (page-1)*size;
 
//     redis.get("product_items",async function(err,productitems){
      
        
//         if(err) console.log(err)
//         if(productitems) return res.status(201).send({items:JSON.parse(productitems)});

//     const products_page = await Product.find().skip(offset).limit(size).lean().exec();
//     const totalusercount= await Product.find().countDocuments();
//     const totalpages=Math.ceil(totalusercount / size)

//     console.log(totalpages)

//     redis.set("product_items",JSON.stringify(products_page))

//     return res.status(200).send({items:products_page,totalPages:totalpages})
// })
// })



// router.post("",async function(req,res){
//     const products = await Product.create(req.body);
//     redis.set(`products.${products._id}`,JSON.stringify(products))
//     const products_page = await Product.find().lean().exec();
//     redis.set("product_items",JSON.stringify(products_page));
//     return res.status(201).send(products_page)
// })

