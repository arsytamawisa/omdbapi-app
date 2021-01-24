function searchMovie() {
    const s = $('#search-input').val().trim()

    if (s.match(/^ *$/) === null) {
        $.ajax({
            url,
            type: 'GET',
            dataType: 'JSON',
            data: { apikey,s },
            success: result => {
                if (result.Response == "True") {
                    const movies = result.Search
                    $('#movie-list').html('')
                    $.each(movies, (i, movie) => {
                        $('#movie-list').append(`
                        <div class="col-md-3 mb-5">
                            <div class="card h-100">
                                <img class="card-img-top" src="`+ movie.Poster + `" alt="Image">
                                <div class="card-body">
                                    <h5 class="card-title">`+ movie.Title + ` (` + movie.Year + `)</h5>
                                    <a href="#" class="btn btn-dark search-detail" 
                                    data-toggle="modal" data-target="#exampleModal" 
                                    data-id="`+ movie.imdbID + `">
                                        See Detail
                                    </a>
                                </div>
                            </div>
                        </div>
                    `)
                    })
                    $('#search-input').val('')
                }
                else {
                    $('#movie-list').html(`
                    <div class="col-md-12">
                        <h1 class="text-center">
                            Sorry, Movie Not Found.
                        </h1>
                    </div>
                `)
                }
            }
        })
    }
}


function duration(time) {
    if(time == "N/A") return "-"
    else {
        time            = time.split(" ")
        let hours       = (time[0] / 60);
        let rhours      = Math.floor(hours);
        let minutes     = (hours - rhours) * 60;
        let rminutes    = Math.round(minutes);
        rhours          = (rhours>1) ? `${rhours} hours ` : `${rhours} hour `
        rminutes        = (rminutes>1) ? `${rminutes} minutes` : `${rminutes} minute`
        return rhours + rminutes
    }
}

$.each(movies, (i, movie) => {
    $('#movie-list').append(`
        <div class="col-md-3 mb-5">
            <div class="card h-100">
                <img class="card-img-top img-fluid" src="`+ movie.Poster + `">
                <div class="card-body">
                    <h5 class="card-title">`+ movie.Title + ` (` + movie.Year + `)</h5>
                    <a href="#" class="btn btn-dark search-detail" 
                    data-toggle="modal" data-target="#exampleModal" 
                    data-id="`+ movie.imdbID + `">
                        See Detail
                    </a>
                </div>
            </div>
        </div>
    `)
})

$('#movie-list').on('click', '.search-detail', function () {
    $.ajax({
        url,
        type: 'GET',
        dataType: 'JSON',
        data: {
            apikey,
            'i': $(this).data('id')
        },
        success: movie => {
            console.log(movie);
            if (movie.Response == "True") {
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+ movie.Poster + `" class="img-fluid" alt="../img/empty.png">
                            </div>
                            <div class="col-md-8">
                                <h3>`+ movie.Title + ` (` + movie.Year + `)</h3>
                                <p>IMDB Ratings: `+ movie.imdbRating + `</p>
                                <small>Genre: `+ movie.Genre + `</small></p>
                                <small>Duration: `+ duration(movie.Runtime) + `</small>
                            </div>
                        </div>
                    </div>
                `)
            }
        }
    })
})

$('#search-button').on('click', () => searchMovie())
$('#search-input').on('keyup', event => (event.keyCode === 13) ? searchMovie() : '')