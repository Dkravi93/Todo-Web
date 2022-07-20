const Auth = require("./AuthHandler");
const  router = require('express').Router();
const User = require("./../public/user.json");
const fs = require("fs");


router.post('/register', (req,res) => {
    const auth = new Auth(req.body).isValid();
    
    if (auth == "Email already in use" ){
        res.status(500).json({
          status : 'error',
          message : "Please check your Email"
        });
        return
    }
    if (auth == "Contact already in use"){
        res.status(500).json({
            status : 'error',
            message : "Please check your Contact"
          });
          return
    }
    const {name , email, password, contact} = req.body ;
    const newUser = {
        id : User.length +1,
        name,
        email,
        password,
        contact
    }
    User.push(newUser);

    fs.writeFile("public/user.json", JSON.stringify(User), err => {
     
        // Checking for errors
        if (err) throw err; 
       
        console.log("Done writing"); // Success
    });
    
    res.status(200).json({
        status : 'success',
        user : newUser
    })

})

router.post("/login", (req,res)=> {
     const { email, password } = req.query;
     const found = User.filter ((el)=> {
        return el.email === email && el.password === password
     });
  
     if(found) {
        req.session.userId = email;
        req.session.password = password;
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


router.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });

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