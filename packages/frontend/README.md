# Meli Frontend Test - FRONTEND

This project is built with Next + Typescript.

The purpose of this app is esentially to display three functional pages:

- Search
- Search Results
- Item Detail

The data is obtained from the Backend in the backend package.

## Why fetch and not Axios like in the Backend?

For the sake of performance, we try to reduce dependencies as much as possible. Fetch is a native web api and therefore it is already there, no need to download a third-party library. The disadvantes are that we have to always parse incoming JSON data in an extra line and we don't have a timeout (which in some cases is really important).

## Why Next and not simply React?

Next is a pretty big project in the market and it offers by default three rendering modes: SSG (Static Site Generation), SSR (Server Side Rendering) and CSR (Client Side Rendering).

If we would have choose React, the rendering mode would have been CSR and it will affect a key aspects of a webpage UX like performance (webvitals).
With Next, our Index page is statically generated and the other two are render in the server.

It also speeds up the development speed in applications like this. A lot of thing are already there and we just worry about developing our project (and in my case, learning more of React and Next).

In addition, I'm pretty comfortable writing Nuxt apps (the Next for VueJS). Therefore I found the structure of Next quite similar.

## Why .module.sass instead of just .sass

When creating components, specially for applications that will grow, the more isolated they are, the better. By isolating the styles for single components we avoid conflict styles.

## What did I like?

NextJS seems like a really powerful tool in the market. It feels fast to create and develop experiences.
SASS is new for me. I have used CSS, SCSS and LESS but never SASS. It is interesting to know the whole panorama.
Testing React Components feels more personal than Vue Components. I think that is because of @testing-library/react and the methods it exposes.

## What obstacles did I have?

Well, the most troublesome problem was to set up the tests. I'm not sure why it was so hard (maybe I was exhausted of so much coding) and why it did required so many dependencies. Nonetheless, I made it at the end.

I was also a bit rusty with React. I have used it a couple of times with a frameworks that's called PWA Studio but it was some time ago.
But in reality is not that difficult and mainly because I am comfortable with the JS Ecosystem and writting Vue Apps. There's not that much difference.

I also found it a bit "tricky" to match the design as I usually have an available prototype in XD where I can see all the measurements, colors, typographies and animations... I hope it was OK :D

## What could have been improved?

Things that I would like to improve later on with more experience and knowledge.

### Testing

Same as in the backend. Also I would like to include in the future E2E testing with Cypress.

### Responsive

I tried to match the design and to make it responsive. I didn't modify font sizes nor images in order to be as much close as possible to the given specs.

### Performance

When using SSR the TTFB can diminish. Perhaps with a cache layer it can be improved.

### UX

I would have love to add skeleton screens while loading the data for the Search Results and Item Detail pages. I am so much in love with skeletons but I didn't find an easy way to show a loading page.
