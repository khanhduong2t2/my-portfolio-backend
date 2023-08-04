const ListWebsite = require('../../models/list_website');
const DetailWeb = require('../../models/detail_web');

const WebController = {

    createItemWeb: async (req, res) => {
        try {
            let {
                key,
                content_en,
                content_vi,
                name_en,
                name_vi,
                img_intro,
                arr_language,
                arr_link
            } = req.body;

            if (!key) return res.status(400).json({ status: false, message: "key is required!" });
            if (!name_en) return res.status(400).json({ status: false, message: "name_en is required!" });
            if (!name_vi) return res.status(400).json({ status: false, message: "name_vi is required!" });
            if (!content_en) return res.status(400).json({ status: false, message: "content_en is required!" });
            if (!content_vi) return res.status(400).json({ status: false, message: "content_vi is required!" });
            if (!img_intro) return res.status(400).json({ status: false, message: "img_intro is required!" });

            let newItemWeb = new ListWebsite({
                key,
                content_en,
                content_vi,
                name_en,
                name_vi,
                img_intro,
                arr_language,
                arr_link
            });

            await newItemWeb.save()
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

    getListWeb: async (req, res) => {
        try {
            let { lang } = req.headers;

            if (!lang) {
                lang = "en";
            };

            let content = lang === "en" ? "content_en" : "content_vi";
            let name = lang === "en" ? "name_en" : "name_vi";

            const pipeline = [
                {
                    $project: {
                        key: 1,
                        img_intro: 1,
                        arr_language: 1,
                        arr_link: 1,
                        color: 1,
                        content: `$${content}`, // Đổi tên field
                        name: `$${name}`, // Đổi tên field
                    },
                },
            ];
            const listWeb = await ListWebsite.aggregate(pipeline);

            return res.status(200).json({
                status: true,
                data: listWeb,
            });
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            });
        };
    },

    createDetailWeb: async (req, res) => {
        try {
            let {
                key,
                img_intro,
                content_en,
                content_vi,
                name_en,
                name_vi,
                arr_feature,
            } = req.body;

            if (!key) return res.status(400).json({ status: false, message: "key is required!" });
            if (!name_en) return res.status(400).json({ status: false, message: "name_en is required!" });
            if (!name_vi) return res.status(400).json({ status: false, message: "name_vi is required!" });
            if (!content_en) return res.status(400).json({ status: false, message: "content_en is required!" });
            if (!content_vi) return res.status(400).json({ status: false, message: "content_vi is required!" });
            if (!img_intro) return res.status(400).json({ status: false, message: "img_intro is required!" });

            let newDetailWeb = new DetailWeb({
                key,
                content_en,
                content_vi,
                name_en,
                name_vi,
                img_intro,
                arr_feature
            });

            await newDetailWeb.save()
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

    getDetailWeb: async (req, res) => {
        try {
            let { key } = req.query;
            let { lang } = req.headers;

            if (!key) return res.status(400).json({ status: false, message: "key is required!" });

            if (!lang) {
                lang = "en";
            };

            let content = lang === "en" ? "content_en" : "content_vi";
            let name = lang === "en" ? "name_en" : "name_vi";

            const pipeline = [
                {
                    $match: {
                        key: key
                    },
                },
                {
                    $project: {
                        key: 1,
                        img_intro: 1,
                        arr_feature: 1,
                        name: `$${name}`, // Đổi tên field
                        content: `$${content}` // Đổi tên field
                    },
                },
            ];
            const detailWeb = await DetailWeb.aggregate(pipeline);

            return res.status(200).json({
                status: true,
                data: detailWeb,
            });
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            });
        };
    },
}

module.exports = WebController;