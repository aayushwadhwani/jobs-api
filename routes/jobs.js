const express = require('express');
const { getJob,getAllJobs,deleteJob, updateJob, addJob } = require('../controllers/jobs');

const router = express.Router();

router.route('/').post(addJob).get(getAllJobs);
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;