import express from 'express';
import cors from "cors";
import userRoutes from './src/routes/userRoutes'
import restaurantRoutes from "./src/routes/restaurantRoutes";
const app = express();
app.use(cors());

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', restaurantRoutes);

app.listen(3001, () => {
    console.log('Listening on port 3001');
})