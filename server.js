import express from 'express';
import cors from 'cors'; 
import router from './routes.js';

const app = express();
const port = 3001; 

// Middleware Setup
app.use(cors()); 
app.use(express.json()); 
app.use('/api', router); 

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});