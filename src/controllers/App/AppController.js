const Content = require('../../models/content');

const AppController = {
    createContentApp: async (req, res) => {
        try {
            console.log('Call API createContentApp')
            let { content_en, content_vi, key, type } = req.body;

            if (!key) return res.status(400).json({ status: false, message: "key is required!" });
            if (!type) return res.status(400).json({ status: false, message: "type is required!" });
            if (!content_en) return res.status(400).json({ status: false, message: "content_en is required!" });
            if (!content_vi) return res.status(400).json({ status: false, message: "content_vi is required!" });

            let newContent = new Content({
                content_en,
                content_vi,
                key,
                type
            });

            await newContent.save()
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
        }
    },

    getContentApp: async (req, res) => {
        try {
            let { key } = req.query;
            let { lang } = req.headers;

            if (!key) return res.status(400).json({ status: false, message: "key is required!" });

            if (!lang) {
                lang = "en";
            };

            let content = lang === "en" ? "content_en" : "content_vi";

            const pipeline = [
                {
                    $match: {
                        key: key
                    },
                },
                {
                    $project: {
                        key: 1,
                        type: 1,
                        content: `$${content}`, // Đổi tên field
                    },
                },
            ];
            const contentApp = await Content.aggregate(pipeline);

            return res.status(200).json({
                status: true,
                data: contentApp,
            });
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            });
        };
    }
}

module.exports = AppController;