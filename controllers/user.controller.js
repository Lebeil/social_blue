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
                if(!err) return res.send(docs);
                else {
                    return res.status(500).send({ message: err});
                }
            }
        );
    } catch(err) {
        return res.status(404).json({ message: err });
    }
};
