const readline = require("readline");
const fetch = require("node-fetch");
const colors = require("colors");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(colors.red("please enter your webhook URL:"));

rl.question("", async (webhookUrl) => {
    if (!isValidWebhook(webhookUrl)) {
        console.log(colors.red("try again invalid webhook url"));
        process.exit(1);
    }

    console.log(colors.blue(`████████████████████████████████████████████████████▀█`));
    console.log(colors.blue(`█▄─█▀▀▀█─▄███▀▄─███▄─▄▄─██▄─█─▄██─▄▄─██▄─▀█▄─▄██─▄▄▄▄█`));
    console.log(colors.blue(`██─█─█─█─████─▀─████─▄▄▄███─▄▀███─██─███─█▄▀─███─██▄─█`));
    console.log(colors.blue(`▀▀▄▄▄▀▄▄▄▀▀▀▄▄▀▄▄▀▀▄▄▄▀▀▀▀▄▄▀▄▄▀▀▄▄▄▄▀▀▄▄▄▀▀▄▄▀▀▄▄▄▄▄▀`));

    console.log(colors.magenta("made by fwcrimson."));
    console.log(colors.cyan("1. start - start with webhooks msg"));

    rl.question("", (option) => {
        if (option === "1") {
            console.log(colors.magenta("enter your message:"));
            rl.question("", (message) => {
                console.log(colors.magenta("enter your webhook name:"));
                rl.question("", (webhookName) => {
                    console.log(colors.magenta("how many messages should be sent:"));
                    rl.question("", (amount) => {
                        amount = parseInt(amount);
                        if (isNaN(amount) || amount <= 0) {
                            console.log(colors.red("Invalid amount. Exiting."));
                            process.exit(1);
                        }

                        console.log(colors.green("starting webhook msg"));
                        sendMessages(webhookUrl, message, webhookName, amount);
                    });
                });
            });
        } else {
            console.log(colors.red("Invalid option. Exiting."));
            process.exit(1);
        }
    });
});

function isValidWebhook(url) {
    return /^https:\/\/discord\.com\/api\/webhooks\/\d+\/[\w-]+$/.test(url);
}

async function sendMessages(webhookUrl, message, webhookName, amount) {
    for (let i = 0; i < amount; i++) {
        await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: webhookName, content: message })
        });
        await new Promise(r => setTimeout(r, 200));
    }
    console.log(colors.green("Messages sent successfully!"));
    process.exit(0);
}
