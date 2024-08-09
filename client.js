const {Kafka} = require('kafkajs')
exports.Kafka=new Kafka({
    clientId:'My-Kafka-App',
    brokers:['<your_id_address>:9092']
})