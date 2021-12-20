# MercadoLibre Frontend Test

The current project is a demo app for the Frontend Test in Mercado Libre. The project was structured as a monorepo by using lerna and yarn workspaces.

We have two packages: @meli/backend and @meli/frontend.

## Why a monorepo?

At first I thought of creating two repos, one for the backend and another one for the frontend. This is the most common solution in the wild.
It could have been good enough. But I like that when you write code, you can see the whole project with no need to switch between tabs or editors.

Another possible solution was a single repo too, using Next for the Frontend and the backend could have been written inside the api folder that Next provides by default. It is a common solution too specially when dealing with Proxies or BFF.

I felt like the monorepo was the best option because it gave us the flexibility of having each side of the app in its own folder but with the power of having everything under a same repository. Also, As I decided to use TypeScript I could easily share the type definitions :D

## Backend (Express + TypeScript + Redis)

I used TypeScript for the types, I loved them. It also felt more secure when making little changes here and there. The Redis tool was a something I wanted to try and it really was worth it.

You can check the Backend package and read the README there.

## Frontend (Next + Typescript)

I used Next instead of React for a lot of reason: a defined standard, a set of available tools, performance, SSR and SSG.

You can check the Frontend package and read the README there.