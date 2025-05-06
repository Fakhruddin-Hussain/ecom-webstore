const express =require('express');
const router = express.Router();
const Product= require('../models/Product');

// create product

router.post('/', async(req, res)=>{
    try{
        const product =new Product(req.body);
        await product.save();
        res.status(201).json(product);
    }catch(err){
        res.status(400).json({error:err.message});
    }
});

router.get('/', async(req,res)=>{
    const products = await Product.find();
    res.json(products)
});

router.get('/:product_id', async (req, res) => {
    try {
      const product = await Product.findOne({ product_id: req.params.product_id });
      if (!product) return res.status(404).json({ error: 'Product not found' });
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

router.put('/:id',async(req,res)=>{
    try{
        const update= await Product.findOneAndUpdate({product_id:req.params.id}, req.body,{new:true});
        res.json(update);
    }catch(err){
        res.json({error:err.message})
    }
})

router.delete('/:id', async(req,res)=>{
     await Product.findOneAndDelete({product_id:req.params.id});
     res.json({message: 'Product Deleted'});
})

module.exports=router;