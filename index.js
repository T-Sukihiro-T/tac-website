const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("TacBot API is running! Go to /stats for JSON data.");
});

app.get("/stats", async (req, res) => {
  const guild = await client.guilds.fetch("307335012703797249");
  await guild.members.fetch();

  const totalMembers = guild.memberCount;
  const onlineMembers = guild.members.cache.filter(
    (member) => member.presence?.status === "online",
  ).size;
  const serverPicture = guild.iconURL({ dynamic: true, size: 1024 });

  res.json({
    total: totalMembers,
    online: onlineMembers,
    icon: serverPicture,
    name: guild.name,
  });
});

app.listen(PORT, "0.0.0.0", () => console.log(`API running on port ${PORT}`));

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

const TOKEN = process.env.TOKEN;

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.content === "!stats") {
    const guild = message.guild;
    await guild.members.fetch();
    const totalMembers = guild.memberCount;
    const onlineMembers = guild.members.cache.filter(
      (member) => member.presence?.status === "online",
    ).size;

    message.channel.send(
      `👥 Total members: ${totalMembers}\n🟢 Online members: ${onlineMembers}`,
    );
  }
});

client.login(TOKEN);

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

app.get("/instagram-feed", async (req, res) => {
  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type,timestamp,username&access_token=${INSTAGRAM_ACCESS_TOKEN}`,
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching Instagram data:", error);
    res.status(500).json({ error: "Failed to fetch Instagram data." });
  }
});
