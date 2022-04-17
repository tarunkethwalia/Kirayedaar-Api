const tenantModel = require('../models/tenant-model');

exports.addTenantDetails = async (req, res) => {
    try {
        const value = await tenantModel.findOne({ userId: req.body.userId.trim() });
        if (value) {
            const tenantValue = await tenantModel.updateOne({ userId: req.body.userId.trim() }, { $set: { tenantId: req.body.tenantId.trim(), idNumber: req.body.idNumber.trim() } });
            if (tenantValue.modifiedCount === 1) {
                return res.status(200).send({ message: 'Data Updated successfully..!!', data: value });
            }
            else {
                return res.send({ message: 'Something went wrong..!!', data: false });
            }
        }
        else {
            const tenantDetails = new tenantModel({
                userId: req.body.userId.trim(),
                tenantId: req.body.tenantId.trim(),
                idNumber: req.body.idNumber.trim(),
            });

            const saveTenantDetails = await tenantDetails.save();
            if (saveTenantDetails) {
                return res.status(200).send({ message: 'Data saved successfully..!!', saveTenantDetails });
            }
            else {
                console.log(err);
                return res.send({ message: 'Something went wrong..!!', data: false });
            }
        }
    }
    catch (e) {
        console.log(e);
        return res.send({ message: 'Something went wrong..!!', data: false });
    }
}