import { Router, type Request, type Response } from 'express';
import weatherService, { Weather } from '../../service/weatherService.js';
import historyService from '../../service/historyService.js';

const router = Router();

// const queryURL = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API key}`;

// TODO-COMPLETE: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    // TODO-COMPLETE: GET weather data from city name
    const weatherData = await weatherService.getWeatherForCity(req.body.cityName) as Weather[];

    // TODO-COMPLETE: save city to search history
    await historyService.addCity(weatherData[0].city);

    res.json(weatherData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// TODO-COMPLETE: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const searchHistory = await historyService.getCities();
    console.log(`\nSearch History:`, searchHistory);
    res.json(searchHistory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// * BONUS TODO-COMPLETE: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ msg: 'City id is required' });
    }
    await historyService.removeCity(req.params.id);
    res.json({ success: 'City successfully removed from search history' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
