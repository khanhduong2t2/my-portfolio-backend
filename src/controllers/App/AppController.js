const Content = require('../../models/content');
const ItemApp = require('../../models/item_app');
const DetailApp = require('../../models/detail_app');

const AppController = {
    createContentApp: async (req, res) => {
        try {
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
    },

    createItemApp: async (req, res) => {
        try {
            let {
                key,
                content_en,
                content_vi,
                name_en,
                name_vi,
                img_intro,
                number_star,
                arr_language,
                arr_link
            } = req.body;

            if (!key) return res.status(400).json({ status: false, message: "key is required!" });
            if (!name_en) return res.status(400).json({ status: false, message: "name_en is required!" });
            if (!name_vi) return res.status(400).json({ status: false, message: "name_vi is required!" });
            if (!content_en) return res.status(400).json({ status: false, message: "content_en is required!" });
            if (!content_vi) return res.status(400).json({ status: false, message: "content_vi is required!" });
            if (!img_intro) return res.status(400).json({ status: false, message: "img_intro is required!" });

            let newItemApp = new ItemApp({
                key,
                content_en,
                content_vi,
                name_en,
                name_vi,
                img_intro,
                number_star,
                arr_language,
                arr_link
            });

            await newItemApp.save()
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

    getListApp: async (req, res) => {
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
                        number_star: 1,
                        arr_language: 1,
                        arr_link: 1,
                        content: `$${content}`, // Đổi tên field
                        name: `$${name}`, // Đổi tên field
                    },
                },
            ];
            const listApp = await ItemApp.aggregate(pipeline);

            return res.status(200).json({
                status: true,
                data: listApp,
            });
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            });
        };
    },

    createDetailItem: async (req, res) => {
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

            let newDetailApp = new DetailApp({
                key,
                content_en,
                content_vi,
                name_en,
                name_vi,
                img_intro,
                arr_feature
            });

            await newDetailApp.save()
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

    getDetailApp: async (req, res) => {
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
            const detailApp = await DetailApp.aggregate(pipeline);

            return res.status(200).json({
                status: true,
                data: detailApp,
            });
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            });
        };
    },
}

module.exports = AppController;