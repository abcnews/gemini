import xhr from "xhr";

export default function() {
  xhr(
    {
      url:
        "http://nucwed.aus.aunty.abc.net.au/news/2018-08-13/dynamic-content-temperature-records/10093466"
    },
    (err, response, body) => {
      const doc = new DOMParser().parseFromString(body, "text/html");
      const startNode = doc.querySelector('a[name="content"]');
      const endNode = doc.querySelector('a[name="endcontent"]');

      console.log(doc);
    }
  );
}
