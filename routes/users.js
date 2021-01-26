const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv').config();
const authToken = process.env.authToken
const User = require('../models/users.js');

var express = require('express')
const router=express.Router()

//-----------gets--->

router.get('/register', function(req, res, next) {
    
  res.render('register');
});
router.get('/dashboard', function(req, res, next) {
    
    res.render('dash');
  });
  
  
  


router.get('/login',async function(req, res, next) {
    res.render('login')
  });

router.post('/register', [
  body('email').isEmail().withMessage("Invalid email"),
  body('password').isLength({ min: 8 }).withMessage("Invalid password minimum characters: 8")
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  const {
      email,
      password,
      username,
      orgName,
      activePlan
  

  } = req.body;

  let user = await User.findOne({
      email
  });

  if (user) {
      //console.log(user)
      return res.status(400).json({
          msg: "User Already Exists"

      });

  }

  //else add it to the User model
  user = new User({
      username,
      email,
      password,
      orgName,
      activePlan
  
  });
//got my order gonna eat brb //sure
  //hash password

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(password, salt);

  //save password

  await user.save().then((result) => { console.log(result) })
  
  const payload = {
    user: {
        id: user.id,
        
    }
}
 
 
  jwt.sign(
      payload,
      authToken, {
      expiresIn: '9h'
  },
      (err, token) => {
          if (err) throw err;
          res.cookie('token', token, {
              expires: new Date(Date.now() + 9 * 3600000),
              sameSite: true
          }).status(200).json({
              token
          });
      }
  );
})

router.post('/new-campaign/:uname',async (req,res)=>{

    const username = uname
    let user = await User.findOne({
       username
    });
    let userid=user.id
    let campid=user.campaigns+1
    if (user.activePlan=="free"&&campid>1 || user.activePlan=="basic"&&campid>4 || user.activePlan=="enterprise"&&campid>16){
        return res.status(400).json({
            'msg':"cant add more campaigns"
        })
    }
    let lps= await req.body.lps
    let rotator = await req.body.rotator;
    let lplinks={}
    lps.forEach((element) => {
        lplinks = { ...lplinks, element: { "weight": 0, "clicks": 0, "conversion": 0 } };
    })
        
        let plan = new Plan({
            userid,
            campid,
            lplinks,
            rotator
        });
        await plan.save()

    })
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({
      email
  });
  if (!user)
      return res.status(400).json({
          message: "User Not Exist"
      });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
      return res.status(400).json({
          message: "Incorrect Password !"
      });
  const payload = {
      user: {
          id: user.id,
      }
  };
  
  jwt.sign(
      payload,
      authToken,
      {
          expiresIn: '1h'
      },
      (err, token) => {
          if (err) throw err;
          res.cookie('token', token, {
              expires: new Date(Date.now() + 1 * 3600000),
              sameSite: true
          }).status(200).redirect('/portal')
      }
  );
})




module.exports = router;
