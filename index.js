/*
 * © 2026 SeXyxeon (VOIDSEC)
 *
 * ⚠️ COPYRIGHT NOTICE
 * This source code is protected under copyright law.
 * Any form of re-uploading, recoding, modification,
 * selling, or redistribution WITHOUT explicit permission
 * from the original author is strictly prohibited.
 *
 * ❌ NO CREDIT = NO PERMISSION
 * ❌ DO NOT CLAIM THIS CODE AS YOUR OWN
 *
 * ✔️ Usage or modification is allowed ONLY
 * with prior permission and proper credit.
 *
 * OFFICIAL LINKS (ONLY):
 * YouTube   : https://youtube.com/@voidsec7718
 * Instagram : sabir._7718
 * Telegram  : https://t.me/SABIR7718
 * GitHub    : https://github.com/SABIR7718
 * WhatsApp  : +91 73650 85213
 *
 * Violations may result in DMCA takedown
 * or termination of the Telegram bot.
 */

const express = require('express');
const cors = require('cors');
const {
    log
} = require("@sabir7718/log");
const config = require('./config');
const axios = require("axios");
const qs = require("qs");

async function StartLovingInsta(url_media, LOVE = {
    retries: 5,
    delay: 1000
}) {
    return new Promise(async (resolve, reject) => {
        try {
            url_media = await check_IS_S7_LoVe_SY(url_media);
            const SHORTCODE = getShortcode(url_media);
            const INSTAGRAM_REQUEST = await instagramRequest(SHORTCODE, LOVE.retries, LOVE.delay);
            const OUTPUT_DATA = SYxS7(INSTAGRAM_REQUEST);
            resolve(OUTPUT_DATA);
        } catch (err) {
            reject(err);
        }
    });
}

async function StartLovingFace(videoUrl, cookie, useragent) {
    return new Promise((resolve, reject) => {
        const headers = {
            "sec-fetch-user": "?1",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-site": "none",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "cache-control": "max-age=0",
            authority: "www.facebook.com",
            "upgrade-insecure-requests": "1",
            "accept-language": "en-GB,en;q=0.9,tr-TR;q=0.8,tr;q=0.7,en-US;q=0.6",
            "sec-ch-ua": '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
            "user-agent": useragent || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            cookie: config.FacEcookie || "sb=Rn8BYQvCEb2fpMQZjsd6L382; datr=Rn8BYbyhXgw9RlOvmsosmVNT; c_user=100003164630629; _fbp=fb.1.1629876126997.444699739; wd=1920x939; spin=r.1004812505_b.trunk_t.1638730393_s.1_v.2_; xs=28%3A8ROnP0aeVF8XcQ%3A2%3A1627488145%3A-1%3A4916%3A%3AAcWIuSjPy2mlTPuZAeA2wWzHzEDuumXI89jH8a_QIV8; fr=0jQw7hcrFdas2ZeyT.AWVpRNl_4noCEs_hb8kaZahs-jA.BhrQqa.3E.AAA.0.0.BhrQqa.AWUu879ZtCw",
        };
        const parseString = (string) => JSON.parse(`{"text": "${string}"}`).text;
        if (!videoUrl || !videoUrl.trim())
            return reject("Please specify the Facebook URL");
        if (["facebook.com", "fb.watch"].every((domain) => !videoUrl.includes(domain)))
            return reject("Please enter the valid Facebook URL");
        axios.get(videoUrl, {
            headers
        }).then(({
            data
        }) => {
            var _a, _b;
            data = data.replace(/&quot;/g, '"').replace(/&amp;/g, "&");
            const sdMatch = data.match(/"browser_native_sd_url":"(.*?)"/) || data.match(/"playable_url":"(.*?)"/) || data.match(/sd_src\s*:\s*"([^"]*)"/) || data.match(/(?<="src":")[^"]*(https:\/\/[^"]*)/);
            const hdMatch = data.match(/"browser_native_hd_url":"(.*?)"/) || data.match(/"playable_url_quality_hd":"(.*?)"/) || data.match(/hd_src\s*:\s*"([^"]*)"/);
            const titleMatch = data.match(/<meta\sname="description"\scontent="(.*?)"/);
            const thumbMatch = data.match(/"preferred_thumbnail":{"image":{"uri":"(.*?)"/);
            var duration = data.match(/"playable_duration_in_ms":[0-9]+/gm);
            if (sdMatch && sdMatch[1]) {
                const result = {
                    url: videoUrl,
                    duration_ms: Number(duration[0].split(":")[1]),
                    sd: parseString(sdMatch[1]),
                    hd: hdMatch && hdMatch[1] ? parseString(hdMatch[1]) : "",
                    title: titleMatch && titleMatch[1] ? parseString(titleMatch[1]) : (_b = (_a = data.match(/<title>(.*?)<\/title>/)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : "",
                    thumbnail: thumbMatch && thumbMatch[1] ? parseString(thumbMatch[1]) : ""
                };
                resolve(result);
            } else {
                reject("Unable to fetch video information at this time. Please try again");
            }
        }).catch((err) => {
            reject(`Unable to fetch video information. Axios Error : ${err.code} - ${err.cause}`);
        });
    });
}


async function check_IS_S7_LoVe_SY(url) {
    let split_url = url.split("/");
    if (split_url.includes("share")) {
        let res = await axios.get(url);
        return res.request.path;
    }
    return url;
}

function formatPostInfo(S7_LoVe_SY) {
    try {
        let mediaCapt = S7_LoVe_SY.edge_media_to_caption.edges;
        const capt = (mediaCapt.length === 0) ? "" : mediaCapt[0].node.text;
        return {
            owner_username: S7_LoVe_SY.owner.username,
            owner_fullname: S7_LoVe_SY.owner.full_name,
            is_verified: S7_LoVe_SY.owner.is_verified,
            is_private: S7_LoVe_SY.owner.is_private,
            likes: S7_LoVe_SY.edge_media_preview_like.count,
            is_ad: S7_LoVe_SY.is_ad,
            caption: capt
        };
    } catch (err) {
        throw new Error(`Failed to format post info: ${err.message}`);
    }
}

function formatSYLoveDetails(mediaData) {
    try {
        if (!mediaData) {
            throw new Error("mediaData is undefined");
        }

        if (mediaData.is_video !== undefined) {
            if (mediaData.is_video) {
                return {
                    type: "video",
                    dimensions: mediaData.dimensions || null,
                    video_view_count: mediaData.video_view_count || 0,
                    url: mediaData.video_url || null,
                    thumbnail: mediaData.display_url || null
                };
            } else {
                return {
                    type: "image",
                    dimensions: mediaData.dimensions || null,
                    url: mediaData.display_url || null
                };
            }
        }

        return {
            type: "unknown",
            raw: mediaData
        };

    } catch (err) {
        throw new Error(`Failed to format media details: ${err.message}`);
    }
}

function getShortcode(url) {
    try {
        let split_url = url.split("/");
        let post_tags = ["p", "reel", "tv", "reels"];
        let index_shortcode = split_url.findIndex(item => post_tags.includes(item)) + 1;
        let shortcode = split_url[index_shortcode];
        return shortcode;
    } catch (err) {
        throw new Error(`Failed to obtain shortcode: ${err.message}`);
    }
}
async function getCSRF_SYLoVe() {
    try {
        let LOVE = {
            method: 'GET',
            url: 'https://www.instagram.com/',
        };
        const SYLoVe = await new Promise((resolve, reject) => {
            axios.request(LOVE).then((response) => {
                if (!response.headers['set-cookie']) {
                    reject(new Error('CSRF not found in response headers.'));
                } else {
                    const csrfCookie = response.headers['set-cookie'][0];
                    const csrfSYLoVe = csrfCookie.split(";")[0].replace("csrftoken=", '');
                    resolve(csrfSYLoVe);
                }
            }).catch((err) => {
                reject(err);
            });
        });
        return SYLoVe;
    } catch (err) {}
}

function isLove(S7_LoVe_SY) {
    try {
        return S7_LoVe_SY["__typename"] == "XDTGraphSidecar";
    } catch (err) {}
}

async function instagramRequest(shortcode, retries, delay) {
    var _a;
    try {
        const Love_URL_SYxS7 = "https://www.instagram.com/graphql/query";
        const InstalLoveId_SYxS7 = "9510064595728286";
        let dataBody = qs.stringify({
            'variables': JSON.stringify({
                'shortcode': shortcode,
                'fetch_tagged_user_count': null,
                'hoisted_comment_id': null,
                'hoisted_reply_id': null
            }),
            'doc_id': InstalLoveId_SYxS7
        });
        const SYLoVe = await getCSRF_SYLoVe();
        let LOVE = {
            method: 'post',
            maxBodyLength: Infinity,
            url: Love_URL_SYxS7,
            headers: {
                'X-CSRFToken': SYLoVe,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Origin': 'https://www.instagram.com',
                'Referer': 'https://www.instagram.com/',
                // 'Cookie': config.InstaCookie
            },
            data: dataBody
        };
        const {
            data
        } = await axios.request(LOVE);
        if (!((_a = data.data) === null || _a === void 0 ? void 0 : _a.xdt_shortcode_media))
            throw new Error("Only posts/reels supported, check if your link is valid.");
        return data.data.xdt_shortcode_media;
    } catch (err) {
        const errorCodes = [429, 403];
        if (err.response && errorCodes.includes(err.response.status) && retries > 0) {
            const retryAfter = err.response.headers['retry-after'];
            const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : delay;
            await new Promise(res => setTimeout(res, waitTime));
            return instagramRequest(shortcode, retries - 1, delay * 2);
        }
    }
}

function SYxS7(S7_LoVe_SY) {
    try {
        let url_list = [],
            media_details = [];
        const IS_LOVE = isLove(S7_LoVe_SY);
        if (IS_LOVE) {
            S7_LoVe_SY.edge_sidecar_to_children.edges.forEach((media) => {
                if (!media?.node) return;
                media_details.push(formatSYLoveDetails(media.node));
                if (media.node.is_video) {
                    url_list.push(media.node.video_url);
                } else {
                    url_list.push(media.node.display_url);
                }
            });
        } else {
            media_details.push(formatSYLoveDetails(S7_LoVe_SY));
            if (S7_LoVe_SY.is_video) {
                url_list.push(S7_LoVe_SY.video_url);
            } else {
                url_list.push(S7_LoVe_SY.display_url);
            }
        }
        return {
            results_number: url_list.length,
            url_list,
            post_info: formatPostInfo(S7_LoVe_SY),
            media_details
        };
    } catch (err) {
        throw new Error(`Failed to create output data: ${err.message}`);
    }
}


const SABIR7718 = express();
const PORT = 3000;

SABIR7718.use(cors());
SABIR7718.use(express.json());

const SABIR_LOvS_SY = StartLovingInsta;
const Do_You_Love_S7 = StartLovingFace;

async function getReel(url) {
    try {
        const res = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Linux; Android 10)",
                "Accept": "text/html",
                "Cookie": config.instaCookie
            }
        });

        const html = res.data;

        if (html.includes("login")) {
            throw new Error("Blocked (login page)");
        }

        const jsonMatch = html.match(/window\._sharedData = (.*?);<\/script>/);

        if (!jsonMatch) {
            throw new Error("Shared data not found");
        }

        const json = JSON.parse(jsonMatch[1]);

        const media =
            json?.entry_data?.PostPage?.[0]?.graphql?.shortcode_media;

        if (!media) {
            throw new Error("Media not found in JSON");
        }

        if (!media.video_url) {
            throw new Error("No video in this post");
        }

        return {
            status: true,
            url: media.video_url
        };

    } catch (err) {
        throw new Error("Final Android method failed: " + err.message);
    }
}

SABIR7718.get('/sylove', async (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).json({
            status: "error",
            message: "URL is required"
        });
    }

    try {
        if (targetUrl.includes('instagram.com') || targetUrl.includes('instagr.am')) {
            log('info', 'API', `INSTAGRAM_REQ-${targetUrl}`);

            const SY_LoVe = await SABIR_LOvS_SY(targetUrl);
            //  const SY_LoVe = await getReel(targetUrl);

            if (SY_LoVe && SY_LoVe.url_list && SY_LoVe.url_list.length > 0) {

                return res.json({
                    status: "success",
                    platform: "Instagram",
                    results: SY_LoVe.results_number,
                    video_url: SY_LoVe.url_list,
                    post_info: SY_LoVe.post_info,
                    dev: "SABIR7718"
                });
            } else {
                throw new Error("Empty response from Instagram engine");
            }
        } else if (targetUrl.includes('facebook.com') || targetUrl.includes('fb.watch') || targetUrl.includes('fb.com')) {
            log('info', 'API', `FACEBOOK_REQ-${targetUrl}`);

            const S7_LoVe_SY = await Do_You_Love_S7(targetUrl);

            if (S7_LoVe_SY && (S7_LoVe_SY.hd || S7_LoVe_SY.sd)) {
                return res.json({
                    status: "success",
                    platform: "Facebook",
                    video_url: S7_LoVe_SY.hd || S7_LoVe_SY.sd,
                    title: S7_LoVe_SY.title || "Facebook Video",
                    dev: "SABIR7718"
                });
            }
        }

        res.status(404).json({
            status: "fail",
            message: "Media not found"
        });

    } catch (err) {
        log('error', 'API', `${err.message}`);

        if (err.message.includes('401')) {
            return res.status(401).json({
                status: "error",
                message: "Instagram Blocked the Request (401). IP limit reached or Login Required.",
                tip: "Try using a VPN"
            });
        }

        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
});

SABIR7718.listen(PORT, () => {
    log('success', 'SERVER', `START ON PORT ${PORT}`);
});