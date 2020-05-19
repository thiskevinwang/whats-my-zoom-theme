const ENDPOINT = "https://odc8qwofsc.execute-api.us-east-1.amazonaws.com/dev";

export default async (req, res) => {
  console.log(req.method, req.body);

  if (req.method === "POST") {
    const data = await fetch(ENDPOINT, {
      method: "POST",
      body: req.body,
    }).then((res) => res.json());

    res.send(data);
  } else {
    const themes = await fetch(ENDPOINT, {}).then((res) => res.json());

    return res.send(themes);
  }
};