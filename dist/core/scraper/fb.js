import axios from 'axios';
export const fetchFacebook = async () => {
    const response = await axios.post('https://www.getfvid.com/downloader', new URLSearchParams({
        'url': 'https://fb.watch/llhz7jzdDC/'
    }), {
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.51'
        }
    });
    return response.data;
};
//# sourceMappingURL=fb.js.map