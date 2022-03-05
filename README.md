# Papillon (HackZurich2021)

## Inspiration
As polyglots and language learners, we noticed the absence of multiplayer language learning platforms. We believe that building such a product will not only be a good complement to individual study, but also as a way to connect with like-minded learners and to build a community.

## What it does
Users join the platform and are matched by their level. They start a game consisting of two phases. During the first, each player must describe a target word and avoid a list of excluded words - like in the game called Taboo. In the second phase, the players must guess the corresponding word to a description given by someone else in the previous phase. This comes with a twist, as the options are likely to apply to the description before. Players get points by avoiding the excluded terms, guessing the word correctly, and writing descriptions that help others succeed in the second phase.

## How we built it
We built the whole app using Typescript (Lerna monorepo). The frontend is in React.js, the backend is an Express.js server running the Colyseus multiplayer framework for synchronizing the game state between multiple users.

## Challenges we ran into
As we were not familiar with the Colyseus framework and multiplayer state management, we did not make the simplest architectural decisions. However, we managed to build reliable state synchronization between server and clients.

## Accomplishments that we're proud of
We were tempted to develop an NLP-based solution to evaluate descriptions and generate questions, but we chose to focus on showcasing the end-to-end flow with hand-picked examples. We were also proud of our ability to combine our individual strengths in Backend, Frontend, UX and Product to deliver a cohesive experience.

## What we learned
One of the learnings was the different reasoning required for multiplayer applications, where the behavior of the application is determined by the number of users and their dynamics.

## What's next for Papillon
For Papillon to grow into a mature and attractive product, we need to add more content with high quality and educational value. This can attract more users who can contribute with content themselves.

## Built With
![colyseus](https://img.shields.io/badge/-colyseus-blue)
![css](https://img.shields.io/badge/-css-blue)
![express.js](https://img.shields.io/badge/-express.js-blue)
![html](https://img.shields.io/badge/-html-blue)
![lerna](https://img.shields.io/badge/-lerna-blue)
![react](https://img.shields.io/badge/-react-blue)
![tailwind](https://img.shields.io/badge/-tailwind-blue)
![typescript](https://img.shields.io/badge/-typescript-blue)
![websockets](https://img.shields.io/badge/-websockets-blue)

## Try it out

### Install `lerna`
`$ npm i -g lerna`

### Install
`$ lerna bootstrap`

### Run
`$ lerna run dev --stream`
