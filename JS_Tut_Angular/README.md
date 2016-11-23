<h2>
JavaScript tutorial (<em>AngularJS</em>).
</h2>

<p>
The reason for this is to make an application to for tutorials and sections so they are scalable and maintainable. It can easily be extended for any other tutorial. The rest of this section will disscuss how the program works along with how to extend and create your own tutoral pages and sections.
</p>

<h4>Directory Structure</h4>

<h4>Root</h4>
<p>
Since this is a Single Page application the entire web application is can inside <em>/index.html</em>, this files loads all intial JavaScript along with our angular application. The contents of this file include section tabs and the view of our application (<em>ng-view</em>em>). The two other files inside the root path are two template HTML files for the page accordion (<em>/accordion.html</em>) and the section of the accordion that a speific tutorial sections resides (<em>/section.html</em>)
</p>

<h4>Tutorial Sections</h4>
<p>
Each tutorial page content is included inside a folder. For example the first section of the tutorial is called "The Basics", all the content for that section is included inside the directory <em>/The_Basics</em>. Inside of this folder includes the html template files for each section, for example the HTML for the "Comments" section is inside the file <em>/The_Basics/Comments.html</em>. The <em>index.html</em> file inside each of these folders is the view for that page. This file only contains the page title and intial comment at the top, the rest of this entire page is generated automatically.
</p>
<p>
For page generation inside each tutorial folder haves an file called <em>sections.json</em>, we use this file to know which HTML tempalte to use along with a title for each section on the page. Along with this each folder also contains a <em>script.js</em> file, this contains any JavaScript that is needed on that page.
</p>

<h4>Requirements</h4>
<p>
Since we are loading in JSON data a basic HTTP Server for localhost is required for running this web tutorial.
</p>