# Meli Frontend Test - BACKEND

This project is built with Express + Typescript. A Cache layer is added using Redis to optimize loading times of incoming requests.

The purpose of this app is esentially to construct a BFF (Backend For Frontend). It will be a middleman for the data Frontend needs and will perform some optimizations like reducing data to only what is absolutely necessary and use cache to reduce requests time.

## Why Typescript?

Typescript is a superset of Javascript. We can do the same things we already do with JS but we can enhance the development process and code quality by adding (or forcing) types.

In the `src/types` folder we find the entities that are important for this project and we can also share them with the Frontend App thanks to the monorepo architecture.
Typescript was configured in strict mode meaning that we enforce the use of types for parameters, returns, variables, etc...

## Why Redis?

Redis is a key-value database that lives in memory. It is a really simple database and is commonly used as a Cache Layer (just like now).

As the app grows and the amount of concurrent users increases, we can expect that:

1. Many users will request the same endpoints (like /api/search?q= and /api/search/:id) with the same information
2. Backend items will not change that often.

It means, that for a same request, the response will be the same (at least, in theory for a defined space of time).
Taking some benefits from that, we can add a cache layer with a short expiration date (for testing, we use 24 hours. In production it could be different) and we can reduce times by a great amount.

As an example, locally we reduced the times for a same request from 1.5 seconds (CACHE-MISS) to 5ms (CACHE-HIT).

## Why Axios?

As we don't have the native `fetch` api as we do have in the browser. We can choose any third-party library. Axios is quite popular and, unless fetch, it has a timeout and default json parsing.

For frontend apps, the added size to the bundling is a consideration in performance.

## About the structure

The structure used for the backend is common express structure with controllers + models + middlewares. As we use Typescript we also added the types folder.

## About testing

We use Jest for testing and a lot of mocking. We obtained a coverage of 85%.

## What could have been improved?

Things that I would like to improve later on with more experience and knowledge.

### Testing

I love TDD, and I would have like to have done it here. But, TDD requires a lot of knowledge in the technology it is being applied.
My expectations is that in a short future I can use TDD for Node.

### Redis

I would have like to make Redis optional and also have a pluggable cache-layer. Like if we want to change Redis to Memcached for example, the process would have been really simple with a well defined design pattern like Facade.

In my list of things to learn, Design Patterns are a must.

## Models

I feel like there's quite some manipulations in the model as we have to work with the MeLi responses and transform them into another type of structure. Perhaps there would have been a better way.