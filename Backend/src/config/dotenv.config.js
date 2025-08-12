const path = require('path')
const dotenv = require('dotenv')

// If NODE_ENV=development, env=.env.development
// If NODE_ENV=production, env=.env.production
const env = process.env.NODE_ENV||"development";

dotenv.config({
    path:path.resolve(process.cwd(),`.env.${env}`)
})

console.log(`[.env] loaded .env.${env}`)