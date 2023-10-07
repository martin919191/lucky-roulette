function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateFunnyUsername() {
    const footballPlayers = ["Lionel Messi", "Cristiano Ronaldo", "Neymar", "Kylian Mbappé", "Robert Lewandowski", "Sergio Ramos", "Andres Iniesta", "Xavi Hernandez", "Luis Suarez", "Zinedine Zidane", "Ronaldinho", "Thierry Henry", "Franz Beckenbauer", "Paolo Maldini", "George Best", "Gareth Bale", "David Beckham", "Ronaldo", "Raul", "Fernando Torres", "Kaka", "Marco van Basten", "Andrea Pirlo", "Fabio Cannavaro", "Pele", "Diego Maradona", "Johan Cruyff", "Franck Ribery", "Bobby Charlton", "Ferenc Puskas", "Michael Owen", "Roberto Carlos", "Rivaldo", "Ruud Gullit", "Ruud van Nistelrooy", "Cafu", "Alessandro Del Piero", "Raul Gonzalez", "Andriy Shevchenko", "Karl-Heinz Rummenigge", "Emilio Butragueno", "Oliver Kahn", "Luis Figo", "Fernando Hierro", "Dennis Bergkamp", "Samuel Eto'o", "Pavel Nedved", "Gianluigi Buffon", "Cesare Maldini", "Gordon Banks", "Hristo Stoichkov", "Eusebio", "Fernando Peyroteo", "Just Fontaine", "Jairzinho", "Garrincha", "Zico", "Socrates", "Lucas Leiva", "N'Golo Kante", "Karim Benzema", "Karl-Heinz Rummenigge", "Gerd Muller", "Lothar Matthaus", "Franz Beckenbauer", "Oliver Kahn", "Sepp Maier", "Gunter Netzer", "Franz Roth", "Paul Breitner"];

    const randomName = footballPlayers[Math.floor(Math.random() * footballPlayers.length)];
    return randomName;
}


function generateUUID() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
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
    $('#roulette-wheel').css('box-shadow', '0 0 10px black');

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
            $('#roulette-wheel').css('box-shadow', 'none');
            lastDegrees = toDegrees;
        }
    });
}

function editPlayer(event) {
    var playerId = event.currentTarget.id.split('-')[0];
    $(`#${playerId}-label`).prop('disabled', false);
    $(`#${playerId}-label`).focus();
    $(`#${playerId}-label`).select();
    event.currentTarget.innerHTML = '<i class="fas fa-check"></i>';
    $(event.currentTarget).off('click', editPlayer);
    $(event.currentTarget).on('click', submitPlayerEdit);
}

function submitPlayerEdit(event) {
    var playerId = event.currentTarget.id.split('-')[0];
    event.currentTarget.innerHTML = '<i class="fas fa-pencil-alt"></i>';
    $(`#${playerId}-label`).prop('disabled', true);
    $(event.currentTarget).off('click', submitPlayerEdit);
    $(event.currentTarget).on('click', editPlayer);
    drawRouletteBasedOnList();
}

function drawRouletteBasedOnList() {
    var players = [];
    $('.player').map((player) => {
        var label_id = `#${$('.player')[player].id}-label`
        players.push($(label_id)[0].value);
    });
    
    if(players.length > 0){
        $('.roulette-wheel-label').css('font-size', '1em');
        $('.roulette-wheel-label').css('backgro', '1em');
    }else if(players.length > 7){
        $('.roulette-wheel-label').css('font-size', '.8em');
    }else if(players.length > 10){
        $('.roulette-wheel-label').css('font-size', '.7em');
    }else if(players.length > 13){
        $('.roulette-wheel-label').css('font-size', '.6em');
    }else if(players.length > 16){
        $('.roulette-wheel-label').css('font-size', '.5em');
    }

    $('#roulette-container').empty();
    $('#roulette-container').append('<div class="roulette-wheel" id="roulette-wheel"></div>')
    drawRoulette(players);
}

function deletePlayer(event) {
    if ($('.player').length <= 2) {
        alert("You can't have less than two players!")
    } else {
        var playerId = event.currentTarget.id.split('-')[0];
        $(`#${playerId}`).remove();
    }
    drawRouletteBasedOnList();
}

function addNewPlayer() {
    var uuid = generateUUID();
    //nextPlayerIndex = lastPlayerIndex + 1;
    nextPlayerIndex = uuid;
    playerHTMLBase = `<div id="player_${nextPlayerIndex}" class="player">
        <button id="player_${nextPlayerIndex}-edit" class="modify-player-button edit-button"><i class="fas fa-pencil-alt"></i></button>
        <button id="player_${nextPlayerIndex}-delete" class="modify-player-button delete-button"><i class="fas fa-trash-alt"></i></button>
        <input id="player_${nextPlayerIndex}-label" class="player-label" type="text" value="${generateFunnyUsername()}" disabled>
    </div>`;

    //$('#player-list-scroll').append(playerHTMLBase);

    simpleBar.getContentElement().insertAdjacentHTML('beforeend', playerHTMLBase);
    $('.edit-button').off('click', editPlayer);
    $('.delete-button').off('click', deletePlayer);
    $('.edit-button').on('click', editPlayer);
    $('.delete-button').on('click', deletePlayer);
    drawRouletteBasedOnList();
    //scroll = new SimpleBar(document.querySelector('.player-list-scroll'));

}

function toggleMenu() {
    $('#menu').toggleClass('menu-hidden');
}

simpleBar = null;

$(document).ready(function () {
    var rouletteHeight = ($('#roulette-container').position().top - 15);

    if (window.devicePixelRatio > 2) {
        rouletteHeight = ($('#roulette-container').position().top - (15)) * (window.devicePixelRatio - 1)
    }

    $('#button-spin').on('click', spin);

    simpleBar = new SimpleBar(document.querySelector('.player-list-scroll'));

    $('.edit-button').on('click', editPlayer);
    $('.delete-button').on('click', deletePlayer);
    $('#menu-button').on('click', toggleMenu);
    $('#button-add-player').on('click', addNewPlayer);

    rouletteContainer = $('#roulette-container');
    triangle = $('#triangle');
    triangle.css('top', `calc( 50% - ${(rouletteContainer.height() / 2) + 20}px )`)

    for(var i=0; i<5; i++)
        addNewPlayer();

});
