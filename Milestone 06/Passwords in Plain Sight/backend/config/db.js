import mongoose from 'mongoose'

const connectDB = async () => {
  const uri = process.env.MONGO_URI

  if (!uri) {
    console.error('Error: Missing MONGO_URI. Check backend/.env and dotenv config path.')
    process.exit(1)
  }

  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
