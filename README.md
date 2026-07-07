# omnirrom-bot

Bot de Discord para la comunidad de MarioRRom, diseñado para optimizar el flujo de trabajo en el servidor y traer funcionalidades útiles dentro de Discord.

## 🎯 Propósito
`omnirrom-bot` busca servir como una pieza central para el servidor de Mario, ayudando a:

- Mejorar la gestión de canales y mensajes,
- centralice información y comandos,
- Añadir funciones útiles directamente dentro de Discord,
- y ayude a mantener el servidor ordenado y más productivo.

No es un proyecto genérico, sino un bot personalizado para el servidor de Mario que crece junto a sus necesidades.

## 📌 Estado
Actualmente está en una fase inicial (`alpha`), por lo que todavía puede estar en desarrollo y recibiendo mejoras frecuentes.

## 🧩 Características principales

- Comandos de Discord para interacción directa.
- Control y manejo de canales desde el propio bot.
- Integración con una base de datos SQLite para guardar configuraciones y datos.
- Recarga automática en desarrollo con `nodemon`.


## 🐳 Docker

```bash
docker compose up -d
```

Actualizar a nueva versión:

```bash
git pull
docker compose up -d --build
```

### Portainer

1. Stacks → Add stack
2. Repositorio: `https://github.com/MarioRRom/omnirrom-bot`
3. En la sección **Environment variables** del stack, agregar `TOKEN`, `CLIENT_ID` y `GUILD_ID` con sus valores reales. El compose las resuelve automáticamente.
4. Deploy

## 💻 Desarrollo local

```bash
npm install
```

Crear un archivo `.env` en la raíz con las variables necesarias:

```env
TOKEN=tu_token_de_discord
CLIENT_ID=tu_client_id
GUILD_ID=tu_guild_id
```

Ejecutar el bot en modo desarrollo (se recarga automáticamente al guardar cambios con `nodemon`):

```bash
npm run dev
```

## 📂 Estructura básica

- `index.js` — arranca el bot y maneja los eventos principales.
- `deploy-commands.js` — registra los comandos en el servidor.
- `src/commands/` — comandos slash del bot.
- `src/showcase.js` — lógica extra de manejo de mensajes.
- `src/db.js` — base de datos SQLite.

## 💬 Contribuir
Si quieres mejorar el bot o proponer ideas, puedes abrir un issue en:

https://github.com/MarioRRom/omnirrom-bot/issues
