# performance-matters-server-side

## What is my project
The project I choose to make Server Side was my OBA project. The original idea was a memory game. The user must search for 6 words. These words will go through a query and the results will be shown through images. For this assignment I decided to make it so that the user can search for words and the results will be shown. No game elements will be used. This must work in case the JavaScript is disabled.

### Server Side
To make it server side I decided to use EJS. The reason why is that I have some experience with this view engine. Its also a great way to make a server side website. I cloning the repo from github. This can be done with the terminal by doing: ```git clone``` or by using the github desktop app. Next I want to  installing the Node mudules. This can be achieved by going to the map in which the project is stored and use "NPM install". I also installed "node-fetch", so I can easily fetch data. Except for the "no...(line truncated)...

To start the server I used "Nodemon". This will autimatically restart the server anytime I made a change in my project and saved the changes. Next I made a "public" map in which I store my Stylesheet, JS, sound and images. These are the files I want to serve. After this I made "EJS" files. This was fairly easy, because the only thing I really had to change was adding the header and footer from a different file. To implenent the header and footer the code was: ```<% include head %>``` at the top for the head...(line truncated)...

### Modules I use in the projects
* body-parser
* node-fetch
* ejs
* express

### Ideas for the future
* Using a Service Worker - this will cache and load the website if its offline.
