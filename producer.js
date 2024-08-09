const {Kafka} = require('./client.js')
const readline = require("readline")

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

async function init(params) {
    const producer = Kafka.producer()
    await producer.connect()
    console.log("Producer connected successfully")

    rl.setPrompt("> ")
    rl.prompt()

    rl.on("line", async function (line) {
        const [ridername,location] = line.split(" ")
        await producer.send({
            topic:"rider-updates",
            messages:[
                {
                    partition:location.toLocaleLowerCase()==="north"?0:1,
                    key:'location-update',
                    value:JSON.stringify({name:ridername,location:location})
                }
            ]
        })
    }).on('close',async function() {
        await producer.disconnect()
    })
}
init()