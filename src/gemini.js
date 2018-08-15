import xhr from "xhr";

import { getSupplementaryCMID } from "./utils";

export default function() {
  xhr(
    {
      url: "http://nucwed.aus.aunty.abc.net.au/news/" + getSupplementaryCMID()
    },
    (err, response, body) => {
      const doc = new DOMParser().parseFromString(body, "text/html");
      const startNode = doc.querySelector('a[name="content"]');
      const endNode = doc.querySelector('a[name="endcontent"]');

      if (!startNode || !endNode) {
        console.error(new Error("No content bookends found in document."));
      }

      let currentNode = startNode;
      const injectionRoot = document.querySelector('[name="fullscript"]');

      let fetchedNodes = [];

      while (
        ((currentNode = currentNode.nextSibling),
        currentNode && currentNode !== endNode)
      ) {
        fetchedNodes.push(currentNode);
      }

      fetchedNodes.forEach(node => {
        // Append fetched content
        injectionRoot.appendChild(node);
      });

      // Unwraps injected content from parent
      var parent = injectionRoot.parentNode;
      while (injectionRoot.firstChild)
        parent.insertBefore(injectionRoot.firstChild, injectionRoot);
      parent.removeChild(injectionRoot);
    }
  );
}
