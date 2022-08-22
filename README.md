# CS50 LIGHTS - A CS50x FINAL PROJECT

#### Video Demo:  <URL HERE>
#### Live Demo: https://cs50-lights.herokuapp.com/

# Description:
## Project Inspiration
The creation of this project was inspired by one of my favorite activities while going through the lessons each week of CS50x.
I would always pause the lectures at the start and spend a couple minutes translating what the messages meant.
Since I enjoyed it so much I decided to write a [Medium Article](https://medium.com/@efeogheneerhie.o/why-i-have-to-watch-every-cs50-2021-video-57cffa012e04) that recorded all the messages I had translated.
Then since I had spent so long on this, I decided to leverage all that work by making it the core concept in my CS50 final project.
So my project is all about the lights and hidden messages of CS50x 2022.

The design of the front end and a little of the back end is based on a different project I completed as part of the [Zero To Mastery](https://zerotomastery.io/) web development course called [smart-brain](https://github.com/Byte-bit-Byte/smartbrain).
The API architecture used for the CS50 Lights back end server was largely based on the one used in this video by [productioncoder](https://youtu.be/wfrn21E2NaU).

## Project Structure Overview
The project was created with mostly JavaScript and it can be broken into three broad sections. 
- The Front End which is created using the front end library React.js. 
- The back end which is created using Express.js library.
- The database which is created using PostgreSQL, but can easily be modified to a different database because of the use of the knex.js library. **The database itself is not part of the project files**. 

I will discuss each section in more detail below.

## Front End App Details
The front end of the application was created using the React.js front end library because of how fast and convenient it is to use. I will first describe the different aspects of the application that a user can experience when opening the website. Then I will describe how each of the different components of the website were designed and how they function.

### User Experience
The first thing a user sees when opening the CS50 lights website is a brightly colored application with a red to yellow gradient across the background. In addition to that there are moving particles that are responsive to any interactions with the screen also in the background.

There is a logo in the top left corner of the screen with a hidden message below it and the then the navigation is either to the right of the logo or below it depending on the width of the screen.
At the bottom of the page is the footer, which contains useful links to the CS50 YouTube website where all the images are sourced from, the medium article that was mentioned earlier, a link to the Git Hub Repository for the project and a link for the source of the website logo.

The home page loads up with a welcome image to the website. Then the user can select any of the weeks from CS50x 2022 from Week 0 to Week 10 and have an image of the stage displayed showing the lights below. As well as the binary representation of the lights and the translation. I added a comment for each week to give my insight into what I thought the messages were referencing.

Once a new user is satisfied with exploring the information of all the weeks, they can register by clicking on "Register" from the navigation bar. This would redirect them to a registration page that requests a name, email and password. The email validation is done only at the front end because I did not deem the application critical enough for any extra measures. Therefore, any 'string@string.string' would satisfy the email requirements. I actually **DO NOT** recommend people use their actual emails to sign up for this.

Once registered, the user is automatically redirected to a quiz page regardless of if they were ready for it or not. There are 15 questions in the quiz focused mainly on what the hidden messages were for each of the weeks displayed on the home page. There are a few additional questions I added to complete a set of 15.

When a user completes and submits the quiz, the responses are sent to the back end for grading. And since the questions are relatively easy, there is no direct feedback provided. The user is instead redirected to a rank page where a leader board is displayed showing the users with the highest scores obtained using the least quiz attempts. Below the leader board is a display of the scores from the last 5 quiz attempts for the logged in user.

The User can use the "Sign Out" function to log out from their credentials. They can also sign back in from the home page using the "Sign In" link if they already have an account created. On sign out, the user is redirected to the registration page by default.

### Front End App Structure
In order to run the front end application Nodejs is required. By default after creating the React app using npm three folders are generated; node_modules, public and src. Most of the design for the application is done within src, I was able to add the application logo to the tab of the web page within the public folder, and the node_modules folder is managed by the package manager like npm or yarn. I'll discuss the src folder in more detail below. Within src there are two js files with their corresponding css files, as well as a components folder. The package.json file contains all the neccessary details on the App like its name, version, dependencies, etc. 

If I consider the application as a pyramid, i.e. with a wide base that tapers to the top, then the index.js can be considered as the lowest level for the front end application. The index file contains App.js and is where the css library 'tachyons' is imported. Tachyons is used extensively through out the front end for styling and its use was inspired by the Zero To Mastery course mentioned earlier.

Above index.js file in our pyramid is the App.js file. The App.js file collects all the components and contains the logic that decides which components to display and when to display them. It also controls the functions and states values for the application and determines what is available to specific components.

Above the App.js file are all the components, to avoid making this any longer I will quickly go over them in a list:
- Footer.js: Displays the footer of the page containing useful links. It is always displayed.
- Logo.js: Displays the logo of the page. It is always displayed.
- Navigation.js: Displays the navigation links for the App depending on if signed in or not. It is always displayed.
- WeekSelect.js: Displays a drop down menu with values set for each week corresponding to images for that week. Displayed on home page.
- WeekTemplate.js: A template for displaying a week with an image of the stage, the binary message and translation as well as a personal comment. Displayed on home page.
- Signin.js: A component that displays a sign in form, then posts the data to the back end for validation before redirecting if succesful. Has its separate sign in page.
- Register.js: A component that displays a registration form, then posts the data to the back end for validation before redirecting if succesful. Has its separate register page.
- Quiz.js: A component that displays a quiz based on the question data it recieves from the application server. Has its separate quiz page.
- Question.js:  A template for a single question that is displayed within Quiz.js. Displayed on quiz page.
- Rank.js: Displays the top 10(if available) for scores on the quiz It also shows the logged in user's last 5 quiz attempt scores. Has its separate rank page.

That is all for the front end of the section of the application.

## Back End Server Details
The back end server for the application also requires Nodejs to be run. Similar to the front end, there is a directory called node_modules and a package.json file. The central file of the backend server structure is the serves.js file. In addition to this there are other directories such as the routes, service, dao which create the structure of the server. There is also the data.json file, questions.json file, the images directory, and the db directory which control or contain the data of the server. I will first discuss the data of the server, then the structure.

The data of the server can be broadly categorized into two classes. First, the data stored in the database which is accessed using the knexjs library, and the data outside the database like that week data, the questions data, and the static images for each week.

In this project I used postgres as my relational database. That is what is used in the knexfile.js which is within the db directory. This can be modified to a different relational database since the queries are made through knex and are indepent of postgres. Specific configuration might be required to make this work and can be found on the [knex website](https://knexjs.org/).

Ignoring the auto-generated tables needed for knex to function, there are 3 tables in my database. They are: 
- The users table which gathers all the basic information for each user
- The login table which stores the user's login information (email and hashed password)
- The quiz_attempts table which stores the score for every user quiz atttempt linked to their unique id

All the data is a

## Database Details