const manholeModel = require('../models/manholeModel')
const workerModel = require('../models/manholeModel')
const deviceModel = require('../models/manholeModel')
const operationModel = require('../models/manholeModel')
const incidentModel = require('../models/incidentModel')

const getWorker = async (req, res) => {
    try {
        const workers = await workerModel.find().select('-password')
        res.status(200).json(workers)
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch workers" })
    }
}

const getDevices = async (req, res) => {
    try {
        const devices = await deviceModel.find()
        res.status(200).json(devices)
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch devices" })
    }
}

const getManholes = async (req, res) => {
    try {
        const manholes = await manholeModel.find({ supervisorId: req.user.id })
        res.status(200).json(manholes)
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch manholes" })
    }
}

const startOperation = async (req, res) => {
    try {
        const { manholeId, workers } = req.body

        const operation = await operationModel.create({
            supervisorId: req.user.id,
            manholeId,
            workers,
            status: "Active"
        })

        // add operation id to every assigned worker
        await workerModel.updateMany(
            { _id: { $in: workers } },
            { currentOperation: operation._id }
        )

        res.status(201).json({ message: "Operation started", operation })
    } catch (error) {
        res.status(500).json({ message: "Failed to start operation" })
    }
}

const endOperation = async (req, res) => {
    try {
        const { operationId, status, reason } = req.body

        // validate status
        if (!["Completed", "Cancelled"].includes(status)) {
            return res.status(400).json({ message: "Status must be Completed or Cancelled" })
        }

        // if cancelled, reason is required
        if (status === "Cancelled" && !reason) {
            return res.status(400).json({ message: "Reason is required when cancelling" })
        }

        const operation = await operationModel.findByIdAndUpdate(
            operationId,
            { status },
            { new: true }
        )

        if (!operation) {
            return res.status(404).json({ message: "Operation not found" })
        }

        // if cancelled, create an incident record
        if (status === "Cancelled") {
            await incidentModel.create({
                operationId,
                supervisorId: req.user.id,
                manholeId:    operation.manholeId,
                reason,
            })
        }

        res.status(200).json({ message: `Operation ${status}`, operation })
    } catch (error) {
        res.status(500).json({ message: "Failed to end operation" })
    }
}


module.exports = {
    getWorker,
    getDevices,
    getManholes,
    startOperation,
    endOperation
}
