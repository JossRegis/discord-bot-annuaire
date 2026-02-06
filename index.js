const { Client, GatewayIntentBits } = require("discord.js");
const fournisseurHandler = require("./fournisseur");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log(`🚀 BOT CONNECTÉ : ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  try {
    await fournisseurHandler(message);
  } catch (err) {
    console.error("❌ Erreur handler :", err);
  }
});

// ⚠️ NE MET PAS LE TOKEN EN DUR ICI
client.login(process.env.DISCORD_TOKEN);

console.log("TOKEN PRESENT ?", !!process.env.DISCORD_TOKEN);
client.login(process.env.DISCORD_TOKEN);
