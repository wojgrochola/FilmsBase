/**
 * Jquery functions to index page
 */


$(document).ready( function() {
	showData();
});

function showData() {
    var dataListArray = [];
    var row = '';
    var number = 1;
	$.getJSON('/filmlist/sorteddate', function(data){

		dataListArray = data;
		$.each(data, function() {
            if (number < 4) {
                row += '<div class="col-lg-4">'
                row += '<img class="img" src="../images/' + this.filename + '", alt="Generic placeholder image", width="140", height="200">';
                row += '<h2>' + this.name + '</h2>';
                row += '<a class="btn btn-default" href="/filmpage/' + this._id + '" role="button">  Zobacz wiecej: </a>';
                row += '</div>';
                number += 1;
            }


		});
        $('div.container.marketing div.row').html(row);
	});
}



