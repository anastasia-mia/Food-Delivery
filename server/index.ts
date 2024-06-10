import express from 'express';
import userRoutes from './src/routes/userRoutes'
const app = express();

app.use(express.json());
app.use('/api', userRoutes)

app.listen(3001, () => {
    console.log('Listening on port 3001');
})