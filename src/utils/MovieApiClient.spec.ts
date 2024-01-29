import fetch from "jest-fetch-mock";
import MovieApiClient from "./MovieApiClient";

describe("MovieApiClient", () => {
  const mockApiKey = "test-api-key";
  const mockApiUrl = "https://api.themoviedb.org/3";
  const client = new MovieApiClient(mockApiUrl, mockApiKey);
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  beforeEach(() => {
    fetch.resetMocks();
  });

  describe("getMovieDetail", () => {
    const movieId = "123";

    const mockMovieDetail = {
      id: movieId,
      title: "Test Movie",
      release_date: "2021-01-01",
      overview: "This is a test movie",
    };

    it("fetches movie details successfully", async () => {
      fetch.mockResponseOnce(JSON.stringify(mockMovieDetail));
      const response = await client.getMovieDetail(movieId);

      expect(response).toEqual(mockMovieDetail);
      expect(fetch).toHaveBeenCalledWith(
        `${mockApiUrl}/movie/${movieId}?api_key=${mockApiKey}`,
        { headers }
      );
    });
  });

  describe("getMovieList", () => {
    const query = "star wars";
    const mockMovieList = {
      results: [{ id: "1", title: "Star Wars: Episode IV" }],
      total_results: 1,
      total_pages: 1,
    };

    it("fetches movie list successfully", async () => {
      fetch.mockResponseOnce(JSON.stringify(mockMovieList));
      const response = await client.getMovieList();
      expect(response).toEqual(mockMovieList);
      expect(fetch).toHaveBeenCalledWith(
        `${mockApiUrl}/search/movie?query=${encodeURIComponent(
          query
        )}&api_key=${mockApiKey}`,
        { headers }
      );
    });
  });

  describe("getMovieReviewList", () => {
    const movieId = "123";
    const mockReviews = {
      id: movieId,
      page: 1,
      results: [
        { id: "review1", author: "Reviewer 1", content: "Great movie!" },
      ],
      total_pages: 1,
      total_results: 1,
    };

    it("fetches movie reviews successfully", async () => {
      fetch.mockResponseOnce(JSON.stringify(mockReviews));
      const response = await client.getMovieReviewList(movieId);
      expect(response).toEqual(mockReviews);
      expect(fetch).toHaveBeenCalledWith(
        `${mockApiUrl}/movie/${movieId}/reviews?api_key=${mockApiKey}`,
        { headers }
      );
    });
  });

  describe("getMovieListNowPlaying", () => {
    const mockNowPlaying = {
      results: [{ id: "1", title: "Now Playing Movie 1" }],
      page: 1,
      total_pages: 1,
      total_results: 1,
    };

    it("fetches now playing movies successfully", async () => {
      fetch.mockResponseOnce(JSON.stringify(mockNowPlaying));
      const response = await client.getMovieListNowPlaying();
      expect(response).toEqual(mockNowPlaying);
      expect(fetch).toHaveBeenCalledWith(
        `${mockApiUrl}/movie/now_playing?api_key=${mockApiKey}`,
        { headers }
      );
    });
  });

  describe("getMovieCredits", () => {
    const movieId = "123";
    const mockCredits = {
      id: movieId,
      cast: [{ id: "cast1", name: "Actor 1", character: "Character 1" }],
      crew: [{ id: "crew1", name: "Director 1", job: "Director" }],
    };

    it("fetches movie credits successfully", async () => {
      fetch.mockResponseOnce(JSON.stringify(mockCredits));
      const response = await client.getMovieCredits(movieId);
      expect(response).toEqual(mockCredits);
      expect(fetch).toHaveBeenCalledWith(
        `${mockApiUrl}/movie/${movieId}/credits?api_key=${mockApiKey}`,
        { headers }
      );
    });
  });

  describe("getMovieImages", () => {
    const movieId = "123";
    const mockImages = {
      id: movieId,
      backdrops: [{ file_path: "/backdrop1.jpg", width: 1000, height: 500 }],
      posters: [{ file_path: "/poster1.jpg", width: 500, height: 750 }],
    };

    it("fetches movie images successfully", async () => {
      fetch.mockResponseOnce(JSON.stringify(mockImages));
      const response = await client.getMovieImages(movieId);
      expect(response).toEqual(mockImages);
      expect(fetch).toHaveBeenCalledWith(
        `${mockApiUrl}/movie/${movieId}/images?api_key=${mockApiKey}`,
        { headers }
      );
    });
  });
});
