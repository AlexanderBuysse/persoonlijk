export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const response = await fetch(
        `https://api.buttondown.email/v1/subscribers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
          },
          body: JSON.stringify({ email: req.body.email, tags: ["site"] }),
        }
      );
      if (response.status === 201) {
        res.status(200).json({ succeeded: true });
      } else {
        const result = await response.json();
        let reason = "onbekend";
        if (result.detail) {
          reason = result.detail;
        }
        if (Array.isArray(result)) {
          reason = result.join();
        }
        res.status(200).json({ succeeded: false, reason });
      }
    } catch (e) {
      res.status(500).end(`Something went wrong: ${e}`);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};
