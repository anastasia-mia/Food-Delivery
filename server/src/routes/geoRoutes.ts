import express from 'express';
import {fetchAddress, fetchCityCoordinates, getCities, getCountries} from '../controllers/geoController';

const router = express.Router();

router.get('/countries', getCountries);
router.get('/cities', getCities);
router.get('/coordinates', fetchCityCoordinates);
router.get('/address', fetchAddress);

export default router;