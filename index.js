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
const { instagramGetUrl } = require('instagram-url-direct');
const { getFbVideoInfo } = require('fb-downloader-scrapper');
const { log } = require("@sabir7718/log")
const SABIR7718 = express();
const PORT = 3000;

SABIR7718.use(cors());
SABIR7718.use(express.json());

// SY Love Here 🥺 

const SABIR_LOvS_SY = instagramGetUrl;
const Do_You_Love_S7 = getFbVideoInfo;

SABIR7718.get('/sylove', async (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).json({ status: "error", message: "URL is required" });
    }

    try {
        if (targetUrl.includes('instagram.com') || targetUrl.includes('instagr.am')) {
            const SY_LoVe = await SABIR_LOvS_SY(targetUrl);
            log('info', 'API', `INSTAGRAM-${targetUrl}`);            
            
            if (SY_LoVe && SY_LoVe.url_list && SY_LoVe.url_list.length > 0) {
                return res.json({
                    status: "success",
                    platform: "Instagram",
                    video_url: SY_LoVe.url_list[0],
                    dev: "SABIR7718"
                });
            }
        } 
        
        else if (targetUrl.includes('facebook.com') || targetUrl.includes('fb.watch') || targetUrl.includes('fb.com')) {
            const S7_LoVe_SY = await Do_You_Love_S7(targetUrl);
            log('info', 'API', `FACEBOOK-${targetUrl}`);
            
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

        res.status(404).json({ status: "fail", message: "Media not found" });

    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
});

SABIR7718.listen(PORT, () => {
    log('success', 'SERVER', `START ON PORT ${PORT}`);
});
