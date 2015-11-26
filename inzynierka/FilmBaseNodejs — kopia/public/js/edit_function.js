/**
 * New node file
 */
var dataListArray = [];

$(document).ready( function() {
	showEditForm();
    //$('body').on('click', 'a.linkeditfilm', editFilm);
});

function showEditForm() {

    var id =$("input[name=id]").val();
	$.getJSON('/getfilm/' + id, function(data){

		dataListArray = data;
        //$(document.body).append(dataListArray[0].name);
        $("input[name=name]").val(dataListArray[0].name);
        $("input[name=genre]").val(dataListArray[0].genre);
        $("input[name=year]").val(dataListArray[0].year);
        $("input[name=country]").val(dataListArray[0].country);
        $("textarea[name=details]").val(dataListArray[0].details);

	});
}
//
//function editFilm(event) {
//    var id =$("input[name=id]").val();
//    event.preventDefault();
//    var confirmation = confirm('Czy napewno zapisac zmiany??');
//    if (confirmation === true) {
//        $.ajax({
//            type: 'PUT',
//            url: '/editfilm/' + id
//        }).done(function( response ) {
//            window.location.href = "/all";
//            $(document.body).append('hello');
//        });
//
//    }
//    else {
//        return false;
//
//    }
//
//};



