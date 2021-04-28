import { createApi } from 'unsplash-js';

export default async (req, res) => {
    try {
        const unsplash = createApi({ accessKey: `${process.env.UNSPLASH_API_KEY}`});
        console.log(process.env.UNSPLASH_API_KEY);
        const name = req.body;
    // feed example
        unsplash.search.getPhotos({
            query: name,
            page: 1,
            perPage: 1,
            orientation: 'landscape',
            }).then(result => {
            if (result.errors) {
            // handle error here
            console.log('error occurred: ', result.errors[0]);
            } else {
            const feed = result.response;

            // extract total and results array from response
            const { total, results } = feed;
            // handle success here
            res.status(200).json({results})
            console.log(`received ${results.length} photos out of ${total}`);
            console.log('first photo: ', results[0]);
            }
        });
    } catch (e) {
      res.status(500).end(`Something went wrong: ${e}`);
    }
};