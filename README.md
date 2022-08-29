# CS50 LIGHTS - A CS50x FINAL PROJECT

#### Video Demo:  https://www.youtube.com/watch?v=ooHuCdflr5Y
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
The back end server for the application also requires Nodejs to be run. Similar to the front end, there is a directory called node_modules and a package.json file. The central file of the backend server structure is the serves.js file. In addition to this there are other directories such as the routes, service, dao which create the structure of the server. There is also the data.json file, questions.json file, the images directory, and the db directory which control or contain the data of the server. I will first discuss the data of the server, then work my way up describing higher levels of the structure.

The data of the server can be broadly categorized into two classes. First, the data stored in the database which is accessed using the knexjs library, and the data outside the database like that week data, the questions data, and the static images for each week.

In this project I used postgres as my relational database. That is what is used in the knexfile.js which is within the db directory. This can be modified to a different relational database since the queries are made through knex and are indepent of postgres. Specific configuration might be required to make this work and can be found on the [knex website](https://knexjs.org/).

Ignoring the auto-generated tables needed for knex to function, there are 3 tables in my database. They are: 
- The **users table** which gathers all the basic information for each user
- The **login table** which stores the user's login information (email and hashed password)
- The **quiz_attempts table** which stores the score for every user quiz atttempt linked to their unique id

For the data outside the database:
- The **data.json** contains the information for each week of CS50x 2022
- The **questions.json** contains all the questions that would be asked of users taking the quiz in the front end of the application.

All the data in the database is manipulated using the objects stored within the dao, data access directory. It contains the following files and thier functions:
- *profile.js* which is provided a specific user id and retrives all the data on that user from the users table
- *quiz.js* recieves the quiz attempts of a user with their id. It grades the quiz, updates the user's max score if neccessary along with their attempts. Then it adds a new entry into the quiz_attempts table. I acknowledge this should have been broken into two functions.
- *rank.js* recieves the users data and then gets the last 5 quiz attemmpts for that user. It also queries the database in the users table for the 10 users with the highest max score gotten in the least attempts.
- *register.js* recieves the email, name and passowrd of a new user. It hashes the password and stores it along with the email as new entry in the login table. Then it creates a separate entry in the users table using the name and email of the user.
- *signin.js* recieves the an email and password for a user. It then checks if that email exists in the login table and if the stored hash corresponds to the hash of the provided password before returning the users details if both conditions are met.

The data access objects in the dao directory are called by those in the service layer. These sometimes perform an intermediate step with the request data before moving it on to the data access layer. The objects within it are:
- *profile.js* simply connects the controller layer to the data access layer with no added functionality.
- *quiz.js* checks if the quiz submission is empty and returns an error if it is, or passes on the data to the data access layer if there actually are responses.
- *rank.js* also connects the controller layer to the data access layer with no added functionality.
- *register.js* makes sure a name, email and password were provided before calling on the data access layer.
- *signin.js* makes sure an email and password were provided before calling on the data access layer.

Above the service layer is the controller layer, with its objects stored in the controller directory. It handles the requests made to specific routes and returns the responses after processing. The controller objects used in this project are:
- *profile.js* recieves the id of a user as a parameter in the request, then it passes this id on to the service layer for processing. Depending on the response from the service layer, it returns the user data or an error message.
- *questions.js* parses the questions.json file and returns all the questions as response.
- *quiz.js* recieves the quiz data which contains a users id and quiz responses. It passes this information to the service layer for processing, and returns the user quiz attempt if successful or an error if not.
- *rank.js* recieves the user data in the request body and passes this on to the service layer. If there are no errors it recieves the needed rank data and user attempts back and returns this in the response.
- *register.js* recieves the users details containing email, name and password in the request body. It passes this to the service layer for processing and returns the user data in a response if there are no errors.
- *signin.js* recieves the users details containing email and password in the request body. It passes this to the service layer for processing and returns the user data in a response if there are no errors.
- *weekData.js* recieves the id for a speccific week as a request parameter. It then reads the data.json file to get the data for that specific week and returns this in the response if there are no errors.

The controllers determine specific behaviour when certain routes are accessed for the back end application. They are all controlled from the index.js file stored in the routes directory.
Using express static the images for each week can be provided to the front end application when requested.
In addition to that all the get and post request are routed to the neccessary controller to handle once they are made to the server application.

The highest level of the back end application is the server.js file. It imports all the neccessary middle ware needed by the server application and it also initiates the port which the application will be listening for requests through. It defaults to port 8080 if the a different port is not provided as an environment variable.

## Database Details
For more details on the 3 tables created in the database.

First the **users table**:
It contains 7 columns, the auto incrementing and unique user Id, the users name, email, number of quiz attempts, max score and the time stamps for when the user data was created and last updated. Many of this columns are auto filled when a new user is created with the name and email being the only thing initially needed. The quiz attempts and max score default to 0 and the time stamps are based on the computer's time.

Next the **login table**:
This contains only 3 colums, the auto incrementing unique id, the users email and a hash of the password that they registered with. It is references at registration and for every signin attempt.

Lastly the **quiz_attempts table**:
This contains an auto incrementing id to give a chronology to the attempts. The attempts with the higher id value happened more recently. This is so that when trying to get the 5 most recent attempts for a user it can be gotten by simply ordering the attempts. Next there is a user_id column that helps link each attempt to a unique user from the users table. Then there is the score column which just records the score for that quiz attempt. Lastly, there is the timestamps that record when the quiz attempt was made.

# How to Run Locally
1. Clone this repo
2. Run ```cd cs50-final-project/cs50-final-front-end``` then ```npm install``` 
(You will need to already have a package manager like npm or yarn for this to work)
3. Run ```cd ../cs50-final-back-end``` then ```npm install``` 
4. Run ``` nano db/knexfile.js ```
5. Modify the following fields in the file
    client: The name of the client you are using, visit [knex website](https://knexjs.org/) for a list of the clients
    database: The name of the database you are running
    user: The name of your database user
    password: The database password
    Save and Close the file.
6. Run ```npm install knex -g```
7. Ensure you have your database server is running then run ```npm run migrate``` (This creates the tables needed for the project)
8. Run ```npm start``` (This starts the server for the back end)
9. Navigate back into the cs50-final-front-end directory and run ```npm start```
