const InfoIntro = require('../../models/info_intro');

const IntroController = {
    createInfoIntro: async (req, res) => {
        try {

            let { name, key, title_vi, title_en, content_vi, content_en } = req.body;

            if (!key) return res.status(400).json({ status: false, message: "key is required!" });
            if (!name) return res.status(400).json({ status: false, message: "name is required!" });
            if (!content_vi) return res.status(400).json({ status: false, message: "content_vi is required!" });
            if (!content_en) return res.status(400).json({ status: false, message: "content_en is required!" });

            let newInfoIntro = new InfoIntro({
                key,
                name,
                title_vi,
                title_en,
                content_vi,
                content_en,
            });

            await newInfoIntro.save()
                .then(() => {
                    return res.status(200).json({
                        status: true,
                        message: 'Create Successfully!',
                    })
                })
                .catch((err) => {
                    return res.status(400).json({
                        status: false,
                        message: err.message,
                    })
                });
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            });
        };
    },

    getContentBanner: async (req, res) => {
        try {
            let { lang } = req.headers;

            if (!lang) {
                lang = "en";
            };

            let content = lang === "en" ? "content_en" : "content_vi";
            let title = lang === "en" ? "title_en" : "title_vi";

            const pipeline = [
                {
                    $match: {
                        key: { $in: ["content_banner"] },
                    },
                },
                {
                    $project: {
                        content: `$${content}`, // Đổi tên field
                        title: `$${title}`,
                    },
                },
            ];
            const titleBanner = await InfoIntro.aggregate(pipeline);

            return res.status(200).json({
                status: true,
                data: titleBanner,
            });

        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            });
        };
    },
}

module.exports = IntroController