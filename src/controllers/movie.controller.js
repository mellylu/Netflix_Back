const Movie = require("../models/movie.model");

exports.post = (req, res) => {
    const movie = new Movie({
        name : req.body.name,
        age : req.body.age,
        duration : req.body.duration,
        type : req.body.type,
        description : req.body.description,
        image : req.body.image
    });
    movie.save()
        .then((data) => {
            res.status(200).send({
                user : data,
                isCreated : true 
            })
        })
        .catch((err) => {
            res.status(500).send({
                message : err.message || "Some error occured"
            })
        })
}


//GET ALL
exports.getAll = (req, res) => {
    console.log('yreeseekrg,le')
    let response = {};
    let content = [];
    var req;
    Movie.find()
    .then((data) => {
        console.log(req.body);
        if ("name" in req.query){
            data = data.filter(movie => movie.name == "hunger games");
        }
        if ('asc' in req.query){
            console.log(req.query.asc);
            data = data.sort((a,b) => {
                console.log(a);
                if (a.name < b.name) {
                    console.log("dans if");
                  return -1;
                } 
                else {
                    console.log("dans else");
                  return 1;
                }
            })
        }
        res.send({
            movie : data
        })
    })
    .catch((err) => {
        res.status(500).send({
            error: 500,
            message: err.message
        })
    })
}



//GET ID
exports.getId = (req, res) => {
    const movie = Movie.findById(req.params.id)
    .then((data) => {
        res.send({
            movie : data
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
    const movie = Movie.findByIdAndUpdate(req.params.id, {
        name : req.body.name,
        age : req.body.age,
        duration : req.body.duration,
        type : req.body.type,
        description : req.body.description,
        image : req.body.image
    })
    .then(() => {
        Movie.findById(req.params.id)
            .then((data) => {
                res.send({
                    movie : data,
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

//DELETE
exports.delete = (req, res) => {
    const movie = Movie.findByIdAndDelete(req.params.id)
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


//Filtres

//GET ALL
exports.getAction = (req, res) => {
    Movie.find()
    .then((data) => {
        data = data.filter(movie => movie.type == "Action");
        res.send({
            movie : data
        })
    })
    .catch((err) => {
        res.status(500).send({
            error: 500,
            message: err.message
        })
    })
}

