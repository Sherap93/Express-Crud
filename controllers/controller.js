// Seller is the model imported from models folder
// on this Seller model we will be applying all the functions/methods
const Seller = require('../models/users')


const homeFun = (req, res) => {
    res.send('this is home page')
}

const sellerCreate = async (req, res) => {
    // req.body coming from clientside and it has all the properties for creating a user

    const userData = await Seller.create(req.body) // this method will create an entry in DB 
    return res.json({msg : 'successfully created!!'})
    
}


const allSellers = async (req, res) => {
    const allSellerData = await Seller.find({}) // fetcfes all the data from DB
    return res.json({msg : 'all data fetched', allData : allSellerData})
}


const getOneSeller = async (req, res) => {
    try{
        const singleUser = await Seller.findById(req.params.id)
        return res.json({data : singleUser})
    }
    catch(err){
        console.log(err);
        return res.status(404).json({msg : 'User with this Id does not exist'})
    }
}


const updateSeller = async (req, res) => {
    // implement TRY CATCH For ID

    //findByIdAndUpdate(id, newData)
    // on line 41 data is updated
    const updatedSeller = await Seller.findByIdAndUpdate(req.params.userId, req.body)
    return res.status(202).json({msg : 'successfully updated!!'})
    
}



const deleteUser = async (req, res) => {
    //please put try catch

    const delU = await Seller.findByIdAndRemove(req.params.id)
    return res.json({msg : 'successfully deleted!!'})

}



module.exports = {homeFun, sellerCreate, allSellers, getOneSeller, updateSeller, deleteUser}    

