/* Style Switcher */
$(document).ready(function(){ 
						   
var styleswitcherstr = ' \
	<h2>Style Switcher <a href="#"></a></h2> \
    <div class="content"> \
    <h3>Layout Style</h3> \
	<div class="layout-switcher"> \
    <a id="wide" class="layout">Wide</a> \
    <a id="boxed" class="layout">boxed</a> \
    </div> \
    <div class="clear"></div> \
    <h3>Color Style</h3> \
    <div class="switcher-box"> \
    <a id="blue" class="styleswitch color"></a> \
    <a id="orange" class="styleswitch color"></a> \
    <a id="green" class="styleswitch color"></a> \
    <a id="red" class="styleswitch color"></a> \
    <a id="purple" class="styleswitch color"></a> \
    </div><!-- End switcher-box --> \
    <div class="clear"></div>  \
    <div class="bg hidden">  \
    <h3>BG Pattern</h3>  \
    <a id="wood" class="pattern"></a> \
    <a id="crossed" class="pattern"></a> \
    <a id="fabric" class="pattern"></a> \
    <a id="linen" class="pattern"></a> \
    <a id="diagmonds" class="pattern"></a> \
    <a id="triangles" class="pattern"></a> \
    <a id="black_thread" class="pattern"></a> \
    <a id="checkered_pattern" class="pattern"></a> \
    <a id="black_mamba" class="pattern"></a> \
    <a id="back_pattern" class="pattern"></a> \
    <a id="vichy" class="pattern"></a> \
    <a id="diamond_upholstery" class="pattern"></a> \
    <a id="lyonnette" class="pattern"></a> \
    <a id="graphy" class="pattern"></a> \
    <a id="subtlenet2" class="pattern"></a> \
    </div> \
    <div class="clear"></div> \
    <h3>Dark Style</h3> \
	<a href="../Dark/index.html" class="dark-style">Dark Theme</a> \
    </div><!-- End content --> \
	';
	
$(".switcher").prepend( styleswitcherstr );

});

/* boxed & wide syle */
$(document).ready(function(){ 

var cookieName = 'wide';

function changeLayout(layout) {
$.cookie(cookieName, layout);
$('head link[name=layout]').attr('href', 'css/layout/' + layout + '.css');
}

if( $.cookie(cookieName)) {
changeLayout($.cookie(cookieName));
}

$("#wide").click( function(){ $
changeLayout('wide');
});

$("#boxed").click( function(){ $
changeLayout('boxed');
});

});


/* background images */
$(document).ready(function(){ 
  
  var startClass = $.cookie('mycookie');
  $("body").addClass("wood");

/* crossed */
$("#crossed").click( function(){ 
  $("body").removeClass('fabric');
  $("body").removeClass('linen');
  $("body").removeClass('wood');
  $("body").removeClass('diagmonds');
  $("body").removeClass('triangles');
  $("body").removeClass('black_mamba');
  $("body").removeClass('vichy');
  $("body").removeClass('back_pattern');
  $("body").removeClass('checkered_pattern');
  $("body").removeClass('diamond_upholstery');
  $("body").removeClass('lyonnette');
  $("body").removeClass('graphy');
  $("body").removeClass('black_thread');
  $("body").removeClass('subtlenet2');
  $("body").addClass('crossed');
  $.cookie('mycookie','crossed');
});

/* fabric */
$("#fabric").click( function(){ 
  $("body").removeClass('crossed');
  $("body").removeClass('linen');
  $("body").removeClass('wood');
  $("body").removeClass('diagmonds');
  $("body").removeClass('triangles');
  $("body").removeClass('black_mamba');
  $("body").removeClass('vichy');
  $("body").removeClass('back_pattern');
  $("body").removeClass('checkered_pattern');
  $("body").removeClass('diamond_upholstery');
  $("body").removeClass('lyonnette');
  $("body").removeClass('graphy');
  $("body").removeClass('black_thread');
  $("body").removeClass('subtlenet2');
  $("body").addClass('fabric');
  $.cookie('mycookie','fabric');
});

/* linen */
$("#linen").click( function(){ 
  $("body").removeClass('crossed');
  $("body").removeClass('fabric');
  $("body").removeClass('wood');
  $("body").removeClass('diagmonds');
  $("body").removeClass('triangles');
  $("body").removeClass('black_mamba');
  $("body").removeClass('vichy');
  $("body").removeClass('back_pattern');
  $("body").removeClass('checkered_pattern');
  $("body").removeClass('diamond_upholstery');
  $("body").removeClass('lyonnette');
  $("body").removeClass('graphy');
  $("body").removeClass('black_thread');
  $("body").removeClass('subtlenet2');
  $("body").addClass('linen');
  $.cookie('mycookie','linen');
});

/* wood */
$("#wood").click( function(){ 
  $("body").removeClass('crossed');
  $("body").removeClass('fabric');
  $("body").removeClass('linen');
  $("body").removeClass('diagmonds');
  $("body").removeClass('triangles');
  $("body").removeClass('black_mamba');
  $("body").removeClass('vichy');
  $("body").removeClass('back_pattern');
  $("body").removeClass('checkered_pattern');
  $("body").removeClass('diamond_upholstery');
  $("body").removeClass('lyonnette');
  $("body").removeClass('graphy');
  $("body").removeClass('black_thread');
  $("body").removeClass('subtlenet2');
  $("body").addClass('wood');
  $.cookie('mycookie','wood');
});

/* diagmonds */
$("#diagmonds").click( function(){ 
  $("body").removeClass('crossed');
  $("body").removeClass('fabric');
  $("body").removeClass('linen');
  $("body").removeClass('wood');
  $("body").removeClass('triangles');
  $("body").removeClass('black_mamba');
  $("body").removeClass('vichy');
  $("body").removeClass('back_pattern');
  $("body").removeClass('checkered_pattern');
  $("body").removeClass('diamond_upholstery');
  $("body").removeClass('lyonnette');
  $("body").removeClass('graphy');
  $("body").removeClass('black_thread');
  $("body").removeClass('subtlenet2');
  $("body").addClass('diagmonds');
  $.cookie('mycookie','diagmonds');
});

/* triangles */
$("#triangles").click( function(){ 
  $("body").removeClass('crossed');
  $("body").removeClass('fabric');
  $("body").removeClass('linen');
  $("body").removeClass('wood');
  $("body").removeClass('diagmonds');
  $("body").removeClass('black_mamba');
  $("body").removeClass('vichy');
  $("body").removeClass('back_pattern');
  $("body").removeClass('checkered_pattern');
  $("body").removeClass('diamond_upholstery');
  $("body").removeClass('lyonnette');
  $("body").removeClass('graphy');
  $("body").removeClass('black_thread');
  $("body").removeClass('subtlenet2');
  $("body").addClass('triangles');
  $.cookie('mycookie','triangles');
});

/* triangles */
$("#black_mamba").click( function(){ 
  $("body").removeClass('crossed');
  $("body").removeClass('fabric');
  $("body").removeClass('linen');
  $("body").removeClass('wood');
  $("body").removeClass('diagmonds');
  $("body").removeClass('triangles');
  $("body").removeClass('vichy');
  $("body").removeClass('back_pattern');
  $("body").removeClass('checkered_pattern');
  $("body").removeClass('diamond_upholstery');
  $("body").removeClass('lyonnette');
  $("body").removeClass('graphy');
  $("body").removeClass('black_thread');
  $("body").removeClass('subtlenet2');
  $("body").addClass('black_mamba');
  $.cookie('mycookie','black_mamba');
});

/* vichy */
$("#vichy").click( function(){ 
  $("body").removeClass('crossed');
  $("body").removeClass('fabric');
  $("body").removeClass('linen');
  $("body").removeClass('wood');
  $("body").removeClass('diagmonds');
  $("body").removeClass('triangles');
  $("body").removeClass('black_mamba');
  $("body").removeClass('back_pattern');
  $("body").removeClass('checkered_pattern');
  $("body").removeClass('diamond_upholstery');
  $("body").removeClass('lyonnette');
  $("body").removeClass('graphy');
  $("body").removeClass('black_thread');
  $("body").removeClass('subtlenet2');
  $("body").addClass('vichy');
  $.cookie('mycookie','vichy');
});

/* back_pattern */
$("#back_pattern").click( function(){ 
  $("body").removeClass('crossed');
  $("body").removeClass('fabric');
  $("body").removeClass('linen');
  $("body").removeClass('wood');
  $("body").removeClass('diagmonds');
  $("body").removeClass('triangles');
  $("body").removeClass('black_mamba');
  $("body").removeClass('vichy');
  $("body").removeClass('checkered_pattern');
  $("body").removeClass('diamond_upholstery');
  $("body").removeClass('lyonnette');
  $("body").removeClass('graphy');
  $("body").removeClass('black_thread');
  $("body").removeClass('subtlenet2');
  $("body").addClass('back_pattern');
  $.cookie('mycookie','back_pattern');
});

/* checkered_pattern */
$("#checkered_pattern").click( function(){ 
  $("body").removeClass('crossed');
  $("body").removeClass('fabric');
  $("body").removeClass('linen');
  $("body").removeClass('wood');
  $("body").removeClass('diagmonds');
  $("body").removeClass('triangles');
  $("body").removeClass('black_mamba');
  $("body").removeClass('vichy');
  $("body").removeClass('back_pattern');
  $("body").removeClass('diamond_upholstery');
  $("body").removeClass('lyonnette');
  $("body").removeClass('graphy');
  $("body").removeClass('black_thread');
  $("body").removeClass('subtlenet2');
  $("body").addClass('checkered_pattern');
  $.cookie('mycookie','checkered_pattern');
});

/* diamond_upholstery */
$("#diamond_upholstery").click( function(){ 
  $("body").removeClass('crossed');
  $("body").removeClass('fabric');
  $("body").removeClass('linen');
  $("body").removeClass('wood');
  $("body").removeClass('diagmonds');
  $("body").removeClass('triangles');
  $("body").removeClass('black_mamba');
  $("body").removeClass('vichy');
  $("body").removeClass('back_pattern');
  $("body").removeClass('checkered_pattern');
  $("body").removeClass('lyonnette');
  $("body").removeClass('graphy');
  $("body").removeClass('black_thread');
  $("body").removeClass('subtlenet2');
  $("body").addClass('diamond_upholstery');
  $.cookie('mycookie','diamond_upholstery');
});

/* lyonnette */
$("#lyonnette").click( function(){ 
  $("body").removeClass('crossed');
  $("body").removeClass('fabric');
  $("body").removeClass('linen');
  $("body").removeClass('wood');
  $("body").removeClass('diagmonds');
  $("body").removeClass('triangles');
  $("body").removeClass('black_mamba');
  $("body").removeClass('vichy');
  $("body").removeClass('back_pattern');
  $("body").removeClass('checkered_pattern');
  $("body").removeClass('diamond_upholstery');
  $("body").removeClass('graphy');
  $("body").removeClass('black_thread');
  $("body").removeClass('subtlenet2');
  $("body").addClass('lyonnette');
  $.cookie('mycookie','lyonnette');
});

/* graphy */
$("#graphy").click( function(){ 
  $("body").removeClass('crossed');
  $("body").removeClass('fabric');
  $("body").removeClass('linen');
  $("body").removeClass('wood');
  $("body").removeClass('diagmonds');
  $("body").removeClass('triangles');
  $("body").removeClass('black_mamba');
  $("body").removeClass('vichy');
  $("body").removeClass('back_pattern');
  $("body").removeClass('checkered_pattern');
  $("body").removeClass('diamond_upholstery');
  $("body").removeClass('lyonnette');
  $("body").removeClass('black_thread');
  $("body").removeClass('subtlenet2');
  $("body").addClass('graphy');
  $.cookie('mycookie','graphy');
});

/* black_thread */
$("#black_thread").click( function(){ 
  $("body").removeClass('crossed');
  $("body").removeClass('fabric');
  $("body").removeClass('linen');
  $("body").removeClass('wood');
  $("body").removeClass('diagmonds');
  $("body").removeClass('triangles');
  $("body").removeClass('black_mamba');
  $("body").removeClass('vichy');
  $("body").removeClass('back_pattern');
  $("body").removeClass('checkered_pattern');
  $("body").removeClass('diamond_upholstery');
  $("body").removeClass('lyonnette');
  $("body").removeClass('graphy');
  $("body").removeClass('subtlenet2');
  $("body").addClass('black_thread');
  $.cookie('mycookie','black_thread');
});

/* subtlenet2 */
$("#subtlenet2").click( function(){ 
  $("body").removeClass('crossed');
  $("body").removeClass('fabric');
  $("body").removeClass('linen');
  $("body").removeClass('wood');
  $("body").removeClass('diagmonds');
  $("body").removeClass('triangles');
  $("body").removeClass('black_mamba');
  $("body").removeClass('vichy');
  $("body").removeClass('back_pattern');
  $("body").removeClass('checkered_pattern');
  $("body").removeClass('diamond_upholstery');
  $("body").removeClass('lyonnette');
  $("body").removeClass('graphy');
  $("body").removeClass('black_thread');
  $("body").addClass('subtlenet2');
  $.cookie('mycookie','subtlenet2');
});



if ($.cookie('mycookie')) {
  $('body').addClass($.cookie('mycookie'));
}

});

/* Skins Style */
$(document).ready(function(){ 

var cookieName = 'blue';

function changeLayout(layout) {
$.cookie(cookieName, layout);
$('head link[name=skins]').attr('href', 'css/skins/' + layout + '.css');
}

if( $.cookie(cookieName)) {
changeLayout($.cookie(cookieName));
}

$("#blue").click( function(){ $
changeLayout('blue');
});

$("#orange").click( function(){ $
changeLayout('orange');
});

$("#green").click( function(){ $
changeLayout('green');
});

$("#red").click( function(){ $
changeLayout('red');
});

$("#purple").click( function(){ $
changeLayout('purple');
});


});


/* Reset Switcher */
$(document).ready(function(){ 

// Style Switcher	
$('.switcher').animate({
left: '-160px'
});

$('.switcher h2 a').click(function(e){
e.preventDefault();
var div = $('.switcher');
console.log(div.css('left'));
if (div.css('left') === '-160px') {
$('.switcher').animate({
  left: '0px'
}); 
} else {
$('.switcher').animate({
  left: '-160px'
});
}
})


/*$('a.color').click(function(e){
e.preventDefault();
$(this).parent().parent().find('a').removeClass('selected');
$(this).addClass('selected');
})

$('a.pattern').click(function(e){
e.preventDefault();
$(this).parent().parent().find('a').removeClass('selected2');
$(this).addClass('selected2');
})

$('a.layout').click(function(e){
e.preventDefault();
$(this).parent().parent().find('a').removeClass('selected3');
$(this).addClass('selected3');
})*/

		 
});						   

