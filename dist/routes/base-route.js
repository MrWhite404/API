import { Router } from 'express';
import { ExpressResponse } from '../core/utils/response.js';
const app = Router();
import { fetchYoutube, requestDownload } from '../core/scraper/yt.js';
import { fetchFacebook } from '../core/scraper/fb.js';
app.get('/fb/fetch', async (req, res) => {
    const data = await fetchFacebook();
    return ExpressResponse(res, true, 200, {
        result: data
    });
});
app.get('/yt/fetch', async (req, res) => {
    const { query: { url } } = req;
    if (!url) {
        return ExpressResponse(res, false, 400, {
            message: 'INVALID_URL'
        });
    }
    const { data } = await fetchYoutube(url);
    if (data.mess.length !== 0) {
        return ExpressResponse(res, false, 400, {
            message: 'INVALID_URL'
        });
    }
    const { title, vid, a: channel, links: { mp4, mp3 } } = data;
    const links = {
        video: [],
        audio: []
    };
    for (const key of Object.keys(mp4)) {
        links.video.push(mp4[key]);
    }
    if (mp3) {
        for (const key of Object.keys(mp3)) {
            links.audio.push(mp3[key]);
        }
    }
    const dLinks = [];
    for (const { k } of links.video) {
        dLinks.push(requestDownload(vid, k));
    }
    for (const { k } of links.audio) {
        dLinks.push(requestDownload(vid, k));
    }
    const result = await Promise.all(dLinks);
    const response = {
        title: title,
        id: vid,
        thumbnail: `https://img.youtube.com/vi/${vid}/hqdefault.jpg`,
        channel: channel,
        links: result
    };
    return ExpressResponse(res, true, 200, response);
});
app.post('/yt/convert', async (req, res) => {
    const { body: { id, token } } = req;
    const data = await requestDownload(id, token);
    return ExpressResponse(res, true, 200, data);
});
export default app;
//# sourceMappingURL=base-route.js.map