// Gets the CMID of document provided in meta.data.name
export const getSupplementaryCMID = () => {
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