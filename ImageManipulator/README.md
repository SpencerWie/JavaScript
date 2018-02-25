## Image Manipulator

Image manipulation tool with side-by-side copmarison and real-time updates. A user can pan and zoom either image and it will be applied to both images for easy comparisons. The left image is the oringal user provided image, the right is the manipulated image.

[**Click here to run the latest version of Image Manipulator**](https://rawgit.com/SpencerWie/JavaScript/master/ImageManipulator/index.html)

### Version 0.1

![Image Manipulator Example with enhacement of an iamge of a cat.](https://i.imgur.com/ZFQjokB.png)

### How to use:

Click on *"Choose File"* and select an image from your computer, it will be added into the left image element. Currently there are four operations that can be done using the editor:

* **Greyscale**: Checking this will greyscale the image
* **Brightness**: The user can change the brightness of the image from -100 to 100, this is the added value on the pixel data
* **Contrast**: The user can change the brightness of the image from -100 to 100, this is the mulitplied value on the pixel data
* **Reset**: Will reset the image operations back to default along with the pan and zoom.

### Libraries Used:

* [opencv.js](https://docs.opencv.org/3.3.1/df/d0a/tutorial_js_intro.html) - Libary used for image manipulations.
* [dat.GUI](https://github.com/dataarts/dat.gui) - The GUI interface libary for image manipulation parameters.
* [jQuery](https://jquery.com/) / [jQuery PanZoom](https://github.com/timmywil/jquery.panzoom) - Libary used for help with pan and zoom operations
* [Bootstrap 4](https://getbootstrap.com/) - Used for consitence page styling and look across broswers (*Modifed to fix visual issue it creates on dat.GUI*)
