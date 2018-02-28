var ImageObj = function(){
  this.gui = null;
  this.reset();
}

ImageObj.prototype.reset = function(){
	this.greyscale = false;
	this.brightness = 0.0;
	this.contrast = 1.0;
  this.threshold = -1;
  this.sigma_blur = 0;
  this.radius_blur = 1;
  this.sigma_sharpen = 0;
  this.radius_sharpen = 1;  
	this.order = ['greyscale', 'brightness', 'contrast', 'threshold'];
  this.update();
  $(".panzoom").panzoom("resetZoom");
  $(".panzoom").panzoom("resetPan");
}

ImageObj.prototype.update = function(){
  if(imgElement.src.length == 0) return;
	this.mat = cv.imread(imgElement);
	this.apply_greyscale();
	this.apply_brigtness();
	this.apply_contrast();
  this.apply_threshold();
  this.apply_blur(this.sigma_blur, this.radius_blur);
  this.apply_sharpen();
  this.updateGUI();
	cv.imshow('canvasOutput', this.mat);
  $('#canvasOutput').parent('.imageContainer').height($('#imageSrc').parent('.imageContainer').height());
}

ImageObj.prototype.updateGUI = function(){
  // Update direct elements on GUI
  for (var i in this.gui.__controllers) {
    this.gui.__controllers[i].updateDisplay();
  }
  // Update all elements inside folders
  for (var folder in this.gui.__folders) {
    var ele = this.gui.__folders[folder]
    for (var i in ele.__controllers) {
      ele.__controllers[i].updateDisplay();
    }
  }
}

ImageObj.prototype.apply_greyscale = function(){
	if(this.greyscale)
		cv.cvtColor(this.mat, this.mat, cv.COLOR_RGBA2GRAY, 0);
}

ImageObj.prototype.apply_brigtness = function(){
	this.mat.convertTo(this.mat, -1, 1, this.brightness);
}

ImageObj.prototype.apply_contrast = function(){
	this.mat.convertTo(this.mat, -1, this.contrast, 0);
}

ImageObj.prototype.apply_threshold = function(){
  if(this.threshold >= 0)
    cv.threshold(this.mat, this.mat, this.threshold, 255, cv.THRESH_BINARY);
}

ImageObj.prototype.apply_blur = function(sigma, r){
   // kernal size must be odd, this will make any even to an odd number
  if(r%2 == 0) r++;
  let ksize = new cv.Size(r, r);
  if(ksize.width > 0 && ksize.height > 0 && ksize.width % 2 == 1  && ksize.height % 2 == 1){
      cv.GaussianBlur(this.mat, this.mat, ksize, sigma, sigma, cv.BORDER_DEFAULT);
  }
}

//Sharpen works by bluring then subtraction that weight as a negative to the current image  
ImageObj.prototype.apply_sharpen = function(){
  var originalMat = this.mat.clone();
  this.apply_blur(this.sigma_sharpen, this.radius_sharpen);
  cv.addWeighted(originalMat, 1.5, this.mat, -0.5, 0, this.mat);
}

// Applies OCR using Tessseract on both oringal and processed image items.
ImageObj.prototype.OCR = function(){
  $("textarea").css("background-color", "darkgrey");
  Tesseract.recognize($('#imageSrc')[0])
  .then(function(result){
      console.log(result)
      $("#imgText").val(result.text);
      $("#imgText").css("background-color", "white");
  });
  Tesseract.recognize($('#canvasOutput')[0])
  .then(function(result){
      $("#canvasText").val(result.text);
      $("#canvasText").css("background-color", "white");
  });
}