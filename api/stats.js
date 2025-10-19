export default async function handler(req, res) {
  try {
    const GUILD_ID = "307335012703797249";

    const response = await fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}?with_counts=true`, {
      headers: {
        "Authorization": `Bot ${process.env.DISCORD_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`Discord API error: ${response.status}`);
    }

    const data = await response.json();

    res.status(200).json({
      name: data.name,
      icon: `https://cdn.discordapp.com/icons/${data.id}/${data.icon}.png`,
      total: data.approximate_member_count,
      online: data.approximate_presence_count
    });
  } catch (error) {
    console.error("Error fetching Discord data:", error);
    res.status(500).json({ error: "Failed to fetch Discord stats" });
  }
}
