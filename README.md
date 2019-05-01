# Gemini

A simple package that grabs another CoreMedia article and extracts the content to use dynamically in your story.

Install

```bash
npm install @abcnews/gemini
```

Import

```javascript
import * as gemini from "@abcnews/gemini";
```

or

```javascript
const gemini = require("@abcnews/gemini");
```

Run

```javascript
gemini.fullReplace(callbackAfterReplace);
```

Make sure your original CoreMedia document has in Context Settings.

It will look for `#fullscript` and mount the fetched content there.

Use `#remove` and `#endremove` to write your fallback content for Apple News and AMP etc.

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

And your dynamic content article should have `#content` up top and `#endcontent` down the bottom and everything in between will get pulled in.

_Based on work by [Colin Gourlay](https://github.com/colingourlay)_
