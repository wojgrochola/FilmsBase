/**
 * New node file
 */


$(document).ready( function() {
    showFilmInfo();

});

function showFilmInfo() {
    val = '';
    var id =$("input[name=id]").val();
    var dataListArray = [];
    $.getJSON('/getfilm/' + id, function(data){

        dataListArray = data;
        val += '<div class="container">';
        val += '<div class="col-sm-2"> </div>';
        val += '<div class="col-sm-8">'
        val += '<div class="page-header"> <h2>' + dataListArray[0].name + '</h2></div>';
        val += '<div class="col-sm-4"> <img src="../images/' + dataListArray[0].filename + '" width="200", height="300">'    ;
        val += '<a class="btn btn-info" href="/all"> Powrot</a>';
        val += '</div>';
        val += '<div class="col-sm-6">';
        val += '<table class="table">';
        val += '<tr>'
        val += '<td><h4> <b> Gatunek: </b>  </h4></td><td><h4>' + dataListArray[0].genre + '</h4></td>'
        val += '</tr>';
        val += '<tr>'
        val += '<td><h4> <b> Rok: </b>  </h4></td><td><h4>' + dataListArray[0].year + '</h4></td>'
        val += '</tr>';
        val += '<tr>'
        val += '<td><h4> <b> Kraj: </b>  </h4></td><td><h4>' + dataListArray[0].country + '</h4></td>'
        val += '</tr>';
        val += '</table>';
        val += dataListArray[0].details;

        val += '</div>' // div col sm 6


        val += '</div>';

        val += '</div>';

        $("input[name=name]").val(dataListArray[0].name);
        $("input[name=genre]").val(dataListArray[0].genre);
        $("input[name=year]").val(dataListArray[0].year);
        $("input[name=country]").val(dataListArray[0].country);
        $("textarea[name=details]").val(dataListArray[0].details);
        $(document.body).append(val);

    });

    //$('div.container div.mydiv').html(val);
}



