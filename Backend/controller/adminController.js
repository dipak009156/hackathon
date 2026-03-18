const workerModel = require('../models/workerModel')
const supervisorModel = require('../models/supervisorModel')
const deviceModel = require('../models/deviceModel')
const manholeModel = require('../models/manholeModel')
const queryModel = require('../models/queryModel')
const { genpass} = require('../utils/bcryptAndJwt')



const getWorker = async (req, res) => {
  const workers = await workerModel.find();

  res.status(200).json({
    message: 'all workers',
    workers
  })
}

const getSupervisor = async (req, res) => {
  const supervisor = await supervisorModel.find();

  res.status(200).json({
    message: 'all workers',
    supervisor
  })
}

const getManholes = async (req, res) => {
  const manholes = await manholeModel.find();

  res.status(200).json({
    message: 'all workers',
    manholes
  })
}

const getDevices = async (req, res) => {
  const devices = await deviceModel.find();

  res.status(200).json({
    message: 'all workers',
    devices
  })
}

const getQuery = async (req, res) => {
  const queries = await queryModel.find()

  res.status(200).json({
    message: 'all workers',
    queries
  })
}

const addWorker = async (req, res) => {
  const {
    name,
    email,
    password,
    department,
    shift,
    joiningDate,
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
    insuranceNumber } = req.body;

  const hashedPassword = await genpass(password)

  try {
    const worker = await workerModel.create({
      name,
      email,
      password : hashedPassword,
      department,
      shift,
      joiningDate,
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
    });

    res.status(201).json({ success: true, data: worker });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }



}

const addSupervisor = async (req, res) => {
  const {
    fullName,
    aadhaarNumber,
    phoneNumber,
    email,
    assignedZone,
    category,
    residentialAddress,
    password
  } = req.body;

  try {
    const supervisor = await supervisorModel.create({
      fullName,
      aadhaarNumber,
      phoneNumber,
      email,
      assignedZone,
      category,
      residentialAddress,
      password
    });

    res.status(201).json({ success: true, data: supervisor });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const addDevice = async (req, res) => {
  const {
    deviceId,
    deviceType,
    status
  } = req.body;

  try {
    const device = await deviceModel.create({
      deviceId,
      deviceType,
      status
    });

    res.status(201).json({ success: true, data: device });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const addManhole = async (req, res) => {
  const {
    manholeId,
    zone,
    manholeType,
    landmark,
    depth,
    waterLevel,
    gasH2S,
    gasCH4,
    gasCO,
    gasO2,
    status,
    lastInspectedDate
  } = req.body;

  try {
    const manhole = await manholeModel.create({
      manholeId,
      zone,
      manholeType,
      landmark,
      depth,
      waterLevel,
      gasH2S,
      gasCH4,
      gasCO,
      gasO2,
      status,
      lastInspectedDate
    });

    res.status(201).json({ success: true, data: manhole });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getWorker,
  getSupervisor,
  getDevices,
  getManholes,
  getQuery,
  addWorker,
  addSupervisor,
  addDevice,
  addManhole
}