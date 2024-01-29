import {
  ApiError,
  ApiResponse,
  FullMovieResponse,
  Movie,
  MovieReview,
} from "./typesApi";
import placeHolder from "../assets/movie-placeholder.png";

// !! ADD YOUR API KEY BELOW !!
const apiKey = process.env.API_KEY || ""; // ADD THE KEY HERE!

const apiUrl = "https://api.themoviedb.org/3";

class ApiClient {
  private apiKey: string;
  public apiUrl: string;
  private imageUrl = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";
  constructor(apiKey: string, apiUrl: string) {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  buildMoviePosterUrl(relativeUrl: string): string {
    if (!relativeUrl) return placeHolder;
    return `${this.imageUrl}${relativeUrl}`;
  }

  async getMovieDetail(movieId: string): Promise<FullMovieResponse | ApiError> {
    try {
      const response = await fetch(
        `${apiUrl}/movie/${movieId}?api_key=${this.apiKey}`,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data: FullMovieResponse = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      return {
        message: "An error has ocurred while fetching data",
      } as ApiError;
    }
  }

  async getMovieList(
    searchText = "star wars",
    currentPage = 1
  ): Promise<ApiResponse<Movie> | ApiError> {
    try {
      const response = await fetch(
        `${apiUrl}/search/movie?query=${searchText}&page=${currentPage}&api_key=${this.apiKey}`,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data: ApiResponse<Movie> = await response.json();

      return data;
    } catch (err) {
      console.error(err);
      return {
        message: "An error has ocurred while fetching data",
      } as ApiError;
    }
  }

  async getMovieReviewList(
    movieId: string
  ): Promise<ApiResponse<MovieReview> | ApiError> {
    try {
      const response = await fetch(
        `${apiUrl}/movie/${movieId}/reviews?api_key=${this.apiKey}`,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data: ApiResponse<MovieReview> = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      return {
        message: "An error has ocurred while fetching data",
      } as ApiError;
    }
  }

  async getMovieListNowPlaying(): Promise<ApiResponse<Movie> | ApiError> {
    try {
      const response = await fetch(
        `${apiUrl}/movie/now_playing?api_key=${this.apiKey}`,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data: ApiResponse<Movie> = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      return {
        message: "An error has ocurred while fetching data",
      } as ApiError;
    }
  }

  async getMovieListUpcoming(): Promise<ApiResponse<Movie> | ApiError> {
    try {
      const response = await fetch(
        `${apiUrl}/movie/upcoming?api_key=${this.apiKey}`,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data: ApiResponse<Movie> = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      return {
        message: "An error has ocurred while fetching data",
      } as ApiError;
    }
  }
}

// The Singleton Pattern (Api Client, Db Client)
export default new ApiClient(apiKey, apiUrl);
