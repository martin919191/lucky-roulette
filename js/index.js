function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

var players = [
    'Player 1'
    , 'Player 2'
    , 'Player 3'
];
base_degrees = 360 / players.length;
current_rotation = base_degrees
players.forEach((player) => {
    new_label = `<div class="roulette-wheel-label" style='transform: rotate(${current_rotation - (base_degrees / 2)}deg); transform-origin: bottom center'>${player}</div>`;
    new_separator = `<div class="roulette-wheel-separator" style='transform: rotate(${current_rotation}deg); transform-origin: bottom center'></div>`;
    current_rotation += base_degrees
    $('#roulette-container').append(new_label);
    $('#roulette-container').append(new_separator);
});

var lastDegrees = 0;

function spin() {
    var toDegrees = getRandomInt(360 * 3, 360 * 6) + lastDegrees;

    $('#button-spin').prop('disabled', 'true');
    $('#button-spin').css('background-color', 'gray');
    $('#button-spin').css('color', 'black');
    $('#button-spin').text('...');
    $('#button-spin').css('top', 'calc( 100% - 98px )');

    $.keyframe.define([{
        name: 'roulette',
        from: {
            'transform': `rotate(${lastDegrees}deg)`
        },
        to: {
            'transform': `rotate(${toDegrees}deg)`
        }
    }]);

    $('#roulette-container').playKeyframe({
        name: 'roulette',
        duration: '5s',
        timingFunction: 'ease',
        delay: '0s',
        iterationCount: '1',
        direction: 'normal',
        fillMode: 'forwards',
        complete: function () {
            $('#button-spin').removeAttr('disabled');
            $('#button-spin').text('SPIN');
            $('#button-spin').css('background-color', 'black');
            $('#button-spin').css('color', 'white');
            $('#button-spin').css('top', '0');
            lastDegrees = toDegrees;
        }
    });
}

$('#button-spin').on('click', spin);



$(document).ready(function () {
    var rouletteHeight = ($('#roulette-container').position().top - 15)

    if (window.devicePixelRatio > 2) {
        rouletteHeight = ($('#roulette-container').position().top - (15)) * (window.devicePixelRatio - 1)
    }

    $('#triangle').css('top', `${rouletteHeight}px`)
    console.log(`-${rouletteHeight / 4}px`);
    $('#roulette-container')

});