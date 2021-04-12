import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        "api_key": "b71e7ddc0337840f4f46be79b18e4c41",
        "language": "en-US"
    }

})



export const MovieApi = {
    nowPlaying: () => api.get("movie/now_playing"),
    upComing: () => api.get("movie/upcoming"),
    popular: () => api.get("movie/popular"),
    movieDetail: (id) => api.get(`movie/${id}`, {

        params: {
            append_to_response: "videos"
        }
    }),
    search: (term) => api.get("search/movie"
        , {
            params: {
                query: encodeURIComponent(term)
            }
        }
    ),
    credit: (id) => api.get(`movie/${id}/credits`),
    video: (id) => api.get(`movie/${id}/videos`)
}

export const tvApi = {
    topRated: () => api.get("tv/top_rated"),
    popular: () => api.get("tv/popular"),
    airingToday: () => api.get("tv/airing_today"),
    showDetail: (id) => api.get(`tv/${id}`, {
        params: {
            append_to_response: "videos"
        }
    }),
    search: (term) => api.get("search/tv"
        , {
            params: {
                query: encodeURIComponent(term)
            }
        }
    ),
    credit: (id) => api.get(`tv/${id}/credits`),
    video: (id) => api.get(`tv/${id}/videos`)
}