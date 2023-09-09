const fetch = require('node-fetch');
const API_ENDPOINT = 'https://api.vectorizer.io/create';

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const formData = new FormData();
    formData.append('image', event.body.image);
    formData.append('numColors', event.body.numColors);

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${process.env.VECTORIZER_API_KEY}`
            }
        });

        const svgData = await response.text();
        return { statusCode: 200, body: svgData };
    } catch (error) {
        return { statusCode: 500, body: 'Server Error' };
    }
};
