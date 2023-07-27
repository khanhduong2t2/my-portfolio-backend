const Content = require('../../models/content');

const AppController = {
    createContentApp: async (req, res) => {
        try {
            console.log('Call API createContentApp')
            let { content_en, content_vi, key, name } = req.body;

            if (!key) return res.status(400).json({ status: false, message: "key is required!" });
            if (!name) return res.status(400).json({ status: false, message: "name is required!" });
            if (!content_en) return res.status(400).json({ status: false, message: "content_en is required!" });
            if (!content_vi) return res.status(400).json({ status: false, message: "content_vi is required!" });

            let newContent = new Content({
                content_en,
                content_vi,
                key,
                name
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
    }
}

module.exports = AppController;