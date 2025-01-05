import { Router, type Request, type Response } from 'express';
import WeatherService from '../../service/weatherService.js';

const router = Router();

// const queryURL = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API key}`;

// import HistoryService from '../../service/historyService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // TODO-COMPLETE: GET weather data from city name
  const weatherData = await WeatherService.getWeatherForCity(req.body.cityName);

  // TODO: save city to search history

  res.json(weatherData);
});

// TODO: GET search history
// router.get('/history', async (req: Request, res: Response) => {});

// * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (req: Request, res: Response) => {});

export default router;
