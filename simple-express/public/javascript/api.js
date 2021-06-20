


$(function () {
    $.ajax({
        url: "/api/stock",
        type: "GET",
        dataType: "json",
        complete: function() {
            console.log('process complete');
        },
        success: function(data) {
            console.log(data);
        },
        error: function() {
            console.log('process error');
        },
    });

    axios.get("/api/stock")
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
});


//   fetch('/api/stock')
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(data) {
//     console.log(data);
//   });

