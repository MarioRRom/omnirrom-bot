//=================================================================
//   ▄▄▄▄                      ▄▄▄▄▄▄     ▄▄▄▄▄▄                  
// ▄█▀▀████▄                  █▀██▀▀▀█▄  █▀██▀▀▀█▄                
// ██    ██ ▄        ▄     ▀▀   ██▄▄▄█▀    ██▄▄▄█▀        ▄       
// ██    ██ ███▄███▄ ████▄ ██   ██▀▀█▄     ██▀▀█▄   ▄███▄ ███▄███▄
// ██    ██ ██ ██ ██ ██ ██ ██ ▄ ██  ██   ▄ ██  ██   ██ ██ ██ ██ ██
//  ▀████▀ ▄██ ██ ▀█▄██ ▀█▄██ ▀██▀  ▀██▀ ▀██▀  ▀██▀▄▀███▀▄██ ██ ▀█
//                  MarioRRom's discord server Bot
//             https://github.com/MarioRRom/omnirrom-bot/
//=================================================================


// Configuración persistente (clave-valor).
// Lee y escribe en SQLite con cache en memoria.

const db = require('./db');

// Cache en memoria para evitar lecturas repetitivas a la DB
const cache = new Map();


//  .-------------------------.
//  | .---------------------. |
//  | |   Guardar (set)     | |
//  | `---------------------' |
//  `-------------------------'

function set(key, value) {
  cache.set(key, value);
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO config (key, value)
       VALUES (?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
      [key, value],
      (err) => (err ? reject(err) : resolve())
    );
  });
}


//  .-------------------------.
//  | .---------------------. |
//  | |   Obtener (get)     | |
//  | `---------------------' |
//  `-------------------------'

function get(key) {
  if (cache.has(key)) return Promise.resolve(cache.get(key));
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT value FROM config WHERE key = ?`,
      [key],
      (err, row) => {
        if (err) reject(err);
        else {
          cache.set(key, row?.value || null);
          resolve(row?.value || null);
        }
      }
    );
  });
}

module.exports = { set, get };