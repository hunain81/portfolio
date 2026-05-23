/*
 * Profile photo module.
 *
 * The real photo is hosted on Vercel Blob (a public file URL) — it is NOT
 * stored as image data inside this repository. Only the link below lives
 * in the code, which is harmless.
 *
 * For local development you may optionally create  src/photoData.local.js :
 *     const photo = "data:image/jpeg;base64,..."  // or any image URL
 *     export default photo
 * That file is git-ignored. If it exists it overrides the URL below;
 * otherwise the Vercel Blob URL is used.
 */

// Photo hosted on Vercel Blob (public).
const remotePhoto = 'https://yxuirnu6766lcyir.public.blob.vercel-storage.com/photo'

// Use the local override if present, otherwise the hosted photo.
let photo = remotePhoto
const localModules = import.meta.glob('./photoData.local.js', { eager: true })
const localKey = Object.keys(localModules)[0]
if (localKey && localModules[localKey] && localModules[localKey].default) {
  photo = localModules[localKey].default
}

export default photo
