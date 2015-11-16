A part of coding challenge for AngularJS application development
=======

This folder contains the solution to xyz TODO Application JavaScript exercise.

## Tools and frameworks used:
1. Jetbrains Webstorm as IDE
2. AngularJS as frontend framework
3. AngularUI Router as the routing framework
4. Gulp as automated JavaScript Task Runner
5. npm for installing Gulp and its dependencies
6. bower as package management system for installing dependencies for client-side programming 

## Prerequisites:
1. Download and install NPM/nodejs
2. Download and install bower
3. Download and install Gulp

##Commands to run (Inside the project root directory):
1. npm install
2. bower install

##On Production:
- To build the application to dist folder, execute
```
gulp build
```
- To build the application to dist folder and keep a watch on changes in base javascript files, execute
```
gulp build-watch
```
- To deploy and run the application, under **dist folder**, execute 
```
gulp
```
On browser, enter the url: 
```
http://localhost:9000
```
The default port set for running server is 9000

## Functionality Implemented:
1. Add new TODOs - New TODOs are added to the list by typing into the top input box and hitting
the Return/Enter key.

2. Mark all TODOs (un)finished - When you click the two arrows pointing down next to the top input box,
all TODOs are marked done. If all TODOs are already done, all TODOs are marked undone again.

3. Mark single TODO (un)finshed - On clicking the checkmark in front of the TODO, its done state is toggled.

4. Delete a single TODO - On clicking the (X) a single TODO is deleted.

5. Showing number of unfinished TODOs - On the bottom, the number of TODOs being unfinished are updated automatically.

6. Filter for all/active/complete TODOs - The list of TODOs are filtered according to their done state.

7. Clear all completed - All completed TODOs are removed on clicking "Clear Completed" button

8. Edit a TODO - Double-clicking a TODO will show an input box where you can edit the TODO. Hitting enter again will 
store the TODO.

9. Load TODOs from sample.json - The sample.json file contains an array of TODOs. These are loaded for an initial state.

## Implementation Details:
1. Model View Controller (MVC) is the software design pattern that has been used in the implementation. Reason behind 
choosing this pattern is it's architecture which isolates the application logic from the user interface layer and makes 
the application easier to maintain and extend.
2. AngularJS utilizes the MCV pattern and provides a powerful framework to build single page applications.
3. AngularUI Router is used as routing framework because of its architecture to change the application views based on 
``` state of application ``` and not just the route URL. This is very advantageous because the views and routes aren't 
tied down to the site URL. Hence, parts of site / application can be changed using routing even if the URL doesn't 
change. This provides great flexibility and less confusion for bigger apps.  
4. In order to build this scalable and maintainable AngularJS application, it is very important to maintain a good app 
structure. My implementation provides a structure that is modularized into very specific functions. Although the 
application logic is not big in terms of number of lines of code, still the practices followed here pertain to a big 
application structure with focus on commercialization. Following directory structure has been followed 
- Root directory contains some application configuration files such as package.json and bower.json
- ``` public ``` directory is the root of front-end structure and contains all the application logic, which is again 
structured very systematically.
- ``` index.html ``` file in ``` public ``` directory will primarily handle loading in all the libraries and Angular 
elements.
- ``` assets ``` folder contains all the assets needed by app that are not related to AngularJS code.
- ``` app ``` folder is where the meat of AngularJS app lives. ``` app.module.js ``` handles setup of AngularJS app by 
loading dependencies. ``` app.route.js ``` handles all the routes and route configurations.
- ``` components ``` folder contains actual section of the application. Static views, custom directives and services for
a specific section of application are all located as a component in this directory. In this TODO application, there is 
only 1 core component (because there was only one view) named ``` home ``` and 2 other components ``` header ``` and 
``` footer ``` which remain same for multiple views. Each component here resembles a mini-MVC application by having 
a view, controller and services file.
- By this approach, it is very way to add new components based on the views and every model-view remains loosely coupled
from the other.
- ``` shared ``` folder present in ``` app ``` directory should contain individual features that this application should
 have. Examples can be a slider which can be made a separate component which is shared by multiple views as it's design
 and features will not change in different views. At the moment, there is no need of such shared features, that's why it
 is empty. But if we plan to extend this app further, there will certainly be a possibility to add components here.
- Modularization of code has been the focus of my implementation. Providing separate folders for  ``` core ``` 
components and ``` other ``` components like header, footer enhances the modularity. It can also be seen that the routes
have been separated into separate files in each component. This is also done to modularize the code and improve the 
development structure. Although this was not necessary in this small application, but it can be very useful if the 
application grows.
- This modularized approach not only improves code maintainability, but also makes application scalable and easy to 
debug and test.
- To make this application ready for production, I have included a Gulpfile.js in the root of the application folder.
Running the ``` gulp ``` commands as stated in the previous section will make this application production ready.


The TODOMVC Part is licensend under the MIT License and Copyright by Addy Osmani, Sindre Sorhus, Pascal Hartig, Stephen Sawchuk.