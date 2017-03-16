/**
 * Created by limjohn on 3/16/2017.
 */
$("#question").text("What is Lethe?");

var n = 0;

var bot = new cleverbot("ZK1hPrwwsSGA2n54", "69SrxT1sFiR7fJ0GvQvHFn1DDqNAeZzh"); // Set up keys

bot.setNick("lethe.test"); // Set a nickname

bot.create(function (err, session) { // Initialize Cleverbot
    bot.ask("What is Lethe?", function (err, response) {
        $("#response").text(response); // Will likely be: "Living in a lonely world"
    });

    $("#question").on('keyup', function(e) {
        if (e.keyCode == 13) {
            bot.ask($(this).text(), function (err, response) {
                $("#response").text(response); // Will likely be: "Living in a lonely world"
            });
            $("#question").val("");
            n++;
            if (n > 5) {
                window.location = '/Elysium';
            }
            return false;
        }
    });
});

$("#forget").text('This person was one of the most controversial leaders from human history. However, ever since he has' +
    'realized foreign lives he sacrificed in order to protect the domestic economy, he voluntarily chose to drink away ' +
    'these waters. He has drank too much water from the river of Lethe to the point where he can\'t even remember his own' +
    ' name. He is now an empty husk, nothing more than that..');

// $(document).click(
//     function(e) {
//         var oldText = $("#forget").text();
//         var index = Math.floor(Math.random() * oldText.length);
//         var randomChar = (+new Date * Math.random()).toString(36).substring(0,1);
//         $("#forget").text(oldText.substring(0, index) + randomChar + oldText.substring(index+1, oldText.length));
//         return false;
//     }
// );

