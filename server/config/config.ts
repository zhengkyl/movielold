if (process.env.NODE_ENV === "DEVELOPMENT") {
  import("dotenv/config");
}

const { MONGODB_URI, PORT, TMDB_API_KEY } = process.env;

const config = {
    app: {
        port: PORT,
    },
    db: {
        uri: MONGODB_URI,
    },
    tmdb: {
        apiKey: TMDB_API_KEY,
    }
}

// In future, export conditionally
export default config;
