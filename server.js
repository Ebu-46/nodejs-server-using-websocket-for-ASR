const SocketServer = require('websocket').server
const http = require('http')
let PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {})

server.listen(3000, ()=>{
    console.log("Listening on port 3000...")
})

wsServer = new SocketServer({httpServer:server})

const connections = []

wsServer.on('request', (req) => {
    const connection = req.accept()
    console.log('new connection')
    connections.push(connection)

    connection.on('message', (mes) => {
        connections.forEach(element => {
            if (element != connection)
                element.sendUTF(mes.utf8Data)
        })
    })

    connection.on('close', (resCode, des) => {
        console.log('connection closed')
        connections.splice(connections.indexOf(connection), 1)
    })

})

// const express = require('express');
// const app = express();


// app.use(express.json());



// app.get('/', (req,res) => {
//     res.send('Welcome to Daily Code Buffer in Heroku Auto Deployment!!');
// })

// const port = process.env.PORT || '5000';
// app.listen(port, () => console.log(`Server started on Port ${port}`));