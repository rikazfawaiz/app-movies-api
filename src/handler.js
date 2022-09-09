const { nanoid } = require('nanoid');
const Movies = require('./models/movie');
const dbconn = require('./dbconfig/index');

const addMovie = async (request, h) => {
    const { title, year, runtime, genres, director, plot } = request.payload;
    const id = nanoid(16);
    let isSuccess = false;

    const newMovie = {id, title, year, runtime, genres, director, plot}

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

    //Insert To DB
    try {
        // create db
        // await Movies;
        // dbconn.sync();

        const movie = await Movies.create({
            id: id, 
            title: title, 
            year: year, 
            runtime:  runtime, 
            genres: genres.toString(), 
            director: director, 
            plot: plot
        });
        isSuccess = true;
    } catch (error) {
        console.log(error);
    }    

    if(isSuccess) {
        const response = h.response({
            status: 'success',
            mesage: 'Data berhasil dimasukkan',
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

const showAllMovies = async (_, h) => {
    const movies = await Movies.findAll();
    const response = h.response({
        status: 'success',
        data: {
            movie: movies,
        },
    });
    response.code(201);
    return response;
}

const showMovieById = async (request, h) => {
    const { movieId } = request.params;
    const movie = await Movies.findOne({
        where: {
            id: movieId
        }
    });

    if(movie) {
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

const editMovieById = async (request, h) => {
    const { title, year, runtime, genres, director, plot } = request.payload;
    const { movieId } = request.params;

    const newMovie = {title, year, runtime, genres, director, plot}
    const status = validationData(newMovie);
    
    if(status[0]){
        const response = h.response({
            status: 'fail',
            message: `Gagal memasukkan data. ${status[1]} harus diisi.`,
        });
        response.code(400);
        return response;
    }

    const movie = await Movies.findOne({
        where: {
            id: movieId
        }
    });

    if(movie){
        await Movies.update({
            title: title, 
            year: year, 
            runtime:  runtime, 
            genres: genres.toString(), 
            director: director, 
            plot: plot
        },{
            where: { id: movieId },
        });
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

const deleteMovieById = async(request, h) => {
    const { movieId } = request.params;
    const movie = await Movies.findOne({
        where: {
            id: movieId
        }
    });

    if(movie){
        await Movies.destroy({
            where: {
                id: movieId
            }
        });
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