# Meli Frontend Test - FRONTEND

This project is built with Express + Typescript. A Cache layer is added using Redis to optimize loading times of incoming requests.

The purpose of this app is esentially to construct a BFF (Backend For Frontend). It will be a middleman for the data Frontend needs and will perform some optimizations like reducing data to only what is absolutely necessary and use cache to reduce requests time.

## Why Typescript?

Typescript is a superset of Javascript. We can do the same things we already do with JS but we can enhance the development process and code quality by adding (or forcing) types.

In the `src/types` folder we find the entities that are important for this project and we can also share them with the Frontend App thanks to the monorepo architecture.
Typescript was configured in strict mode meaning that we enforce the use of types for parameters, returns, variables, etc...

## What could have been improved?

Things that I would like to improve later on with more experience and knowledge.

### Testing

I love TDD, and I would have like to have done it here. But, TDD requires a lot of knowledge in the technology it is being applied.
My expectations is that in a short future I can use TDD for Node.
