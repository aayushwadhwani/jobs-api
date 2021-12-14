const getAllJobs = async(req,res,next) => {
    res.send('Get All jobs');
}

const getJob = async(req,res,next) => {
    res.send('Get single jobs');
}

const addJob = async(req,res,next) => {
    res.send('Add A Job');
}

const updateJob = async(req,res,next) => {
    res.send('Update A Job');
}

const deleteJob = async(req,res,next) => {
    res.send('Delete A job');
}

module.exports = {
    getAllJobs,
    getJob,
    addJob,
    updateJob,
    deleteJob
};