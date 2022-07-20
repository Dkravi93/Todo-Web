const  router = require('express').Router();
const isAuthenticated = require("./../utils/isAuth");
const mailOnExpiry = require("./../utils/nodeMailer");
const fs = require('fs');
const Task = require('./../public/task.json');
router.post('/create', isAuthenticated, async (req, res) => {
    

   try {
    const {title, message,userId} = req.body;
    // console.log("*********",mailOnExpiry);
    const now = new Date();

    const expiryTime = 1*60*1000; //this will expire it after 10 min
    console.log("exp",expiryTime);
    const newTask = {
        id : Task.length+1,
        title : title,
        message : message,
        userId : userId,
        timeExpiry : expiryTime
    }
    mailOnExpiry(message,title,userId,expiryTime);
        
    Task.push(newTask)

    fs.writeFile("public/task.json", JSON.stringify(Task), err => {     
        // Checking for errors
        if (err) throw err; 
       
        console.log("Done writing"); // Success
    });

    res.status(200).send({
        status : 'success',
        task : newTask
    })
    } catch (error) {
        console.log("Error: " + error);

    }

});

router.patch('/task/:id', isAuthenticated, (req, res)=>{
    const obj= Task.filter(el => el.id === req.params.id);
    const updatedTask = Object.assign(obj, req.body);
    Task[req.params.id - 1] = updatedTask;

    fs.writeFile("public/task.json", JSON.stringify(Task), err => {     
        // Checking for errors
        if (err) throw err; 
       
        console.log("Done writing"); // Success
    });
    res.status(200).send(updatedTask);
})

router.delete('/task/:id', isAuthenticated, (req, res)=>{

    Task = Task.slice(req.params.id -1, req.params.id);
    fs.writeFile("public/task.json", JSON.stringify(Task), err => {     
        // Checking for errors
        if (err) throw err; 
       
        console.log("Done writing"); // Success
    });
    res.status(200).send({
        status : "success"
    })
})


module.exports = router;