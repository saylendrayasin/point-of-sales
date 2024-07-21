export default class Config {
  static baseApi = process.env.REACT_APP_API_URL;
  static apiUrl(url: string) {
    return `${Config.baseApi}${url}`;
  }
}
