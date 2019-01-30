<template>
    <div class="container">
        <div class="show-box">
            <div v-for="(item, index) in msglist" :key="index" :class="item.cName">
                <span>{{ item.user }}: </span>
                <span :class="item.colorClass">{{ item.msg }}</span>
            </div>
        </div>

        <el-row class="input-box">
            <el-input v-model="input" class="input" placeholder="请输入内容"></el-input>
            <el-button type="primary" @click="send">发送</el-button>
        </el-row>
    </div>
</template>

<script>
export default {
  data() {
    return {
        textarea: '',
        input: "",
        socket: "",
        msglist: [
            {
                cName:"show-right",
                colorClass:"show-blue",
                msg:"hello my name is user1",
                user:"user1"
            },
            {
                cName:"show-left",
                colorClass:"show-red",
                msg:"hi i am user 2",
                user:"user2"
            }
        ]
    }
  },
  mounted() {
    let socket = io.connect() //io.connect("http://localhost:4000/")

    socket.on("receiveMsg", (data) => {
        let item={
            user: data.user,
            msg: data.msg,
            cName: "show-left",
            colorClass: "show-blue"
        }
        //给服务端发送 sendMsg事件名的消息
        this.msglist.push(item)
    });

    console.log("socket = ", socket)
    this.socket = socket
  },
  methods: {
      send() {
        let data={
            user: "user1",
            msg: this.input,
            cName: "show-right",
            colorClass: "show-red"
        }
        //给服务端发送 sendMsg事件名的消息
        this.socket.emit("sendMsg",data);
        this.msglist.push(data)
        this.input="";
      }
  }
}
</script>

<style lang="scss" scoped>
    .container {
        text-align: center;
    }
    .input-box {
        margin-top: 100px;
    }
    .input {
        width: 300px;
    }
    .show-box {
        width: 98%;
        margin-top: 100px;
        box-sizing: border-box;
        border:1px solid #ccc;
        border-radius: 4px;
        padding: 8px 10px;
    }
    .show-right {
        margin-left: 4px;
        margin-bottom: 4px;
        text-align: right;
    }
    .show-left {
        margin-left: 4px;
        margin-bottom: 4px;
        text-align: left;
    }
    .show-blue {
        margin-left: 4px;
        color: blue;
    }
    .show-red {
        margin-left: 4px;
        color: red;
    }     
</style>
