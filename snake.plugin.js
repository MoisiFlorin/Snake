var segmenteSnake = [
    {linie: 10, coloana: 30},
    {linie: 10, coloana: 31},
    {linie: 10, coloana: 32}
];

var directie = 'orizontal';
var factor = -1;

$.fn.snake = function() {
    
    var scena = $(this);
    
    initializareScena(scena);
    afiseazaSanke();
    initializareTaste();
    afiseazaMunchie();
    
    setInterval(miscaSanke, 150);
}

function initializareScena(elementScena) {
    
    //scena are dimensiune 50 x 50 pixeli
    for(var i = 0; i < 50; i++)
        for(var j = 0; j <50; j++) {
            var pixel = creazaPixel(i, j);
            
            elementScena.append(pixel);
            
        }
}

function creazaPixel(linie, coloana) {
    
    var element = $('<div></div>');
    
    element.attr('data-linie', linie);
    element.attr('data-coloana', coloana);
    element.addClass('pixel-scena');
    
    element.css('top', (linie * 10) + 'px');
    element.css('left', (coloana * 10) + 'px');
    
    return element;
}

function afiseazaSanke() {
    
    $('.segment-snake').removeClass('segment-snake');
    
    segmenteSnake.map( function(segment) {
        
        $('.pixel-scena[data-linie=' + segment.linie + '][ data-coloana=' + segment.coloana + ']').addClass('segment-snake');
        
        return segment;
    });
}

function miscaSanke() {
    
    verificaMunchie();
    
    var coada = segmenteSnake.pop(); 
    var cap = segmenteSnake[0];
    
    if (directie == 'orizontal') {
        coada.coloana = cap.coloana + factor;
        coada.linie = cap.linie;
    }
    
    if (directie == 'vertical') {
        coada.linie = cap.linie + factor;
        coada.coloana = cap.coloana;
    }
    
    if (coada.coloana < 0)
        coada.coloana = 49;
    
    if (coada.coloana > 49)
        coada.coloana = 0;
    
    if (coada.linie < 0)
        coada.linie = 49;
    
    if (coada.linie > 49)
        coada.linie = 0;
    
    segmenteSnake.unshift(coada);
    
    afiseazaSanke();
}

function initializareTaste() {
    
    $(document).keydown(function(eveniment) {
        
        if(eveniment.key =='ArrowUp' && directie == 'orizontal') {
            directie = 'vertical';
            factor = -1;
        }
           
        if(eveniment.key == 'ArrowDown' && directie == 'orizontal') {
            directie = 'vertical'
            factor = 1;
        }
        
        if(eveniment.key =='ArrowLeft' && directie == 'vertical') {
            directie = 'orizontal';
            factor = -1;
        }
           
        if(eveniment.key == 'ArrowRight' && directie == 'vertical') {
            directie = 'orizontal'
            factor = 1;
        }
    });
}


function afiseazaMunchie() {
    
    var linie = Math.floor(Math.random() * 50); // nr aleatoare 0-49
    var coloana = Math.floor(Math.random() * 50); // nr aleatoare 0-49
    
    $('.pixel-scena[data-linie=' + linie + '][data-coloana=' + coloana + ']').addClass('munchie');
}

function verificaMunchie() {
    
    var cap = segmenteSnake[0]; 
    var munchie = $('.munchie');
    var munchieLinie = munchie.data('linie');
    var munchieColoana = munchie.data('coloana');
    
    if(directie == 'vertical' && cap.coloana == munchieColoana && cap.linie + factor == munchieLinie) {
        
        segmenteSnake.unshift({ linie: munchieLinie, coloana: munchieColoana});
        munchie.removeClass('munchie');
        afiseazaMunchie();
    }
    
    if(directie == 'orizontal' && cap.linie == munchieLinie && cap.coloana + factor == munchieColoana) {
        
        segmenteSnake.unshift({ linie: munchieLinie, coloana: munchieColoana});
        munchie.removeClass('munchie');
        afiseazaMunchie();
    }
}









