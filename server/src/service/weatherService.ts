import dotenv from 'dotenv';
dotenv.config();

// TODO-COMPLETE: Define an interface for the Coordinates object
interface Coordinates {
  cityName: string;
  latCoord: number;
  longCoord: number;
}

// TODO-COMPLETE: Define a class for the Weather object
class Weather {
  temp:number;
  wind:number;
  humidity:number;

  constructor(temp:number, wind:number, humidity:number) {
    this.temp = temp;
    this.wind = wind;
    this.humidity = humidity;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO-COMPLETE: Define the baseURL, API key, and city name properties
  private baseURL?: string; //https://api.openweathermap.org
  private keyAPI?: string;
  private cityName: string;

  constructor(cityName: string) {
    this.baseURL = process.env.API_BASE_URL || '';
    this.keyAPI = process.env.API_KEY || '';
    this.cityName = cityName;
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

      return locationData;

    } catch (error:any) {
      console.error(error.message);
    }
  }

  // TODO-COMPLETE: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const { cityName, latCoord, longCoord } = locationData;
    return {cityName, latCoord, longCoord};
  }

  // TODO-COMPLETE: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  private buildGeocodeQuery(locationData: Coordinates): string {
    const geocodeQuery: string = JSON.stringify(locationData);
    return geocodeQuery;
  }

  // TODO-COMPLETE: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  private buildWeatherQuery(coordinates: Coordinates): string {
    const weatherQuery: string = JSON.stringify(coordinates);
    return weatherQuery;
  }

  // TODO-COMPLETE: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  private async fetchAndDestructureLocationData() {
    const locationData: Coordinates = await this.fetchLocationData(this.cityName);
    const destructuredData: Coordinates = this.destructureLocationData(locationData);
    return destructuredData;
  }

  // TODO-COMPLETE: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  private async fetchWeatherData(coordinates: Coordinates) {
    try {
      const response = await fetch(`${this.baseURL}/data/2.5/forecast?lat=${coordinates.latCoord}&lon=${coordinates.longCoord}&appid=${this.keyAPI}`);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      };

      const weatherData = await response.json();
      console.log(weatherData);

      return weatherData;

    } catch (error:any) {
      console.error(error.message);
    }
  }
  

  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  private parseCurrentWeather(response: any) {
    const parsedResponse = JSON.parse(response);
    return parsedResponse;
  }

  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const weatherArray = [currentWeather, ...weatherData];
    return weatherArray;
  }
  
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
  async getWeatherForCity(city: string) {
    const locationData = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(locationData);

  }
}

export default new WeatherService();
