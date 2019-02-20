$(document).ready(function(){
    // inisialisasi API url
    var url = 'http://my-json-server.typicode.com/talithaizza/belajar-api/mahasiswa';

    // untuk menampung semua data mahasiswa
    var result='';
    //untuk menampung semua gender mahasiswa
    var gender = [];
    // untuk menampung gender sbg option di select
    var gender_result= '';
    

    $.get(url, function (data) {
        $.each(data, function(key, items){
            _gend = items.gender;

            result += '<div>' +
                '<h3>'+items.name+'</h3>' +
                '<p>'+_gend+'</p>' +
                '</div>';

            if($.inArray(_gend, gender) === -1){
                gender.push(_gend);
                gender_result += "<option value='"+_gend+"'>"+_gend+"</option>";
            }
        });

        $('#mhs-list').html(result);
        $('#mhs-select').html(gender_result);
    
    });
    
});