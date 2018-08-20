import xhr from 'xhr';

// Gets the CMID of document provided in meta.data.name
const getSupplementaryCMID = () => {
  const SUPPLEMENTARY_CMID_META_SELECTOR = 'meta[name="supplementary"]';
  const metaEl = document.querySelector(SUPPLEMENTARY_CMID_META_SELECTOR);

  if (!metaEl) {
    throw new Error(`${SUPPLEMENTARY_CMID_META_SELECTOR} does not exist`);
  }

  let cmid = metaEl.getAttribute("content");

  if (cmid.indexOf("CMArticle") > -1) {
    cmid = cmid.match(/id=(\d+)/)[1];
  }

  if (cmid != +cmid) {
    throw new Error(`"${cmid}" does not look like a CMID`);
  }

  return cmid;
};

const fullReplace = (callback) => {
  xhr(
    {
      url: "/news/" + getSupplementaryCMID()
    },
    (err, response, body) => {
      const doc = new DOMParser().parseFromString(body, "text/html");
      const startNode = doc.querySelector('a[name="content"]');
      const endNode = doc.querySelector('a[name="endcontent"]');

      if (!startNode || !endNode) {
        console.error(
          new Error("Content bookends not found in supplementary document.")
        );
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

      if (callback) callback();
    }
  );
};

// TODO: Add other functions like one that returns an array of named nodes for Colin

export { fullReplace };
