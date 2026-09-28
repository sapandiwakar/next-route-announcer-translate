# Route announcer crash under browser translation

Minimal reproduction (from `examples/reproduction-template`) for the App Router
route announcer crashing after Chrome page translation. The page content is
German so that Chrome offers translation and keeps it on across navigations.

```sh
npm install
npm run build && npm start
```

1. Open http://localhost:3000 in Chrome with English (or any non-German) as the browser language.
2. Accept Chrome's offer to translate the page from German.
3. Click "Seite mit Titel". The route announcer now holds that page's title.
4. Click "Startseite".

The client crashes on every attempt with

```
Uncaught NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.
```

The home page has no title and no `<h1>`, so the announcement becomes empty and
React removes the text node `AppRouterAnnouncer` rendered into
`next-route-announcer`. Chrome translation has already replaced that node, so
the removal throws.

With the change from https://github.com/vercel/next.js/pull/98314 applied to
`next/dist/client/components/app-router-announcer.js` (rendering the
announcement as `<span key={routeAnnouncement}>`), the same steps do not crash.
