# AssesmentNodeTsMongo
This is based on Node with typescript and mongo db database

# For installation used the commands 
npm install express mongoose helmet class-validator class-transformer reflect-metadata
npm install --save-dev typescript ts-node-dev @types/express @types/node
npx tsc --init


# Clone Repo
git clone https://github.com/amit605/assesmentNodeTsMongo.git
cd assesmentNodeTsMongo

# Install Dependencies
npm install

# Configure Environment
Create a .env file at the project root:
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/transcription_db


# Run the Server (Dev Mode)
npm run dev

# Or build + start:
npm run build
npm start

# API Endpoints
1) Create Transcription
POST /api/transcription_create
Request Body:
{
  "audioUrl": "https://example.com/sample.mp3"
}

2) Get Transcription by ID
GET /api/get_transcription_by_id/:id
