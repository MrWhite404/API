import axios from 'axios';
export const fetchYoutube = async (url) => {
    const response = await axios.post('https://yt1s.com/api/ajaxSearch/index', new URLSearchParams({
        'q': url,
        'vt': 'home'
    }), {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.51'
        }
    });
    return response;
};
export const requestDownload = async (id, token) => {
    const { data } = await axios.post('https://yt1s.com/api/ajaxConvert/convert', new URLSearchParams({
        'vid': id,
        'k': token
    }), {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.51'
        }
    });
    return data;
};
//# sourceMappingURL=yt.js.map