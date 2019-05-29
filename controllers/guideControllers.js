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

  async deleteGuide(req, res, next) {
    const { _id: userId } = req.session.currentUser;
    const { id: guideId } = req.params;
    try {
      const { creator } = await Guide.findById(guideId);
      if(creator == userId) {
        await Guide.findByIdAndDelete(guideId);
        return res.status(200).json({message: 'guide deleted'})
      }
      return res.json({message: 'You cannot delete the guide'})
    }
    catch(err) {
      console.log(err)
    }
  }
}

const guideControllers = new GuideControllers;
module.exports = guideControllers;