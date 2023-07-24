const InfoIntro = require('../../models/info_intro');

const IntroController = {
    createInfoIntro: async (req, res) => {
        try {

            let { name, key, content_vi, content_en } = req.body;

            if (!name) return res.status(400).json({ status: false, message: "name is required!" });
            if (!content_vi) return res.status(400).json({ status: false, message: "content_vi is required!" });
            if (!content_en) return res.status(400).json({ status: false, message: "content_en is required!" });

            let newInfoIntro = new InfoIntro({
                name: name,
                key: key,
                content_vi: content_vi,
                content_en: content_en,
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
    }
}

module.exports = IntroController