const mongoose = require('mongoose');
  
  const userSchema = mongoose.Schema({
  
    username:{
      type: String,
      required: true
  
    },
    email: {
      type: String,
      required: true
    },
  
    password: {
      type: String,
      required: true
    },
  
    orgName:{
      type:String,
      required: true
    },
    
    activePlan:{
  
      type:String,
      required: true
    },

    campaigns:{
      type:Number,
      default:0
    }
  
  
  
    
  });
  const planSchema = mongoose.Schema({
    userid:{
      type:String,
      required:true
    },
     campid:{
       type:Number,
       required:true
     },
      lplinks:{
        type:Object,
        required:true
      },
      rotator:{
        type:Object,
        required:true
      },
      
    
    
  })
module.exports = mongoose.model('User', userSchema),
                  mongoose.model('Plan',planSchema);        



