
const { MONGODB_URI, PORT, TMDB_API_URL, TMDB_API_KEY } = process.env;
const config = {
    app: {
        port: PORT,
    },
    db: {
        uri: MONGODB_URI,
    },
    tmdb: {
        apiUrl: TMDB_API_URL,
        apiKey: TMDB_API_KEY,
    }
}

// In future, export conditionally
export default config;
