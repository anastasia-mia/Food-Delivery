import express from 'express';
import cors from "cors";
import userRoutes from './routes/userRoutes'
import restaurantRoutes from "./routes/restaurantRoutes";
import menuRoutes from "./routes/menuRoutes";
import checkoutRoutes from "./routes/checkoutRoutes";
const app = express();
app.use(cors());

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', restaurantRoutes);
app.use('/api/menu-items', menuRoutes)
app.use('/api', checkoutRoutes)

app.listen(3001, () => {
    console.log('Listening on port 3001');
})