const ProjectController = {
    createInfoProject: async (req, res, next) => {
        try {
            return res.status(200).json({
                status: true,
                message: 'Success'
            })
        } catch (err) {
            next(err);
        };
    },
};

module.exports = ProjectController;