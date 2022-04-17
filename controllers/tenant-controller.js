const tenantModel = require('../models/tenant-model');

exports.addTenantDetails = async (req, res) => {
    console.log('Test 1');
    try {
        const value = await tenantModel.findOne({ userId: req.body.userId.trim() });
        console.log('Test 2');
        if (value) {
            console.log('Test 3');
            const tenantValue = await tenantModel.updateOne({ userId: req.body.userId.trim() }, { $set: { tenantId: req.body.tenantId.trim(), idNumber: req.body.idNumber.trim() } });
            if (tenantValue.modifiedCount === 1) {
                console.log('Test 5');
                return res.status(200).send({ message: 'Data Updated successfully..!!', data: value });
            }
            else {
                console.log('Test 6');
                return res.send({ message: 'Something went wrong..!!', data: false });
            }
        }
        else {
            console.log('Test 4');
            const tenantDetails = new tenantModel({
                userId: req.body.userId.trim(),
                tenantId: req.body.tenantId.trim(),
                idNumber: req.body.idNumber.trim(),
            });

            const saveTenantDetails = await tenantDetails.save();
            console.log('Test 7');
            if (saveTenantDetails) {
                return res.status(200).send({ message: 'Data saved successfully..!!', saveTenantDetails });
            }
            else {
                console.log('Test 8');
                console.log(err);
                return res.send({ message: 'Something went wrong..!!', data: false });
            }
        }
    }
    catch (e) {
        console.log('Test 9');
        console.log(e);
        return res.send({ message: 'Something went wrong..!!', data: false });
    }
}