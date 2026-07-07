# Contribuir — omnirrom-bot

Gracias por querer contribuir ❤️

Este proyecto está en desarrollo activo. Todas las contribuciones son bienvenidas siempre que tengan un objetivo claro y estén bien explicadas.

### Reglas

- Especificar el tipo de Pull Request en el título con un prefijo, por ejemplo:
  - `feat:` para nuevas funcionalidades
  - `fix:` para correcciones de bugs
- Explicar claramente el cambio realizado.
- Si el PR incluye más de un cambio, resaltar el principal y describir el resto en la descripción.
- Mantener el estilo de código consistente.

## Guía de estilo

Reglas simples para mantener el código legible y consistente.

### Encabezado de archivo

Todo archivo fuente comienza con el banner del proyecto:

```js
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
```
seguido de dos líneas en blanco.

### Imports

Agrupar por origen, separados por líneas en blanco.

```js
// Discord.js
const { Client, GatewayIntentBits } = require('discord.js');

// Internos
const { get, set } = require('./config');
const db = require('./db');
```

### Funciones

Una responsabilidad por función. Nombres descriptivos.

```js
// Bien
function loadCommands() { }
function handleError(interaction) { }

// Evitar
function process(input) { }
```

### Una instrucción por línea

```js
// Bien
if (condition) {
  doSomething();
}

// Evitar
if (condition) doSomething(), doSomethingElse();
```

### No trailing whitespace

Eliminar espacios al final de cada línea.

### Comentarios

Explicar el *por qué*, no el *qué*.

```js
// Bien
// Esperar a que Discord procese el borrado antes de desbanear

// Evitar
// Sumar 1 al contador
counter++;
```

### Separadores de sección

Dos estilos según la magnitud del bloque.

#### Bloque ASCII

Para secciones grandes (eventos, componentes, lógica pesada).

```js
//  .-------------------------.
//  | .---------------------. |
//  | | Eventos del cliente | |
//  | `---------------------' |
//  `-------------------------'
```

Dos líneas en blanco arriba, una abajo.

Ejemplo:
```js
client.once(Events.ClientReady, () => {


//  .-------------------------.
//  | .---------------------. |
//  | |   Comandos Slash    | |
//  | `---------------------' |
//  `-------------------------'

client.on('interactionCreate', ...
```

#### Comentario simple

Para secciones pequeñas o agrupaciones menores.

```js
// Showcase
// Honeypot
// Config interna
```

Una línea en blanco arriba.

### Consistencia ante todo

Al modificar código existente, seguir el estilo del archivo. No mezclar estilos.


