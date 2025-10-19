export default async function handler(req, res) {
  try {
    const response = await fetch("https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink&access_token=" + process.env.INSTAGRAM_TOKEN);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching Instagram feed:", error);
    res.status(500).json({ error: "Failed to fetch Instagram data" });
  }
}
