const { Client, GatewayIntentBits } = require("discord.js");
const fournisseurHandler = require("./fournisseur");
const express = require("express");

const app = express();

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

// Serveur web obligatoire pour Render Free
app.get("/", (req, res) => {
  res.send("Bot Annuaire is running!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Web server running");
});

console.log("TOKEN PRESENT ?", !!process.env.DISCORD_TOKEN);

client.login(process.env.DISCORD_TOKEN);
