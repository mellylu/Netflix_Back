const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
var secret = process.env.JWT_SECRET;


//S'inscrire = create user
exports.register = (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    const user = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        isAdmin : false,
        password : hashedPassword
    });
    user.save()
        .then((data) => {
            let userToken = jwt.sign({
                id: data._id,
                isAdmin: data.isAdmin
            },
                secret,
                {
                    expiresIn: 86400
                }
            )
            res.status(200).send({
                user : data,
                auth : true,
                isCreated : true 
            })
        })
        .catch((err) => {
            res.status(500).send({
                message : err.message || "Some error occured"
            })
        })
}

//LOGIN
exports.login = (req, res) => {
    User.findOne({"email" : req.body.email})
    .then((user) => {
        let passwordValid = bcrypt.compareSync(req.body.password, user.password)
        if(!passwordValid){
            console.log("erreur")
            return res.status(401).send({
                message : "password not valid",
                auth : false,
                token : null
            })
        }
        let userToken = jwt.sign({
            id : user._id,
            isAdmin : User.isAdmin
        },
        secret,
        {
            expiresIn : 86400
        }
        )
        res.status(200).send({
            auth : true,
            token : userToken
        })
    })
    .catch((err) => res.status(404).send({error:err}))
}



//GET ALL
exports.getAll = (req, res) => {
    const user = User.find()
    .then((data) => {
        res.send({
            user : data
        })
    })
    .catch((err) => {
        res.status(500).send({
            error: 500,
            message: err.message
        })
    })
}

exports.getUser = (req, res) => {
    console.log(req.user);
    User.findById(req.user.id)
        .then((user) => {
            console.log(user);
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
            message : err.message || "Some error occured"
        })
    })
  };

//GET ID
exports.getId = (req, res) => {
    const user = User.findById(req.user.id)
    .then((data) => {
        res.send({
            user : data
        })
    })
    .catch((err) => {
        res.status(500).send({
            message : err.message || "Some error occured"
        })
    })
}



//UPDATE




exports.update = (req, res) => {
    //vérifier cde qui'l y a dans la requetù
    //je récup le user
    //2 boucle sur req.body.favoris
    //si déjà dedans 
    //on le supprime
    const user = User.findByIdAndUpdate(req.params.id, {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password,
        favoris : req.body.favoris
    })
    .then(() => {
        User.findById(req.params.id)
            .populate({
                path: "favoris",
                populate:{
                    path:"movie",
                    model:"Movie"
                }
            })
             .then((data) => {
                res.send({
                    user : data,
                    update : true
                })
            })
            .catch((err) => {
                res.status(500).send({
                    message : err.message || "Some error occured"
                })
            })
    })
}
exports.getUser = (req, res) => {
    console.log(req.user);
    User.findById(req.user.id)
        .populate({
            path: "favoris",
            populate:{
                path:"movie",
                model:"Movie"
            }
        })
        .then((user) => {
            console.log(user);
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
            message : err.message || "Some error occured"
        })
    })
  };


//DELETE
exports.delete = (req, res) => {
    const user = User.findByIdAndDelete(req.params.id)
    .then((data) => {
        res.send({
            delete : true
        })
    })
    .catch((err) => {
        res.status(500).send({
            message : err.message || "Some error occured"
        })
    })
}

exports.verifyToken = (req, res) => {
    console.log('mm');
    if (req.user) {
        res.status(200).json({verify:true})
    }
}




