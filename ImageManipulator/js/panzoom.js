$panzoom = $(".panzoom").panzoom();

function setupPanZoom(){
	$panzoom.on('mousewheel.focal', zoom);
  $panzoom.on("panzoompan", function(e, panzoom, x, y){
    e.preventDefault();
    $panzoom.panzoom("pan", x, y, {silent: true});
  });
}

function zoom(e) {
  e.preventDefault();
  var delta = e.delta || e.originalEvent.wheelDelta;
  var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
  $(this).panzoom('zoom', zoomOut, {
    increment: 0.1,
    animate: false,
    focal: e
  });
  var rect = $(this).closest(".col").offset();
  var otherEle = $(".panzoom").not(this).closest(".col");
  var otherRect = otherEle.offset();
  var offsetX = otherRect.left - rect.left;
  var offsetY = otherRect.top - rect.top;
  var otherPos = {
    clientX: e.clientX + offsetX,
    clientY: e.clientY + offsetY
  };
  $(".panzoom").not(this).panzoom('zoom', zoomOut, {
    increment: 0.1,
    animate: false,
    focal: otherPos
  });
}