const express = require("express");
const router = express.Router();
router.use(express.json());


router.post("/foodData", (req, res)=> {
    try{
        res.send([global.food_items, global.food_category]);
        
        

    }catch(e){
        res.status(500).json({
            message: e.message
        })

    }
})

module.exports = router;





