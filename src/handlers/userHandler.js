const Auth = require("./AuthHandler");
const  router = require('express').Router();
const User = require("./../../public/user.json");
const { v4: uuidv4 } = require('uuid');



router.post('/register', (req,res) => {
    const auth = new Auth(req.query).isValid();
    
    if (auth == "Email already in use" ){
        res.status(500).json({
          status : 'error',
          message : "Please check your Email "
        });
    }else if (auth == "Contact already in use"){
        res.status(500).json({
            status : 'error',
            message : "Please check your Contact"
          });
    }
    const {name , email, password, contact} = req.query ;
    const newUser = {
        id : uuidv4(),
        name,
        email,
        password,
        contact
    }
    User.push(newUser);
    res.status(200).json({
        status : 'success',
        user : newUser
    })

})

router.post("/login", (req,res)=> {
     const { email, password } = req.query;
     const found = User.find ((el)=> {
        el.email === email && el.password === password
     });
     if(found) {
        res.status(201).json({
            status: 'success',
            message: "Succesfully logged in"
        })
     }
     else {
        res.status(500).json({
            status : 'error',
            message : "Please check your Email or Password"
        });
     }
});

router.patch('/update/:id', (req, res)=> {
    const user = User.find(el => el.id === req.params.id);
    const index = User.map((el,index) => {
        if(el.id == req.params.id){
            return index;
        }
        return null;
    });
    let updatedUser;
    if(user){      
        updatedUser = Object.assign(user,req.query);
        User[index] = updatedUser;
    }else{
        res.status(404).json({
            status: 'error',
            message: 'User not found'
        })
    }
    res.status(200).json({
        status: 'ok',
        message: 'Updated Succesfully',
        updatedUser
    })

});

router.delete('/:id', (req, res) => {
    const index = User.map((el,index) => {
        if(el.id == req.params.id){
            return index;
        }
        return null;
    });
    let removedUser;
    if (index){
        removedUser = User.slice(index,index+1);
    }else{
        res.status(404).json({
            status: 'error',
            message: 'User not found'
        })
    }

    res.status(200).json({
        status: 'ok',
        message: 'User has been removed'
    })

});

module.exports = router;