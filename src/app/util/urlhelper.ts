export class URLHelper {
  static readonly BASE_URL = "http://localhost:8080";
  static readonly LOGIN_URL = `${URLHelper.BASE_URL}\\login`;
  static readonly BOOKS_URL = `${URLHelper.BASE_URL}\\books`;
  static readonly BOOKS_PAGE_URL = `${URLHelper.BASE_URL}\\books?page=`;
  static readonly READERS_URL = `${URLHelper.BASE_URL}\\readers`;
  static readonly READERS_PAGE_URL = `${URLHelper.BASE_URL}\\readers?page=`;
  static readonly PHOTOS_URL = `${URLHelper.BASE_URL}\\photos`;
  static readonly AUTHORS_URL = `${URLHelper.BASE_URL}\\authors`;
  static readonly AUTHOR_PAGE_URL = `${URLHelper.BASE_URL}\\authors?page=`;
  static readonly BOOK_KEEPER = `${URLHelper.BASE_URL}\\book-keeper`;
}
