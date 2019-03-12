$(document).ready(function(){
    // inisialisasi API url
    var url = 'http://my-json-server.typicode.com/talithaizza/belajar-api/mahasiswa';

    // untuk menampung semua data mahasiswa
    var result='';
    //untuk menampung semua gender mahasiswa
    var gender = [];
    // untuk menampung gender sbg option di select
    var gender_result= '';
    

    // $.get(url, function (data) {
        function renderPage(data){
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
        $('#mhs-select').html("<option value='semua'>semua</option>"+gender_result);
        }
        
    // });

    var networkDataReceive = false;
    /* 
    * Start balapan antara service dengan cache 
    * Fresh data from online service
    * */
    var networkUpdate = fetch(url).then(function(response){
        return response.json();
    }).then(function (data){
        networkDataReceive = true;
        renderPage(data);
    });

    /* Ambilkan data dalam local cache */
    caches.match(url).then(function(response){
        if(!response) throw Error( "no data on cache" )
            return response.json();
    }).then(function(data){
        if(!networkDataReceive){
            renderPage(data);
            console.log("render from cache");
        }
    }).cache(function(){
        return networkUpdate;
    });



    //filter data
    $("#mhs-select").on('change', function(){
        updateListMahasiswa($(this).val());
    });

    function updateListMahasiswa(opt){
        var result = '';
        var url2 = url;

        if (opt !==  'semua'){
            url2 = url + '?gender=' + opt;
        }

        $.get(url2, function (data) {
            $.each(data, function(key, items){
                _gend = items.gender;
    
                result += '<div>' +
                    '<h3>'+items.name+'</h3>' +
                    '<p>'+_gend+'</p>' +
                    '</div>';
            });
    
            $('#mhs-list').html(result);
           
        
        });
    }

});

if('serviceWorker' in navigator){
    window.addEventListener('load', function(){
        navigator.serviceWorker.register('/serviceworker.js').then(
            function(reg){
                //regristrasi service worker berhail
                console.log('SW registration success, scope : ', reg.scope);
            }, function(err){
                //reg failed
                console.log('SW regristration failed : ', err);
            }
        )
    })
}