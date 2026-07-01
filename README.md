# Hello_React

# Parcel

- Dev Build
- Local Server
- HMR = Hot Module Replacement // basically on save parcel building and show on localport

- File Watching Algorithhm - written in c++
- Caching - Faster Builds // we see it in parcel-cache file
- Image Optimization
- Minification
- Building
- Compress
- Consistent Hashing
- Code Splitting
- Diffrential Bundling - support older browsers
- HTTPs
- tree Shaking - remove unused code
- Different dev and prod bundles

Namaste Foods
/\*\*

- Header
- - Logo
- - Nav Items
-
- Body
- - Search Bar
- - Restaurant List ← config-driven from resList via .map()
- - RestaurantCard ← receives restaurant.info as prop
-
- Footer
- - Copyright
- - Links
    \*/

---

{resList.map((restaurant) => (
// key must be unique — using the API's own id field
<RestaurantCard key={restaurant.info.id} resData={restaurant.info} />
))}

Question

Why does React need a unique key prop when rendering lists? What happens without one?

Answer
When React renders a list using .map(), it needs a way to uniquely identify each item so its diffing algorithm (Reconciliation) can figure out exactly what changed between renders — not just re-render everything from scratch.

React needs the key to:

. Identify each item uniquely in the virtual DOM
. Track which items were added, removed, or reordered
. Reuse existing DOM elements and component instances efficiently instead of recreating them

What happens without a proper key?

. React may re-render or recreate components unnecessarily on every update
. Component local state (e.g. inside RestaurantCard) can be lost or mismatched — React may apply one card's state to the wrong card
. Overall performance gets worse during list updates

---

Question
Why do we use React when we can do everything with plain HTML, CSS & JS?

Everything React does can be done in vanilla JS — but React supercharges the developer experience. It gives us a declarative model, efficient DOM updates via the Virtual DOM, reusable component architecture, and powerful built-in hooks. The result is code that is faster to write, easier to maintain, and far more scalable.

---

Question
What is the difference between default export and named export?

export default Header;
import Header from "./components/Header";\

export const CDN_URL = "...";
export const LOGO_URL = "...";
import { CDN_URL, LOGO_URL } from "../utils/constants";

Both can coexist in the same file — a file can have one default export and multiple named exports simultaneously.

---

Question
When should you use named export over default export?

Answer
Use named export whenever a single file needs to export more than one thing (e.g. multiple constants or utility functions). A module can only have one default export — attempting multiple default exports causes a compile error. Named exports are also preferred for utility/constants files because the explicit name at the import site makes code more readable.

---

Question
What is a React Hook?

Answer
A hook is simply a regular JavaScript function that React ships with. They are "powerful" because they tap into React's internals — giving components capabilities like state management and side-effect handling. They are pre-built by React's engineering team and become available the moment you install React via npm. The two most essential hooks are:
useState() — state management
useEffect() — side effects

---

Question
What is useState() and how does it work?

Answer
useState() creates a state variable — a special reactive variable that React tracks. It returns an array of exactly two elements:

1. The state value (current data)
2. A setter function to update that value.

import { useState } from "react";
const [listOfRestaurant, setListOfRestaurant] = useState(initialData);

The initial value passed to useState() becomes the default state. Always import it as a named import from "react".

---

Question
Why can't we just use a regular JS variable to update the UI? Why do we need state?

Answer

1. A regular JS variable change is invisible to React — React doesn't know the variable changed, so it never re-renders the component.
2. The UI stays frozen.
3. A state variable is wired into React's rendering engine. When you call the setter function (e.g. setListOfRestaurant(...)), React detects the change, triggers a reconciliation cycle, and re-renders the component with the new value. This keeps the data layer and UI layer always in sync.

---

Question
What is the Reconciliation Algorithm (Diffing Algorithm) in React?

Answer
When React elements are created, they produce Virtual DOM objects — lightweight in-memory representations of the real DOM. On every render, React compares the new Virtual DOM (updated blueprint) against the previous Virtual DOM and calculates the minimum set of real DOM changes needed. This process is called Reconciliation or the Diffing Algorithm. Only the changed nodes are touched in the actual DOM — making updates extremely fast.
Virtual DOM → diff old vs new → apply minimal real DOM patches

---

Question
What is React Fiber and why was it introduced?

Answer
React Fiber is a complete reimplementation of React's core reconciliation algorithm. It was introduced to make React suitable for areas like animations, layout, and gestures. Its headline feature is incremental rendering — the ability to break rendering work into small chunks and spread them across multiple frames, so the browser never blocks on a long render. This is what makes React feel buttery smooth even in complex UIs.

---

Question
What happens when a state variable is updated?

Answer
Three things happen in sequence:

1. React triggers a reconciliation cycle
2. The component re-renders with the new state value
3. React diffs the new Virtual DOM vs the old one and updates only the changed DOM nodes

So, The data layer and UI layer are always kept in sync — this is the core React promise.

----------------------------------------------------------------------------------------

1. if no dependency array => useEffect will be called on every render
2. if dependency array is empty = [] => useEffect will be called only once after initial render(just once)
3. if dependency array has some state variable [btnName] => useEffect will be called only when that state variable changes.
4. all the codn how useeffect work and by default we see it we start to render after the whole componenet renders.

useEffect(() => {
console.log("useEffect called");
}, [btnName]);