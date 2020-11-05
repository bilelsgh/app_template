const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req,res,next) => {
    //password hash = asynchrone function
    //2nd param : nb of time we do the hash
    bcrypt.hash(req.body.password, 10)
        .then( hash => {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                sex: req.body.sex,
                email: req.body.mail,
                password: hash
            });
            user.save()
                .then( () => res.status(201).json({ message: "Utilisateur créé"}))
                .catch( error => res.status(400).json({ error }) );
        })
        .catch( error => res.status(500).json({ error }));
};

exports.login = (req,res,next) => {
    User.findOne( { email: req.body.mail })
        .then( user => {
            if (!user){
                return res.status(401).json({ erreur : 'Utilisateur non trouvé'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then( valid => {
                    if(!valid){
                        return res.status(401).json({ erreur : 'Mot de passe incorrect'});
                    }
                    res.status(200).json({
                        firstName: user.firstName,
                        userId: user._id,
                        //Generation of the token
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch( error => res.status(500).json({ error } ));
        })
        .catch( error => res.status(500).json({ error }));
};
