const Menu = require('../../models/menu');
const Image = require('../../models/image');
const ItemApp = require('../../models/item_app');
const ListWebsite = require('../../models/list_website');

const CommonController = {
    createItemMenu: async (req, res) => {
        try {

            let { name_vi, name_en, key } = req.body;

            if (!key) return res.status(400).json({ status: false, message: "key is required!" });
            if (!name_vi) return res.status(400).json({ status: false, message: "name_vi is required!" });
            if (!name_en) return res.status(400).json({ status: false, message: "name_en is required!" });

            let newMenu = new Menu({
                key,
                name_vi,
                name_en,
            });

            await newMenu.save()
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

    getMenu: async (req, res) => {
        try {
            let { lang } = req.headers;

            if (!lang) {
                lang = "en";
            };

            let name = lang === "en" ? "name_en" : "name_vi";

            const pipeline = [
                {
                    $project: {
                        key: 1,
                        name: `$${name}`, // Đổi tên field
                    },
                },
            ];
            const menu = await Menu.aggregate(pipeline);

            return res.status(200).json({
                status: true,
                data: menu,
            });

        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            });
        };
    },

    saveUrlImage: async (req, res) => {
        try {
            let { name, url, key } = req.body;

            if (!key) return res.status(400).json({ status: false, message: "key is required!" });
            if (!url) return res.status(400).json({ status: false, message: "url is required!" });
            if (!name) return res.status(400).json({ status: false, message: "name is required!" });

            let newImage = new Image({
                key,
                url,
                name,
            });

            await newImage.save()
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

    getUrlImage: async (req, res) => {
        try {
            let { key } = req.query;

            const pipeline = [
                {
                    $match: {
                        key,
                    },
                },
            ];
            const listImage = await Image.aggregate(pipeline);

            return res.status(200).json({
                status: true,
                data: listImage,
            });

        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            });
        };
    },

    getListProducts: async (req, res) => {
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
                        content: `$${content}`, // Đổi tên field
                        name: `$${name}`, // Đổi tên field
                    },
                },
            ];
            const listApp = await ItemApp.aggregate(pipeline);
            const listWeb = await ListWebsite.aggregate(pipeline);

            for (let item of listApp) {
                item.type = 'app'
            }

            for (let item of listWeb) {
                item.type = 'website'
            }

            return res.status(200).json({
                status: true,
                data: [...listApp, ...listWeb],
            });
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message
            });
        };
    },
}

module.exports = CommonController;