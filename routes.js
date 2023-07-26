const express = require('express');
const {homeFun, sellerCreate, allSellers, getOneSeller, updateSeller, deleteUser} = require('./controllers/controller');
const route = express.Router();


route.get('/', homeFun)

route.post('/create', sellerCreate)

route.get('/all', allSellers)

// req.params = { id : 3456789}
route.get('/getOneSeller/:id', getOneSeller) 

route.put('/update/:userId', updateSeller)

route.delete('/delete/:id', deleteUser)




module.exports = route