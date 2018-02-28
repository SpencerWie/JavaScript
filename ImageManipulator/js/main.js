var imgElement = document.getElementById('imageSrc');
var inputElement = document.getElementById('fileInput');
var gui;

inputElement.addEventListener('change', (e) => {
  imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);

window.onload = function(){
	gui = new dat.GUI();
	var img = new ImageObj();
  
  var greyscaleSlider = gui.add(img, 'greyscale');
	var brightnessSlider = gui.add(img, 'brightness', -100, 100);
	var contrastSlider = gui.add(img, 'contrast', 1, 10);
  var thresholdtSlider = gui.add(img, 'threshold', -1, 255);
  
  greyscaleSlider.onChange(() => {img.update()});
  brightnessSlider.onChange(() => {img.update()});
  contrastSlider.onChange(() => {img.update()});
  thresholdtSlider.onChange(() => {img.update()});
  
  var blur = gui.addFolder("Blur");
  blur.add(img, 'sigma_blur', 0, 10).step(0.1).onChange(() => {img.update()});
  blur.add(img, 'radius_blur', 1, 100).step(1).onChange(() => {img.update()});
  
  blur.open();
  
  var sharp = gui.addFolder("Sharpen");
  sharp.add(img, 'sigma_sharpen', 0, 10).step(0.1).onChange(() => {img.update()});
  sharp.add(img, 'radius_sharpen', 1, 100).step(1).onChange(() => {img.update()});
  
  sharp.open();
  
  gui.add(img, 'reset'); 
  gui.add(img, 'OCR');   
  
  img.gui = gui;
  
  setupPanZoom();
  
  $('#imageSrc').on('load', function(){ img.update() });
  
  $('body').css('padding-top', $('.navbar').outerHeight() + "px");
  $('.dg.ac').css('top', $('.navbar').outerHeight() + "px");
  
  $( window ).resize(function() {
    $('.dg.ac').css('top', $('.navbar').outerHeight() + "px");
  });
}

  Split(['#imageWindow', '#textWindow'], {
        direction: 'vertical',
        sizes: [100, 0],
        minSize: 50,
        snapOffset: 40
  });  
