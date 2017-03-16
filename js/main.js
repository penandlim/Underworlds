/**
 * Created by limjohn on 3/16/2017.
 */

var debugmode = false;

var states = Object.freeze({
    SplashScreen: 0,
    GameScreen: 1,
    ScoreScreen: 2
});

var currentstate;

//sounds
var volume = 30;
var soundJump = new buzz.sound("assets/sounds/sfx_wing.ogg");
var soundScore = new buzz.sound("assets/sounds/sfx_point.ogg");
var soundHit = new buzz.sound("assets/sounds/sfx_hit.ogg");
var soundDie = new buzz.sound("assets/sounds/sfx_die.ogg");
var soundSwoosh = new buzz.sound("assets/sounds/sfx_swooshing.ogg");
buzz.all().setVolume(volume);

function getCookie(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++)
    {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
}

function setCookie(cname,cvalue,exdays)
{
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

$(document).ready(function() {
    $('textarea').val("");
    if(window.location.search == "?debug")
        debugmode = true;
    if(window.location.search == "?easy")
        pipeheight = 200;

    anime({
        targets: "#text",
        translateY:[
            {value: [0, screen.height / 4], duration: 1000, easing: 'easeOutExpo'}
        ],
        scale: [
            {value: [0, 3], duration: 1200, easing: 'easeOutCirc'}
        ],
        opacity: [
            {value: 0, duration: 0},
            {value: 1, duration: 1500}
        ],
        easing: 'easeOutSine',
        loop: false
    });

    anime({
        targets: "#name",
        delay: 700,
        translateY:[
            {value: [1000, screen.height / 3], duration: 1000, easing: 'easeOutExpo'}
        ],
        scale: [
            {value: [0, 1], duration: 1200, easing: 'easeOutCirc'}
        ],
        easing: 'easeOutSine',
        loop: false
    });

    //start with the splash screen
    showSplash();
});


function showSplash()
{

}

//Handle space bar
$(document).keydown(function(e){
    //space bar!
    if(e.keyCode == 32)
    {
        //in ScoreScreen, hitting space should click the "replay" button. else it's just a regular spacebar hit
        if(currentstate == states.ScoreScreen)
            $("#replay").click();
        else
            screenClick();
    }
});

//Handle mouse down OR touch start
if("ontouchstart" in window)
    $(document).on("touchstart", screenClick);
else
    $(document).on("mousedown", screenClick);

function screenClick()
{

}

$('textarea').on('keyup', function(e){
    $(this).val($(this).val().replace(/[\r\n\v]+/g, ''));
    if (($(this).val().toLowerCase() == "jongseung lim") || ($(this).val().toLowerCase() == "john lim")) {
        anime({
            targets: "#name,#text",
            opacity: 0,
            duration: 1000,
            easing: 'easeOutSine',
            loop: false,
            complete: function(anim) {
                $('#text').text("Now entering Taenarum as Jongseung Lim...");
                $('#text').css("font-size","15pt");
                anime({
                    targets: "#text",
                    opacity: [
                        {value: 1, duration: 1000},
                        {value: 0, duration: 1000, delay: 1000}
                    ],
                    duration: 1000,
                    easing: 'easeOutSine',
                    complete: function() {
                        window.location = 'Taenarum/';
                    }
                });
                anime({
                    targets: "#overlay",
                    opacity: 1,
                    duration: 1000,
                    easing: 'easeOutSine'
                });
            }
        });
    }
});