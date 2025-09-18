import {v2 as cloudinary} from 'cloudinary'
import {ENV} from './env.js'

// Validate required environment variables
const requiredEnvVars = {
  cloudName: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET
}

for (const [key, value] of Object.entries(requiredEnvVars)) {
  if (!value) {
    throw new Error(`Missing required Cloudinary environment variable: ${key}`)
  }
}

cloudinary.config({
    cloudName: requiredEnvVars.cloudName,
    api_key: requiredEnvVars.api_key,
    api_secret: requiredEnvVars.api_secret
})
export default cloudinary