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


// Conexión a la base de datos SQLite.
// Crea la tabla de configuración al iniciar.

const sqlite3 = require('sqlite3').verbose();
const path = require('path');


//  .-------------------------.
//  | .---------------------. |
//  | |      Conexión       | |
//  | `---------------------' |
//  `-------------------------'

const db = new sqlite3.Database(
  path.join(__dirname, '../data/database.db')
);


//  .-------------------------.
//  | .---------------------. |
//  | |   Inicialización    | |
//  | `---------------------' |
//  `-------------------------'

// Crear la tabla de configuración si no existe
db.run(`
  CREATE TABLE IF NOT EXISTS config (
    key TEXT PRIMARY KEY,
    value TEXT
  )
`);

module.exports = db;