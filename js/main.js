// jshint ignore: start

$( document ).ready(function() {
    getMovies();
});

var movies;
var people;
var species;
var tableBody = $("#dym-table tbody ");

function getMovies(){
	$.get( "https://swapi.co/api/films/", function( data ) {
  		//console.log(data.results);
  		movies = data.results;
  		getCharacters(movies);
  		fillTable(movies);
	});
}


function getCharacters(movies){
	$.each(movies, function(i, item) {
		$.each(item.characters, function(i, item) {	
			$.get(item, function( data ) {
				//console.log(data);
				people = data;
				getSpecies(people);
			});
		});
	});	
}


function getSpecies(people){
	$.get(people.species, function( data ) {
		console.log(data);
		species = data;
	});
}



function fillTable(data){
  tableBody.html('');
  $.each(data, function(i, item) {
    var $tr = $('<tr>').append(
      $('<td>').text(item.episode_id),
      $('<td>').text(item.title),
      $('<td>').text(item.release_date)
    ).appendTo(tableBody);
  });
}