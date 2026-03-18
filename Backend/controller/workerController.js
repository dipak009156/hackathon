const queryModel = require('../models/queryModel')
const manholeModel = require('../models/manholeModel')
const workerModel = require('../models/workerModel')


const checkOperation = async (req, res) => {
    try {
        // get worker with their current operation populated
        const worker = await workerModel.findById(req.user.id)
            .populate({
                path: 'currentOperation',
                populate: [
                    { path: 'manholeId' },
                    { path: 'supervisorId', select: '-password' }
                ]
            })

        if (!worker.currentOperation) {
            return res.status(200).json(null)
        }

        res.status(200).json(worker.currentOperation)
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch operation" })
    }
}

const addQueries = async (req, res)=>{
    const { type, title, description} = req.body

    const addedquery = await queryModel.create({
        queryType : type,
        queryTitle : title,
        queryDescription : description
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