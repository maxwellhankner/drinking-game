# Cheers

## Introduction
Cheers is a multiplayer mobile drinking game. This application allows a group of users to join into a game together using each of their own devices. Once all parties are connected, a series of interactive prompts are played until the game is ended. Two types of prompts are randomly generated for the users to respond to. The two game types are true/false questions and open response. If the players get a true/false question wrong, they are directed to take a drink, but if they get it right, they are in the clear. When an open response prompt runs, players response with text and when all responses are submitted, they vote to decide which is the funniest. Before the game starts, players can create their own prompts to make things more personal.

## Features
Cheers is live multiplayer, meaning all players are connected to eachother with a server. That connection works via the socket.io package functionality. This application also features a sound library that allows for in-game noises to trigger on certain buttons within the game. For example, when a user gets a true/false question wrong, the noise of who gasses tinking together is played. Cheers prompts are stored in a database and fetched by the main server code when a new prompt cycle begins. One feature that will eventually be removed is a button that allows all players the ability to end the game and refresh all the player connections.

# How to Use
This application is currently being hosted on Heroku at:
https://safe-cove-74547.herokuapp.com/

It is also available on GitHub at:
https://github.com/maxwellhankner/drinking-game

To run locally:
- clone the repo
- Install the packages with "npm i" in the terminal
- Run the server with "node server.js" in the terminal
- Open a browser tap and go to localhost//:8080
- Open more browser tabs to utilize multiplayer functionality

## Not Included
There are definitely a few things we would like to include in the application. Our next plan was to include a third game type allowing players to vote on one person in the group based on prompts that require a players name as the answer. We would also like to make other game versions like a non-drinking game, or a competitive version that keeps score. Another thing that would be awesome to work on is getting the app to function a little better on mobile. The sounds currently do not trigger on ios and some andriod devices. So that would be a good thing to get working. 

## Authrors
Jason Kroening & Max Hankner

### Thanks for checking out our project