const Article = require('../models/article')

module.exports = {
    create : function(req,res) {
        console.log(req.body.title)
        console.log(req.body.content)
        Article.create({
            title : req.body.title,
            content : req.body.content,
            image : req.file.cloudStoragePublicUrl
        })
        .then(createResult => {
            res.status(201).send({msg:`success create Article`, data : createResult})
        })
        .catch(err => {
            if(err.name == 'ValidationError') res.status(422).json(err)
            res.status(500).json({err : err.message})
        })
    },

    readAll : function(req,res) {
        Article.find({})
            .then(findResult => {
                //req query => /?title=
                if (req.query.title) {
                    findResult = findResult.filter(eachResponse => {
                        return new RegExp(".*" + req.query.title + ".*", "i").test(eachResponse.title)
                    })
                }
                // res.status(200).send({msg:`all article`, data : findResult})
                res.status(200).send(findResult)
            })
            .catch(err => {
                res.status(500).send({err: err.message})
            })
    },

    findOne : function(req,res){
        Article.findById(req.params.id)
            .then(findResult => {
                res.status(200).send(findResult)
            })
            .catch(err => {
                res.status(500).send({err:err.message})
            })
    },

    update : function(req,res) {
        Article.findByIdAndUpdate(req.params.id, {$set : req.body}, {new:true})
            .then(updateResult => {
                res.status(200).send({msg:`data id ${updateResult._id} updated`, data : updateResult})
            })
            .catch(err => {
                res.status(500).send({err:err.message})
            })
    },

    delete : function(req,res) {
        Article.findByIdAndDelete(req.params.id)
            .then(deleteResult => {
                res.status(200).send({msg :`data id ${deleteResult._id} deleted`, data : deleteResult})
            })
            .catch(err => {
                res.status(500).send({err:err.message})
            })
    }
}