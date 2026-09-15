export function getYouTubeThumbnail(videoUrl) {
  if (!videoUrl) return "";

  let videoId = "";

  try {
    if (videoUrl.includes("youtube.com/embed/")) {
      videoId = videoUrl.split("youtube.com/embed/")[1]?.split(/[?&]/)[0];
    } else if (videoUrl.includes("youtu.be/")) {
      videoId = videoUrl.split("youtu.be/")[1]?.split(/[?&]/)[0];
    } else if (videoUrl.includes("youtube.com/watch")) {
      const url = new URL(videoUrl);
      videoId = url.searchParams.get("v");
    }
  } catch {
    return "";
  }

  return videoId
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : "";
}

export function getYouTubeEmbedUrl(videoUrl) {
  if (!videoUrl) return "";
  const trimmed = videoUrl.trim();
  try {
    if (trimmed.includes("youtube.com/embed/")) {
      return trimmed;
    }
    if (trimmed.includes("youtu.be/")) {
      const videoId = trimmed.split("youtu.be/")[1]?.split(/[?&]/)[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : trimmed;
    }
    if (trimmed.includes("youtube.com/watch")) {
      const url = new URL(trimmed);
      const videoId = url.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : trimmed;
    }
  } catch {
    return trimmed;
  }
  return trimmed;
}

export const SV_COURSES = [
  "Semua Mata Kuliah",
  "RANGKAIAN LOGIKA DAN TEKNIK DIGITAL",
  "TEKNOLOGI BENGKEL ELEKTROMEKANIK",
  "APLIKASI MOBILE",
  "SISTEM TERTANAM (EMBEDDED SYSTEM)",
  "PROYEK SISTEM IOT (INTERNET OF THINGS)"
];
