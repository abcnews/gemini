# Gemini

A simple package that grabs another CoreMedia article and extracts the content to use dynamically in your story.

Install

```bash
npm install @abcnews/gemini
```

Import

```javascript
import * as gemini from "gemini";
```

or

```javascript
const gemini = require("@abcnews/gemini");
```

Run

```javascript
gemini.fullReplace(callbackAfterReplace);
```

Make sure your original CoreMedia document has in Context Settings

```
struct
|
|- <> meta.data.name
|  |
|  |- doc: supplementary=blah blah
|
|- <> mobile.meta.data.name
|  |
|  |- doc: supplementary=blah blah
```

_Based on work by [Colin Gourlay](https://github.com/colingourlay)_
