const aiService = require("../services/ai.service")

const chatService = require("../services/chat.service");


module.exports.getReview = async (req, res) => {

    const code = req.body.code;

    if (!code) {
        return res.status(400).send("Prompt is required");
    }

    const response = await aiService(code);


    res.send(response);

}

module.exports.chatWithAI = async( req, res)=>{
    const {message, code} = req.body;

    if(!message){
        return res.status(400).send("message is required");
    }
    try{
        const response = await chatService(message, code);
        res.send(response);

    }
    catch(error){
        console.error("chat error:",error);
        res.status(500).send("error processing chat");
    }
};



