const languageModel = require('../models/language-model');

exports.addLanguage = (req, res) => {
    try {
        const language = new languageModel({
            type: req.body.type.trim(),
            screen: req.body.screen.trim(),
            text: req.body.text.trim(),
        });

        language.save().then(data => {
            return res.status(200).send({ message: 'Data saved successfully..!!', data });
        }).catch(err => {
            console.log(err);
            return res.send({ message: 'Something went wrong..!!', data: false });
        });
    }
    catch (e) {
        console.log(e);
        return res.send({ message: 'Something went wrong..!!', data: false });
    }
}

exports.getLanguage = (req, res) => {
    try {
        languageModel.find({type: req.body.type.trim(), screen: req.body.screen.trim()}).then(data => {
            data = data.map(x => x.text);
            return res.status(200).send({ message: 'Data received successfully..!!', data });
        }).catch(err => {
            console.log(err);
            return res.send({ message: 'Something went wrong..!!', data: false });
        });
    }
    catch (e) {
        console.log(e);
        return res.send({ message: 'Something went wrong..!!', data: false });
    }
}