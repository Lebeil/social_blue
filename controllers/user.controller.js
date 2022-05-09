const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    return res.status(200).json(users);
}

module.exports.userInfo = (req, res) => {
    console.log(req.params);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)
    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('ID unknown' + err);
    }).select("-password")
};

module.exports.updateUser = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)
    // Ne pas mettre "async await" parce que 'ERR_HTTP_HEADERS_SENT'
    try {
        UserModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    bio: req.body.bio,
                },
            },
            {upsert: true, new: true, setDefaultsOnInsert: true}, // paramètres obligatoire pour un put
            (err, docs) => {
                if (!err) return res.send(docs);
                else {
                    return res.status(500).send({message: err});
                }
            }
        );
    } catch (err) {
        return res.status(500).json({message: err});
    }
};

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknow :" + req.params.id)

    try {
        await UserModel.remove({_id: req.params.id}).exec();
        res.status(200).json({message: "Successfully deleted."});
    } catch (err) {
        return res.status(500).json({message: err})
    }
}

module.exports.follow = (req, res) => {
    if (!ObjectID.isValid(req.params.id) || (!ObjectID.isValid(req.body.idToFollow)))
        return res.status(400).send("ID unknow :" + req.params.id)

    try {
        // add to the follower list
        UserModel.findByIdAndUpdate(
            req.params.id,
            {$addToSet: {following: req.body.idToFollow}},
            {new: true, upsert: true},
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        );
        // add to following list
        UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            {$addToSet: {followers: req.params.id}},
            {new: true, upsert: true},
            (err, docs) => {
                // Ne jamais mettre 2 status 201
                /*if(!err) res.status(201).json(docs);*/
                if (err) return res.status(400).json(err);
            }
        )
    } catch (err) {
        return res.status(500).json({message: err})
    }
}

module.exports.unfollow = (req, res) => {
    if (!ObjectID.isValid(req.params.id) || (!ObjectID.isValid(req.body.idToUnfollow)))
        return res.status(400).send("ID unknow :" + req.params.id)

    try {
        UserModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {following: req.body.idToUnfollow}
            },
            {
                new: true,
                upsert: true
            },
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        );
        // remove to following list
        UserModel.findByIdAndUpdate(
            req.body.idToUnfollow,
            { $pull: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, docs) => {
                if(err) return res.status(400).json(err)
            }
        );
    } catch (err) {
        return res.status(500).json({message: err})
    }
}
