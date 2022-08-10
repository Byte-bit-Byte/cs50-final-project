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
- The database which is created using PostgreSQL, but can easily be modified to a different database because of the use of the knex.js library. The database itself is not part of the project files. 

I will discuss each section in more detail below.

## Front End App Details
The front end of the application was created using the React.js front end library because of how fast and convenient. I will first describe the different aspects of the application that a user can experience when opening the website. Then I will describe how each of the different components of the website were designed and how they function.

### User Experience
The first thing a user sees when opening the CS50 lights website is a brightly colored application with a red to yellow gradient across the background. The gradient is in addition to the moving particles that at responsive to any interactions with the screen.

There is a logo in the top left corner of the screen with a hidden message below it and the then the navigation is either to the right of the logo or below it depending on the width of the screen.
At the bottom of the page the footer contains useful links to the CS50 YouTube website where all the images are sourced from. The medium article that was mentioned earlier. A link to the Git Hub Repository for the project and a link for the source of the website logo.

The home page loads up with a welcome image to the website. Then the user can select any of the weeks from CS50x 2022 from Week 0 to Week 10 and have an image of the stage displayed showing the lights below. As well as the binary representation of the lights and the translation. I added a comment for each to give my insight into what I thought the messages were referencing.

Once a new user is satisfied with exploring the information of all the weeks they can register by clicking on "Register" from the navigation bar. This would redirect them to a registration page that requests a name, email and password. The email validation is done only at the front end because I did not deem the application critical enough for any extra measures. Therefore, any 'string@string.string' would satisfy the email requirements. I actually **DO NOT** recommend people use their actual emails to sign up for this.

Once registered, the user is automatically redirected to a quiz page regardless of if they were ready for it or not. There are 15 questions in the quiz focused mainly on what the hidden messages were for each of the weeks displayed on the home page. There are a few additional questions I added to complete a set of 15.

When a user completes and submits the quiz, the responses are sent to the back end for grading. And since the questions are relatively easy, there is no direct feedback provided. The user is instead redirected to a rank page where a leader board is displayed showing the users with the highest scores obtained using the least quiz attempts. Below the leader board is a display of the scores from the last 5 quiz attempts for the logged in user.

The User can use the "Sign Out" function to log out from their credentials. They can also sign back in from the home page using the "Sign In" link if they already have an account created. On sign out the user is redirected to the registration page by default.

### Front End App Structure


## Back End Server Details

## Database Details