export class URLHelper {
  static readonly BASE_URL = "http://localhost:8080";
  static readonly LOGIN_URL = `${URLHelper.BASE_URL}\\login`;
  static readonly BOOKS_URL = `${URLHelper.BASE_URL}\\books`;
  static readonly READERS_URL = `${URLHelper.BASE_URL}\\readers`;
  static readonly READERS_PAGE_URL = `${URLHelper.BASE_URL}\\readers?page=`;

}
