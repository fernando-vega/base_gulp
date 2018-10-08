/* jQuery(document).ready(function ($) {
   
}); */

$.imgToSvg = function (image) {
  var $img = image;
  var imgID = $img.attr('id');
  var imgClass = $img.attr('class');
  var imgURL = $img.attr('src');

  $.get(imgURL, function (data) {
    var $svg = jQuery(data).find('svg');
    if (typeof imgID !== 'undefined') {
      $svg = $svg.attr('id', imgID);
    }
    if (typeof imgClass !== 'undefined') {
      $svg = $svg.attr('class', imgClass + ' replaced-svg');
    }
    $svg = $svg.removeAttr('xmlns:a');
    $img.replaceWith($svg);

    if ($img.hasClass('map-animate'))
      $.myScrollAnimate();
  }, 'xml');
}

$.init = function () {
  $('.to-svg').each(function (index, el) {
    $.imgToSvg($(this));
  });
} 