/*
! WARNING: On running this file with the -f flag, all existing tables
! with names defined in the models will be dropped from the db
*/

import db from '../config/database'
const Specie = require('../models/specie')
const Model = require('../models/model')
const Reaction = require('../models/reaction')
const Compartment = require('../models/compartment')

if (process.argv[2] === '-f') {
  console.warn('Force option has been used.')
  db.sync({ force: true })
} else db.sync()
