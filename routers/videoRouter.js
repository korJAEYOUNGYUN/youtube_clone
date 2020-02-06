import express from 'express';
import routes from "../routes";
import {
    deleteVideo,
    getEditVideo,
    getUpload,
    postEditVideo,
    postUpload,
    videoDetail
} from "../controllers/videoController";
import {onlyPrivate, uploadVideo} from "../middlewares";


const videoRouter = express.Router();

videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

videoRouter.get(routes.videoDetail(), videoDetail);

export default  videoRouter;
