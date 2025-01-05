import dotenv from 'dotenv';
dotenv.config();

// TODO-COMPLETE: Define an interface for the Coordinates object
interface Coordinates {
  name: string;
  lat: number;
  lon: number;
}

// TODO-COMPLETE: Define a class for the Weather object
class Weather {
  city: string;
  tempF: number;
  windSpeed: number;
  humidity: number;
  date: string;
  icon: string;
  iconDescription: string;

  constructor(city: string, temp:number, wind:number, humidity:number, date: string, icon: string, description: string) {
    this.city = city;
    this.tempF = temp;
    this.windSpeed = wind;
    this.humidity = humidity;
    this.date = date;
    this.icon = icon;
    this.iconDescription = description;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO-COMPLETE: Define the baseURL, API key, and city name properties
  private baseURL?: string; //https://api.openweathermap.org
  private keyAPI?: string;
  private cityName: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.keyAPI = process.env.API_KEY || '';
    this.cityName = '';
  }

  // TODO-COMPLETE: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  private async fetchLocationData(query: string) {
    try {
      const response = await fetch(`${this.baseURL}/geo/1.0/direct?q=${query},US&limit=1&appid=${this.keyAPI}`);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      };

      const locationData = await response.json();
      console.log(locationData);

      return locationData[0];

    } catch (error:any) {
      console.error(error.message);
    }
  }

  // TODO-COMPLETE: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  private destructureLocationData(locationData: Coordinates): Coordinates {

    const desLocationData: Coordinates = {
      name: locationData.name,
      lat: locationData.lat,
      lon: locationData.lon
    };

    this.cityName = desLocationData.name;
    console.log("\n", desLocationData, "\n");

    return desLocationData;
  }

  // TODO-COMPLETE: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  private buildGeocodeQuery(): string {
    const geocodeQuery: string = this.cityName;
    return geocodeQuery;
  }

  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // private buildWeatherQuery(coordinates: Coordinates): string {
  //   const weatherQuery: string = JSON.stringify(coordinates);
  //   return weatherQuery;
  // }

  // TODO-COMPLETE: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  private async fetchAndDestructureLocationData() {
    const geocodeQuery = this.buildGeocodeQuery();

    const locationData = await this.fetchLocationData(geocodeQuery);

    const destructuredData: Coordinates = this.destructureLocationData(locationData);

    return destructuredData;
  }

  // TODO-COMPLETE: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  private async fetchWeatherData(coordinates: Coordinates) {
    try {
      const response = await fetch(`${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.keyAPI}&units=imperial`);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      };

      const weatherData = await response.json();

      const weatherDataList = weatherData.list;

      return weatherDataList;

    } catch (error:any) {
      console.error(error.message);
    }
  }
  
  // TODO-COMPLETE: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  private parseCurrentWeather(response: any) {
    const currentWeather: Weather = {
      city: this.cityName,
      tempF: response[0].main.temp,
      windSpeed: response[0].wind.speed,
      humidity: response[0].main.humidity,
      date: response[0].dt_txt,
      icon: response[0].weather[0].icon,
      iconDescription: response[0].weather[0].description,
    };
    return currentWeather;
  }

  // TODO-COMPLETE: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const dayOne = this.parseCurrentWeather(weatherData.slice(7));
    const dayTwo = this.parseCurrentWeather(weatherData.slice(15));
    const dayThree = this.parseCurrentWeather(weatherData.slice(23));
    const dayFour = this.parseCurrentWeather(weatherData.slice(31));
    const dayFive = this.parseCurrentWeather(weatherData.slice(39));

    const fiveDayForecast = [dayOne, dayTwo, dayThree, dayFour, dayFive];

    const weatherForecastArray = [currentWeather, ...fiveDayForecast];

    console.log(weatherForecastArray);

    return weatherForecastArray;
  }
  
  // TODO-COMPLETE: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
  async getWeatherForCity(city: string) {
    this.cityName = city;
    try {
      const locationData = await this.fetchAndDestructureLocationData();
      const weatherData = await this.fetchWeatherData(locationData);
      const currentWeather = this.parseCurrentWeather(weatherData);
      const forecastArray = this.buildForecastArray(currentWeather, weatherData);
  
      return forecastArray;

    } catch(error){
      console.log('Error:', error);
      return error;
    };
  }
}

export default new WeatherService();
