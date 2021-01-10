'use strict';

const database = require('../infrastructure/database');

async function getHackaton(){
  const pool = await database.getPool();
  const query = 'SELECT * FROM hackaton';
  const [hackaton] = await pool.query(query);

  return hackaton;
}

async function getHackatonById(id){
    const pool = await database.getPool();
    const query = 'SELECT * FROM hackaton WHERE id = ?';
    const [hackaton] = await pool.query(query, id);
  
    return hackaton[0];
}

async function getHackatonByName(nombre){
    const pool = await database.getPool();
    const query = 'SELECT * FROM hackaton WHERE nombre = ?';
    const [hackaton] = await pool.query(query, nombre);
  
    return hackaton[0];
}

async function getHackatonByCity(ciudad){
    const pool = await database.getPool();
    const query = 'SELECT * FROM hackaton WHERE ciudad = ?';
    const [hackaton] = await pool.query(query, ciudad);
  
    return hackaton[0];
}

async function getHackatonByMod(presencial){
    const pool = await database.getPool();
    const query = 'SELECT * FROM hackaton WHERE presencial = ?';
    const [hackaton] = await pool.query(query, presencial);
  
    return hackaton[0];
}

async function getHackatonByTematica(tematica){
    const pool = await database.getPool();
    const query = 'SELECT * FROM hackaton WHERE id_tema = ?';
    const [hackaton] = await pool.query(query, tematica);
  
    return hackaton[0];
}

async function getHackatonByTech(tecnologia){
    const pool = await database.getPool();
    const query = 'SELECT * FROM hackaton WHERE id_tech = ?';
    const [hackaton] = await pool.query(query, tecnologia);
  
    return hackaton[0];
}


async function getHackatonByInitialDate(inicio){
    const pool = await database.getPool(); 
    const query = 'SELECT * FROM hackaton WHERE inicio = ?';
    const [date] = await pool.query(query, inicio);
  
    return date[0];
}

async function getHackatonByEndDate(fin){
    const pool = await database.getPool(); 
    const query = 'SELECT * FROM hackaton WHERE fin = ?';
    const [date] = await pool.query(query, fin);

    return date[0];
}

async function createHackaton(nombre, presencial, ciudad, contenido, inicio, fin, avatar, max_register){
    const pool = await database.getPool();
    const insertQuery = 'INSERT INTO hackaton (nombre, presencial, ciudad, contenido, inicio, fin, avatar, max_register ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const [created] = await pool.query(insertQuery, [nombre, presencial, ciudad, contenido, inicio, fin, avatar, max_register]);
  
    return created.insertId;
}

async function updateHackaton(nombre, presencial, ciudad, contenido, inicio, fin, avatar, max_register){
    const pool = await database.getPool();
    const updateQuery = 'UPDATE hackaton SET nombre = ?, presencial = ?, ciudad = ?, contenido = ?, inicio = ?, fin = ?, avatar = ?, max_register = ?';
    await pool.query(updateQuery, [nombre, presencial, ciudad, contenido, inicio, fin, avatar, max_register]);
  
    return true;
  }

module.exports = {
    getHackaton,
    getHackatonById,
    getHackatonByName,
    getHackatonByCity,
    getHackatonByMod,
    getHackatonByTech,
    getHackatonByTematica,
    getHackatonByInitialDate,
    getHackatonByEndDate,
    createHackaton,
    updateHackaton

};