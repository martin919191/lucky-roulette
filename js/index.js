function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

var samplePlayers = [
      'Player 1'
    , 'Player 2'
    , 'Player 3'
    , 'Player 4'
    , 'Player 5'
];

function drawRoulette(players) {
    base_degrees = 360 / players.length;
    current_rotation = base_degrees
    players.forEach((player) => {
        new_label = `<div class="roulette-wheel-label" style='transform: rotate(${current_rotation - (base_degrees / 2)}deg); transform-origin: bottom center'>${player}</div>`;
        new_separator = `<div class="roulette-wheel-separator" style='transform: rotate(${current_rotation}deg); transform-origin: bottom center'></div>`;
        current_rotation += base_degrees
        $('#roulette-container').append(new_label);
        $('#roulette-container').append(new_separator);
    });
}


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

function editPlayer(event){
    var playerId = event.currentTarget.id.split('-')[0];
    $(`#${playerId}-label`).prop('disabled', false);
    $(`#${playerId}-label`).focus();
    event.currentTarget.innerHTML = '<i class="fas fa-check"></i>';
    $(event.currentTarget).off('click', editPlayer);
    $(event.currentTarget).on('click', submitPlayerEdit);
}

function submitPlayerEdit(event){
    var playerId = event.currentTarget.id.split('-')[0];
    event.currentTarget.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    $(`#${playerId}-label`).prop('disabled', true);
    $(event.currentTarget).off('click', submitPlayerEdit);
    $(event.currentTarget).on('click', editPlayer);
    var players = [];
    $('.player').map((player) => {
        var label_id = `#${$('.player')[player].id}-label`
        players.push($(label_id)[0].value);
    });
    $('#roulette-container').empty();
    $('#roulette-container').append('<div class="roulette-wheel" id="roulette-wheel"></div>')
    drawRoulette(players);
}

function deletePlayer(event){
    var playerId = event.currentTarget.id.split('-')[0];
    $(`#${playerId}`).delete();
}

$(document).ready(function () {
    drawRoulette(samplePlayers);
    var rouletteHeight = ($('#roulette-container').position().top - 15);

    if (window.devicePixelRatio > 2) {
        rouletteHeight = ($('#roulette-container').position().top - (15)) * (window.devicePixelRatio - 1)
    }

    $('#triangle').css('top', `${rouletteHeight}px`);
    $('#button-spin').on('click', spin);

    new SimpleBar(document.querySelector('.player-list-scroll'));

    $('.edit-button').on('click', editPlayer);
    $('.delete-button').on('click', deletePlayer);
    
});
