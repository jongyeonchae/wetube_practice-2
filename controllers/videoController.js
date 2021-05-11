import routes from "../routes";
import Video from "../models/Video";

// export const videos = (req, res) => res.render(`videos`, { pageTitle: `videos`, message: `videos!` });

export const getUpload = (req, res) => res.render(`upload`, { pageTitle: `upload` });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    title,
    description,
    fileUrl: path,
  });
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render(`videoDetail`, { pageTitle: video.title, video });
  } catch (err) {
    console.log(err);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render(`editVideo`, { pageTitle: `edit ${video.title}`, video });
  } catch (err) {
    console.log(err);
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    body: { title, description },
    params: { id },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (err) {
    console.log(err);
    res.redirect(routes.home);
  }
  // const video = await Video.findById(id);
  // const updateVideo = await Video.update({ id: video.id }, { title, description });
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Video.findOneAndRemove({ _id: id });
  } catch (err) {
    console.log(err);
  }
  res.redirect(routes.home);
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({ title: { $regex: searchingBy, $options: "i" } });
  } catch (err) {
    console.log(err);
  }
  res.render(`search`, { pageTitle: `Search`, searchingBy, videos });
};

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render(`home`, { pageTitle: `Home`, videos });
  } catch (err) {
    console.log(err);
    res.render(`home`, { pageTitle: `Home`, videos: [] });
  }
};
