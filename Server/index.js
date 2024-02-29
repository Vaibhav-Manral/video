const {Server}=require("socket.io");

const io= new Server(8900,{ //cors allow true
    cors:true,
});


const emailToSocketIdMap=new Map();
const socketIdToEmailMap=new Map();

io.on("connection",(socket)=>{
    console.log('socket connected',socket.id);
    socket.on('room:join',(data)=>{
        const {email,room}=data;
        // console.log(email,room);
        emailToSocketIdMap.set(email,socket.id);
        socketIdToEmailMap.set(socket.id,email);
        io.to(socket.id).emit('room:join',data);
    })
});