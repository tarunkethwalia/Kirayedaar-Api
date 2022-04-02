const languageModel = require('../models/language-model');

exports.addLanguage = (req, res) => {
    try {
        const language = new languageModel({
            type: req.body.type,
            screen: req.body.screen,
            text: req.body.text,
        });

        language.save().then(data => {
            return res.status(200).send({ message: 'Data saved successfully..!!', data });
        }).catch(err => {
            return res.status(400).send({ message: 'Something went wrong..!!', data: err });
        });
    }
    catch (e) {
        return console.log(e);
    }
}

exports.getLanguage = (req, res) => {
    try {
        languageModel.find({type: req.body.type, screen: req.body.screen}).then(data => {
            data = data.map(x => x.text);
            return res.status(200).send({ message: 'Data received successfully..!!', data });
        }).catch(err => {
            return res.status(400).send({ message: 'Something went wrong..!!', data: err });
        });
    }
    catch (e) {
        return console.log(e);
    }
}