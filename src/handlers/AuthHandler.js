const user = require("./../public/user.json");


class Auth {
    constructor (query) {
        this.query = query;
    }

    isEmail () {
      const found = user.filter(el => el.email === this.query.email);
      if (found.length) {
         return true;
      }else{
        return false;
      }
    }
    isContact () {
        const found = user.filter(el => el.contact === this.query.contact);
         if (found.length) {
            return true;
         }else{
           return false;
         }
    }


    isValid () {
       var flag1 =  this.isEmail();
       var flag2 = this.isContact();
       console.log(flag1,flag2);
       if(flag1){
          return "Email already in use";
       }
       if(flag2){
          return "Contact already in use";
       }
    }
    
}

module.exports = Auth ;