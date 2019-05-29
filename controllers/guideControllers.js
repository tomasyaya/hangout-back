const express = require('express');
const User = require('../models/user');
const Guide = require('../models/Guide.js');

class GuideControllers {

  async createGuide(req, res, next){
    const { _id } = req.session.currentUser
    const { title, location } = req.body;
    if(!title || !location) {
      res.json({message: 'Complete all fields'})
      return
    }
    const newGuide = {
      creator: _id,
      title,
      location
    }
    try {
      const guide = await Guide.create(newGuide);
      console.log(guide)
      return res.json(guide)
    }
    catch(err) {
      console.log(err)
    }
  }

  async getGuides(req, res, next){
    try {
      const guides = await Guide.find()
      return res.json(guides)
    }
    catch(err) {
      console.log(err)
    }
  }
}

const guideControllers = new GuideControllers;
module.exports = guideControllers;