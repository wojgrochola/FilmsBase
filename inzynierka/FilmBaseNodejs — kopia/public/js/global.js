/**
 * New node file
 */
var dataListArray = [];

$(document).ready( function() {

     showData();
	 $('table tbody').on('click', 'td a.linkdeletefilm', deleteFilm);
	 //$('table tbody').on('click', 'td a.linkeditfilm', showEditData);

});

function showData() {

	var table = '';
    var row = '';
    var number = 1;
	$.getJSON('/filmlist', function(data){

		dataListArray = data;
		$.each(data, function() {
            //$(document.body).append(this.name);
            //row = '';

			table += '<tr>';
            table += '';
            table += '<td class=\'vert-align\'> <a href="/filmpage/' + this._id + '" >  <div style="height:100%;width:100%"><img src="../images/' + this.filename + '" width="140", height="200"></div></a>  </td> ';
            table += "";
            table += '<td class=\'vert-align\'> ' + this.name + ' </td>';
			table += '<td>' + this.year + '</td>';
			table += '<td>' + this.genre + '</td>';
			
			table += '<td>' + this.country + '</td>';
			table += '<td><a href="/deletefilm/' + this._id + '" class="linkdeletefilm"rel="' + this._id + '" ><span class="glyphicon glyphicon-remove"></span> remove</a></td>';
			table += '<td><a href="/editfilm/' + this._id + '" class="linkeditfilm" rel="' + this._id + '"><span class="glyphicon glyphicon-edit"></span> edit</a></td>';
			table += '</tr>';




		});
        $('div.container.marketing div.row').html(row);
		$('table tbody').html(table);
	});
}





function deleteFilm(event) {

  event.preventDefault();
  var confirmation = confirm('Czy napewno usunac ten wpis??');
  if (confirmation === true) {
	  $.ajax({
          type: 'DELETE',
          url: '/deletefilm/' + $(this).attr('rel')
      }).done(function( response ) {
          if (response.msg === '') {
          }
          else {
              alert('Error: ' + response.msg);
          }
          showData();
      });

  }
  else {
    return false;

  }

};




