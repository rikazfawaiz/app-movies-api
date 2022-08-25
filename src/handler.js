const { nanoid } = require('nanoid');
const movies = require('./movies');

const addMovie = (request, h) => {
    const { title, year, runtime, genres, director, plot } = request.payload;
    const id = nanoid(16);
    const insertDate = new Date().toISOString();
    const updateDate = insertDate;

    const newMovie = {id, title, year, runtime, genres, director, plot, insertDate, updateDate}

    const status = validationData(newMovie);

    console.log(status);
    if(status[0]){
        const response = h.response({
            status: 'fail',
            message: `Gagal memasukkan data. ${status[1]} harus diisi.`,
        });
        response.code(400);
        return response;
    }

    movies.push(newMovie);

    const isSuccess = movies.filter((movie) => movie.id === id).length > 0;

    if(isSuccess) {
        const response = h.response({
            status: 'success',
            mesage: 'Data berhasil dimasukkan',
            data: {
                movies,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        mesage: 'Data gagal dimasukkan'
    });
    response.code(400);
    return response;
}

const showAllMovies = () => ({
    status: 'success',
    data: {
        movie : movies,
    },
});

const showMovieById = (request, h) => {
    const { movieId } = request.params;
    const movie = movies.filter((movie) => movie.id === movieId)[0];

    if(movie !== undefined) {
        return ({
            status: 'success',
            data: {
                movie: movie,
            },
        });
    }

    const response = h.response({
        status: 'fail',
        mesage: 'Gagal menampilkan data. Id tidak ditemukan'
    });
    response.code(400);
    return response;
};

const editMovieById = (request, h) => {
    const { title, year, runtime, genres, director, plot } = request.payload;
    const updateDate = new Date().toISOString();
    const { movieId } = request.params;

    const index = movies.findIndex((movie) => movie.id === movieId);

    const newMovie = {title, year, runtime, genres, director, plot, updateDate}

    const status = validationData(newMovie);
    
    console.log(status);
    if(status[0]){
        const response = h.response({
            status: 'fail',
            message: `Gagal memasukkan data. ${status[1]} harus diisi.`,
        });
        response.code(400);
        return response;
    }

    if(index !== -1){
        movies[index] = {
            ...movies[index], ...newMovie,
        };
        const response = h.response({
            status: 'success',
            mesage: 'Berhasil memperbarui data',
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        mesage: 'Gagal memperbarui data. Id tidak ditemukan'
    });
    response.code(400);
    return response;    
};

const deleteMovieById = (request, h) => {
    const { movieId } = request.params;
    const index = movies.findIndex((movie) => movie.id === movieId);

    if(index !== -1) {
        movies.splice(index,1);
        const response = h.response({
            status: 'success',
            mesage: 'Berhasil menghapus data',
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'fail',
        mesage: 'Gagal menghapus data. Id tidak ditemukan'
    });
    response.code(400);
    return response;  
}

const validationData = (data) => {
    if (data.title === undefined || data.title === ''){
        return [true, 'Title'];
    } else if (data.year === undefined || data.year === ''){
        return [true, 'Year'];
    } else if (data.runtime === undefined || data.runtime === ''){
        return [true, 'Runtime'];
    } else if (data.genres[0] === undefined || data.genres[0] === ''){
        return [true, 'Genre'];
    } else if (data.director === undefined || data.director === ''){
        return [true, 'Director'];
    } else if (data.plot === undefined || data.plot === ''){
        return [true, 'Plot'];
    } else {
        return [false];
    }
}

module.exports = { addMovie, showAllMovies, showMovieById, editMovieById, deleteMovieById };