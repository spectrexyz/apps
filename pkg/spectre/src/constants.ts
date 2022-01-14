export const NFT_FILE_TYPES = {
  image: {
    label: "JPG,PNG,SVG,WEBP",
    mediaTypes: [
      "image/avif",
      "image/gif",
      "image/jpeg",
      "image/jxl",
      "image/png",
      "image/svg+xml",
      "image/webp",
    ],
  },
  video: {
    label: "MP4,WEBM,GIF",
    mediaTypes: ["image/gif", "video/mp4", "video/webm", "video/ogg"],
  },
  audio: {
    label: "MP3,WAV,FLAC",
    mediaTypes: [
      "audio/flac",
      "audio/mp3",
      "audio/mpeg",
      "audio/ogg",
      "audio/wav",
      "audio/webm",
    ],
  },
}
