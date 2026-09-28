# Route announcer crash under browser translation

Minimal reproduction (from `examples/reproduction-template`) for the App Router
route announcer crashing after Chrome page translation. The app renders no bare
text nodes of its own; the node that breaks is the one `AppRouterAnnouncer`
renders into `next-route-announcer`.

```sh
npm install
npm run build && npm start
```

## Crash

1. Open http://localhost:3000 in Chrome, in a normal window (translation does not run in embedded previews).
2. Click "Titled page". The route announcer now holds the text `Titled page`.
3. Translate the page (Chrome menu > Translate, any language).
4. Click "Untitled page".

The client crashes with `NotFoundError: Failed to execute 'removeChild' on 'Node':
The node to be removed is not a child of this node.`

## Stale announcements

Same as above, but in step 4 click "Another titled page". There is no crash, but
the announcer region still shows the translated text of the previous title
instead of `Another titled page`.

## Without Chrome translation

Step 3 can be replaced by running this in the DevTools console. It applies the
same `<font>` rewrite Chrome translation does to the announcer's text node:

```js
const region = document.querySelector('next-route-announcer').shadowRoot.querySelector('#__next-route-announcer__')
const text = region.firstChild
const outer = document.createElement('font')
const inner = document.createElement('font')
outer.appendChild(inner)
inner.textContent = text.nodeValue
region.replaceChild(outer, text)
```
