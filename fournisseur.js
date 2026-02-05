const fetch = require("node-fetch");

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzd-W_UmUSnURzP3AGTjh0CJPqKFlZWWJ6QIWYcffOSXjWFPuALR8K4F5cv5O0WbDJnhQ/exec";

module.exports = async function fournisseurHandler(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith("!fournisseur")) return;

  const lines = message.content.split("\n");
  const data = {};

  for (const line of lines) {
    const lower = line.toLowerCase();

    if (lower.startsWith("entreprise")) {
      data.entreprise = line.split(":")[1]?.trim();
    }
    if (lower.startsWith("contact")) {
      data.contact = line.split(":")[1]?.trim();
    }
    if (lower.startsWith("telephone") || lower.startsWith("téléphone")) {
      data.telephone = line.split(":")[1]?.trim();
    }
  }

  if (!data.entreprise || !data.telephone) {
    await message.reply("❌ Entreprise et téléphone obligatoires");
    return;
  }

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    await res.text();
    await message.reply("✅ Fournisseur ajouté dans Google Sheets");
  } catch (err) {
    console.error(err);
    await message.reply("❌ Erreur lors de l’envoi");
  }
};
