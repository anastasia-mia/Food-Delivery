import express from 'express';
import cors from "cors";
import session from 'express-session';
import userRoutes from './routes/userRoutes'
import restaurantRoutes from "./routes/restaurantRoutes";
import menuRoutes from "./routes/menuRoutes";
import orderRoutes from "./routes/orderRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import {sessionStore} from "./config/database";
const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:5173'}))

app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: false,
        maxAge: 3600000
    },
}));

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', restaurantRoutes);
app.use('/api/menu-items', menuRoutes)
app.use('/api', orderRoutes)
app.use(dashboardRoutes);

app.listen(3001, () => {
    console.log('Listening on port 3001');
})