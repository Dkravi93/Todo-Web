const user = require("./../.././public/user.json");
class Auth {
    constructor (query) {
        this.query = query;
    }

    isEmail () {
      const found = user.find((el)=>{
         el.email = this.query.email;
      })
      if (found) {
         return true;
      }else{
        return false;
      }
    }
    isContact () {
        const found = user.find((el)=>{
            el.contact = this.query.contact;
         })
         if (found) {
            return true;
         }else{
           return false;
         }
    }


    isValid () {
       var flag1 =  this.isEmail();
       var flag2 = this.isContact();
       if(!flag1){
          return "Email already in use";
       }
       if(!flag2){
          return "Contact already in use";
       }
    }
    
}

module.exports = Auth ;