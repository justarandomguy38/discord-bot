const request = require('request');
const { API, TagTypes, } = require('nhentai-api');
const api = new API();
const nh = 'https://nhentai.net/g/'
const DiscordJS = require('discord.js');
const { Intents } = require('discord.js');
const { json, links} = require('express/lib/response');
const prefix = 'doujin!'
const client = new DiscordJS.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"], partials: ["CHANNEL"] });
const { MessageActionRow, MessageButton } = require('discord.js');
const res = require('express/lib/response');


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    console.log('bot is online')
  })

  client.on('messageCreate', (message) => {
    var lowercasemessage = message.content.toLowerCase()
    if (!lowercasemessage.startsWith(prefix) || message.author.nodebot) return;
    var args = message.content.slice(prefix.length).trim().split(/ +/);
    var command = args.shift().toLowerCase();

    if (command === 'getcover') {
        var id = args[0]
        console.log(id)
        api.getBook(id).then(book => {
            var cover = api.getImageURL(book.cover);
            console.log(cover)
            var eee = typeof cover
            console.log(eee)
            const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('Read')
                    .setURL(nh + id + '/')
					.setStyle('LINK'),
			);
            message.reply({ files: [{
                attachment: cover,
                name: 'SPOILER_IMG.jpg'
            }], components: [row] });
        });
    }

    if (command === 'test') {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('1')
					.setLabel('Primary')
					.setStyle('PRIMARY'),
			);

		message.reply({ content: 'Pong!', components: [row] });
	}

    if (command === 'checkdoujin') {
        var id = args[0]
        console.log(id)
        var edit = message.reply('checking for doujin, this will take a while. if you think the bot is taking too long to respond try restarting the command')
        request({
            'url': nh + id,
            'method': "GET",
          },function (error, response, body) {
            if (!error && response.statusCode == 200) {
              if (response.statusCode === 200) {
                  console.log('found doujin')
                const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setURL(nh + id)
                        .setLabel('Read Here')
                        .setStyle('LINK'), 
                );
                message.reply({ content: 'found doujin', components: [row] })
              } else {
                console.log('request error / doujin doesnt exist')
              }
            }
          })
    }

    if (command === 'cover') {
        var id = args[0]
        console.log(id)
        request({
            'url': nh + id,
            'method': "GET"
          },function (error, response, body) {
            if (!error && response.statusCode == 200) {
              if (response.statusCode === 200) {
                var strin = JSON.stringify(body)
                var resilt = strin.includes("https://t7.nhentai.net/galleries/")
                console.log(resilt)
                const after_ = strin.substring(strin.indexOf('https://t7.nhentai.net/galleries/') + 0);
                var eeee = after_.split(' ')
                var ee = JSON.stringify(eeee[0])
                const after = ee.substring(ee.indexOf('https://t7.nhentai.net/galleries/') + 33);
                var e = after.replace("", "")
                var ccc = e.split('.')
                console.log(ccc[0])
                var cccc = ccc[0].split('/')
                console.log(ccc[1])
                var uraaa = 'https://t7.nhentai.net/galleries/'
                var answer = ccc[1].replace(/[^a-z]/gi, '');
                var idkk = '.'
                var final = uraaa + ccc[0] + idkk + answer
                message.reply({
                  files: [{
                    attachment: final,
                    name: 'SPOILER_IMG.jpg',
                  }]
                })
              } else {
                console.log(response.statusCode)
              }
            }
          })

    }

    if (command === 'test1') {
      var url = 'https://t.nhentai.net/galleries/635/cover.jpg'
      message.reply({
        attachment: url,
        name: 'SPOILER_IMG.jpg'
      })
    }

})

client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
	console.log(interaction);
});

client.login('OTUxMDM5NzYwODY3MTY0MTYw.YihqzA.aCnpYLQr3UPVWNuMqYIEi7y3eag')

process.on
(
    'uncaughtException',
    function (err)
    {
        console.log(err)
        var stack = err.stack;
        //you can also notify the err/stack to support via email or other APIs
    }
);
