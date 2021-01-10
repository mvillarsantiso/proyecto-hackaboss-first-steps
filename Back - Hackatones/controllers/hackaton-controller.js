'use strict';

const Joi = require('joi');
const {
  hackatonRepository
} = require('../repositories');

async function getHackaton(req, res) {
  try {
      const hackaton = await hackatonRepository.getHackaton();
      res.send(hackaton);  
  } catch (err) {
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

async function createHackaton(req, res){
    try{
        const schema = Joi.object({
            nombre: Joi.string().alphanum().min(5).max(50).required(),
            contenido: Joi.string().max(800).required(),
            inicio: Joi.date().greater('now').required(),
            fin: Joi.date().max('12-31-2022').required(),
            presencial : Joi.boolean(),
            ciudad: Joi.string(),
            max_register: Joi.number().integer().required()
        });
  
        await schema.validateAsync(req.body);
      
        const idCreado = await hackatonRepository.createHackaton(req.body.nombre,
            req.body.contenido, req.body.inicio, req.body.fin, req.body.presencial, req.body.ciudad, req.body.avatar, req.body.max_register);
  
        const hackaton = await hackatonRepository.getHackatonById(idCreado);
  
        return res.send(hackaton);
    }catch(err){
        console.log(err);
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        res.status(err.status || 500);
        res.send({ error: err.message });
    }
}

async function updateHackaton(req, res) {
    try {
  
      const { hackatonId } = req.params;    
      const { nombre, contenido, inicio, fin, presencial, ciudad, avatar, max_register } = req.body;
  
      const schema = Joi.object({
        hackatonId: Joi.number().positive().required(),
        nombre: Joi.string().alphanum().min(5).max(50).required(),
        contenido: Joi.string().max(800).required(),
        inicio: Joi.date().greater('now').required(),
        fin: Joi.date().max('12-31-2022').required(),
        presencial : Joi.boolean(),
        ciudad: Joi.string(),
        max_register: Joi.number().integer().required()
      });
  
      await schema.validateAsync({ hackatonId, nombre, contenido, inicio, fin, presencial, ciudad, avatar, max_register});
  
      const hackaton = await hackatonRepository.getHackatonById(hackatonId);
  
      if (!hackaton) {
        res.status(404);
        return res.send({ error: 'Hackaton no encontrado.' });
      }
  
      await hackatonRepository.updateHackatone(nombre, contenido, inicio, fin, presencial, ciudad, avatar, max_register, hackaton);
      const hackatonUpdated = await hackatonRepository.getHackatonById(hackaton);
  
      res.send(hackatonUpdated);
    } catch (err) {
      if(err.name === 'ValidationError'){
        err.status = 400;
      }
      console.log(err);
      res.status(err.status || 500);
      res.send({ error: err.message });
    }
}

module.exports = {
    getHackaton,
    createHackaton,
    updateHackaton
};