const axios = require('axios');

(async () => {
  try {
    console.log('Creating short URL...')
    const create = await axios.post('http://localhost:3000/api/url/shorten', { url: 'https://example.com' });
    console.log('CREATE_RESP', create.data);
    const id = create.data.id;
    if (!id) {
      console.error('No id returned from create response');
      process.exit(1);
    }

    console.log('Requesting summary...')
    const gen = await axios.post(`http://localhost:3000/api/summary/${id}`);
    console.log('SUMMARY_RESP', gen.data);
  } catch (e) {
    console.error('ERR', e.response ? e.response.data : e.message);
    process.exit(1);
  }
})();
