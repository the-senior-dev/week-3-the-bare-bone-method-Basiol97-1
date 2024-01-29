import placeholder from "../assets/movie-placeholder.png";

export default class ApiClient {
  private apiKey: string;
  private apiUrl: string;
  private imageUrl: string;

  constructor(apiUrl: string, apiKey: string) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
    this.imageUrl = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";
  }

  private async fetchFromApi<T>(url: string): Promise<T | ApiError> {
    try {
      const response = await fetch(url, {
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },

      });
      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
      }
      return (await response.json()) as T;
    } catch (err) {
      // console.error(err);
      // TODO: push this to a logging service
      return {
        message: "An error has occurred while fetching data",
      } as ApiError;
    }
  }

  buildMoviePosterUrl(relativeUrl: string): string {
    if (!relativeUrl) return placeholder;
    return `${this.imageUrl}${relativeUrl}`;
  }

  async getMovieDetail(movieId: string): Promise<FullMovieResponse | ApiError> {
    const url = `${this.apiUrl}/movie/${movieId}?api_key=${this.apiKey}`;
    return this.fetchFromApi<FullMovieResponse>(url);
  }

  async getMovieList(): Promise<ApiResponse<Movie> | ApiError> {
    const url = `${this.apiUrl}/search/movie?query=star%20wars&api_key=${this.apiKey}`;
    return this.fetchFromApi<ApiResponse<Movie>>(url);
  }

  async getMovieReviewList(
    movieId: string
  ): Promise<ApiResponse<MovieReview> | ApiError> {
    const url = `${this.apiUrl}/movie/${movieId}/reviews?api_key=${this.apiKey}`;
    return this.fetchFromApi<ApiResponse<MovieReview>>(url);
  }

  async getMovieListNowPlaying(): Promise<ApiResponse<Movie> | ApiError> {
    const url = `${this.apiUrl}/movie/now_playing?api_key=${this.apiKey}`;
    return this.fetchFromApi<ApiResponse<Movie>>(url);
  }

  async getMovieSimilar(
    movieId: string
  ): Promise<ApiResponse<Movie> | ApiError> {
    const url = `${this.apiUrl}/movie/${movieId}/recommendations?api_key=${this.apiKey}`;
    return this.fetchFromApi<ApiResponse<Movie>>(url);
  }

  async getMovieListTopRated(): Promise<ApiResponse<Movie> | ApiError> {
    const url = `${this.apiUrl}/movie/top_rated?api_key=${this.apiKey}`;
    return this.fetchFromApi<ApiResponse<Movie>>(url);
  }

  async getMovieCredits(
    movieId: string
  ): Promise<MovieCreditsResponse | ApiError> {
    const url = `${this.apiUrl}/movie/${movieId}/credits?api_key=${this.apiKey}`;
    return this.fetchFromApi<MovieCreditsResponse>(url);
  }

  async getMovieImages(
    movieId: string
  ): Promise<MovieImageResponse | ApiError> {
    const url = `${this.apiUrl}/movie/${movieId}/images?api_key=${this.apiKey}`;
    return this.fetchFromApi<MovieImageResponse>(url);
  }
}
