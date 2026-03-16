const queryModel = require('../models/queryModel')
const manholeModel = require('../models/manholeModel')
const workerModel = require('../models/workerModel')


const checkOperation = (req, res)=>{
    res.send("for now no logic")
}

const addQueries = async (req, res)=>{
    const { queryType, queryTitle, queryDesctiption} = req.body

    const addedquery = await queryModel.create({
        queryType,
        queryTitle, 
        queryDescription
    })

    res.status(201).json({
        message : 'query noted'
    })
}

const updateProfile = async (req, res) => {
    const {
        name,
        phone,
        address,
        healthDetails: {
            lastCheckup,
            medicalNotes
        } = {},
        emergency: {
            contactName,
            contactPhone
        } = {},
        insuranceNumber
    } = req.body;

    try {
        const updatedWorker = await workerModel.findByIdAndUpdate(
            req.user.id,
            {
                name,
                phone,
                address,
                healthDetails: {
                    lastCheckup,
                    medicalNotes
                },
                emergency: {
                    contactName,
                    contactPhone
                },
                insuranceNumber
            },
            { new: true, runValidators: true }
        );

        if (!updatedWorker) return res.status(404).json({ message: 'Worker not found' });

        res.status(200).json({ success: true, data: updatedWorker });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


module.exports = {
    checkOperation,
    addQueries,
    updateProfile
}