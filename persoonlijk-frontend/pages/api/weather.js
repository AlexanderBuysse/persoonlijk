export default async (req, res) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${req.body}&days=1`,
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
        res.status(200).json({result});
      }
    } catch (e) {
      res.status(500).end(`Something went wrong: ${e}`);
    }
};
