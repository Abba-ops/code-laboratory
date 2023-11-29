class Forecast {
  constructor() {
    this.key = "u4l7E39xCRmz86IrknRJA63wCnaKFJDG";
    this.weatherUrl =
      "http://dataservice.accuweather.com/currentconditions/v1/";
    this.cityUrl =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
  }

  async updateCity(city) {
    const cityDetails = await this.getCity(city);
    const weather = await this.getWeather(cityDetails.Key);
    return {
      cityDetails,
      weather,
    };
  }

  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const res = await fetch(this.cityUrl + query);
    const data = await res.json();
    return data[0];
  }

  async getWeather(id) {
    const query = `${id}?apikey=${this.key}`;
    const res = await fetch(this.weatherUrl + query);
    const data = await res.json();
    return data[0];
  }
}
