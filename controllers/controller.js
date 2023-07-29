// Seller is the model imported from models folder
// on this Seller model we will be applying all the functions/methods
const Seller = require('../models/users')
const bcrypt = require('bcrypt')


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


const signupSeller = async (req, res) => {
    // email is unique or not
    // if the email is not found then it will raise an error

        // we must use findOne method
        const sellerObj = await Seller.findOne({email : req.body.email}) //err
        // if it returns True it means email exists
        // if returns false email doesnt exist
        if(sellerObj) {
            console.log(sellerObj)
            return res.status(403).json({msg : 'User with this email already Exists!!'})
        }
        else{

            // we are getting error which means email is new, not founf DB
            // hash our password
            const hashpass = await bcrypt.hash(req.body.password, 10)
    
    
            //create entry in DB
            const newEntry = {email : req.body.email,
            fullName : req.body.fullName,
            password : hashpass}
            await Seller.create(newEntry) // user will be created successfully
            return res.status(201).json({msg : 'Account successfully created!!'})

        }
    
    
}



const signinSeller = async (req, res) => {
    
    const sellerObj = await Seller.findOne({email : req.body.email})
    if (sellerObj){
        // email exists we can validate password now
        // req.body.password // user's raw password
        // sellerObj.password // right HASH password

        const authPass = await bcrypt.compare(req.body.password, sellerObj.password)
        if (authPass){
            return res.json({msg : 'login successful'})
        }
        else{
            return res.json({msg : 'password wrong'})
        }
    }
    else{
        // email does not exist
        return res.status(403).json({msg : 'Account with this email does not exist'})
    }
}


module.exports = {homeFun, sellerCreate, allSellers, getOneSeller, updateSeller, deleteUser, signupSeller, signinSeller}    

