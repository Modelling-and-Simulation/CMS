import axios from "axios";
import { BACKEND_URL } from "../constants";

const API = axios.create({
  baseURL: `${BACKEND_URL}/api`,
});

// content
export const createContent = (data, setProgress) =>
  API.post("/contents", data, {
    onUploadProgress: ({ progress }) => setProgress(progress * 100),
  });
export const getAllContents = () => API.get("/contents");

// target
export const createTarget = (data, setProgress) =>
  API.post("/targets", data, {
    onUploadProgress: ({ progress }) => setProgress(progress * 100),
  });
export const getAllTargets = () => API.get("/targets");

// link
export const createLink = (data) => API.post("/links", data);
export const getLinkedTargetAndContent = (targetId) =>
  API.get(`/links/${targetId}`);
