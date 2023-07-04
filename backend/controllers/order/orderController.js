class orderController{
    place_order = async(req,res)=>{
        console.log(req.body)
    }
}

module.exports = new orderController()