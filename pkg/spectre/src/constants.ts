export const NFT_FILE_TYPES = {
  image: {
    label: "JPG,PNG,GIF,SVG",
    accept: {
      "image/*": [
        ".avif",
        ".gif",
        ".jpeg",
        ".jpg",
        ".jxl",
        ".png",
        ".svg",
        ".webp",
      ],
    },
  },
  video: {
    label: "MP4,WEBM,OGV",
    accept: {
      "video/*": [".mp4", ".ogv", ".webm"],
    },
  },
  audio: {
    label: "MP3,WAV,FLAC",
    accept: {
      "audio/*": [
        ".flac",
        ".mp3",
        ".ogg",
        ".wav",
      ],
    },
  },
}
