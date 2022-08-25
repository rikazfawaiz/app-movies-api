const { addMovie, showAllMovies, showMovieById, editMovieById, deleteMovieById } = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/movies',
        handler: addMovie,
    },
    {
        method: 'GET',
        path: '/movies',
        handler: showAllMovies,
    },
    {
        method: 'GET',
        path: '/movies/{movieId}',
        handler: showMovieById,
    },
    {
        method: 'PUT',
        path: '/movies/{movieId}',
        handler: editMovieById,
    },
    {
        method: 'DELETE',
        path: '/movies/{movieId}',
        handler: deleteMovieById,
    }
]

module.exports = routes;