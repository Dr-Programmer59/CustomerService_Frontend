'use client'
import socket from '@/components/socket'
import React, { useEffect, useState, useRef } from 'react'
import { IoSend } from "react-icons/io5";
import axios from 'axios';
import MessageBox from '@/components/MessageBox';

function page() {
  const questions = ["Hi, I am bot assitant. Hope u have a lovely day Today.", "What's your name sir?(just type name)", "Thanks, Can i know your phone number too?"]
  const [categories, setcategories] = useState([])
  const [messages, setMessages] = useState([])
  const [message, setmessage] = useState("")
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setmediaRecorder] = useState(null);
  const [startBot, setstartBot] = useState(true)
  const [currentBotMsg, setcurrentBotMsg] = useState("")
  const [typingAnimation, settypingAnimation] = useState(false)
  const [loadingHide, setLoadingHide] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  const [customerDetails, setCustomerDetails] = useState({
    "name":"unknwon",
    "phone":"0000"
  })
  
  

  const [questionindex, setquestionindex] = useState(0);
  const [answers, setanswers] = useState("")
  const audioRef = useRef(null);
  

  useEffect(() => {
    const startBotChatting = async () => {
      await setTypeAnimationAndSendMessage(questions[0], 0, 2000);
      await setTypeAnimationAndSendMessage(questions[1], 1, 2000);


    };

    startBotChatting();
  }, []);

  const setTypeAnimationAndSendMessage = async (message, index, delay) => {
    setquestionindex(index)
    settypingAnimation(true);
    await wait(delay);
    settypingAnimation(false);


    setMessages((prev) => [...prev, { msg: message, status: "incoming" }]);

    await wait(delay);
  };

  useEffect(() => {
    
    if(messages.length == 5){
      setMessages((prev) => [...prev, { msg: "options", status: "options" }]);
    }
  },[messages])

  const sendQuestions = async (questions) => {
    for (const question of questions) {
      await setTypeAnimationAndSendMessage(question,0, 2000);
    }
  };

  const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));


  const startRecording = async () => {
    try {
      if(recording==false){
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current=new MediaRecorder(stream);
      
      const chunks = [];

      mediaRecorder.current.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        audioBlob.current=blob;
      };

      mediaRecorder.current.start();
      setRecording(true);
    }
    else if(recording==true){
      
      mediaRecorder.current.stop();
        setRecording(false);
        socket.emit("send-msg", {
          message:audioBlob.current,
          socketId: socket.id,
          category: user.category,
          role: "employee",
          customerSocket: currentCustomer,
          msgType:"audio"
        });
        setRecording(false)
        setMessages((prev) => [...prev, { msg: audioBlob.current, status: "outgoing",msgType:"audio" }])
    
     
     } // 5 seconds recording time, you can adjust as needed
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };


 




  



  const handleReceiveMessage = (data) => {


    if (data.msgType== "audio"&& data.message) {
      console.log("there is audio we recive ", data.message)
      const audioBlob = new Blob([data.message], { type: 'audio/webm' });

      const audioURL = URL.createObjectURL(audioBlob);
      setMessages((prev) => [...prev, { msg: audioURL, status: "incoming", msgType: "audio" }])

    }
    else if(data.msgType=="img"){
      setMessages((prev) => [...prev, { msg: data.message, status: "incoming", msgType:"img",imageData:data.imageData }])
    }
    else{
      setMessages((prev) => [...prev, { msg: data.message, status: "incoming", msgType: "audio",msgType:"msg"}])

    }

  }
  useEffect(() => {
    socket.on("recieve-msg", handleReceiveMessage)

    return () => {
      socket.off("recieve-msg", handleReceiveMessage)

    }
  }, [socket])
  const handleSendMessage = async (e) => {
    if (startBot) {
      if (questions.length <= questionindex) {
        setstartBot(false)
        return
      }
      
      setanswers((prev) => [...prev, message]);
      setMessages((prev) => [...prev, { msg: message, status: "outgoing" }])
      setmessage("")

      await setTypeAnimationAndSendMessage(questions[questionindex + 1], questionindex + 1, 2000);
    }
    else {
      e.preventDefault();
      if(imageSrc){
      socket.emit("send-msg", { message, socketId: socket.id, role: "customer",msgType:"img",imageData:imageSrc })
      setMessages((prev) => [...prev, { msg: message, status: "outgoing",msgType:"img",imageData:imageSrc }])

      }
      else{
        socket.emit("send-msg", { message, socketId: socket.id, role: "customer",msgType:"msg" })
        setMessages((prev) => [...prev, { msg: message, status: "outgoing",msgType:"msg" }])

      }
      setmessage("")
      setImageSrc(null)
    }
  }


  useEffect(() => {
    setTimeout(() => {
      setLoadingHide(true)
    }, 3000);
  },[])

  
  return (
    // this is thediv
    <>
    {
      !loadingHide && 
      <div className='h-screen w-full bg-gradient absolute z-10 flex flex-col justify-center items-center gap-5'>
        <h2 className='text-white/80 text-3xl'>Hello I am Sundarbhai</h2>
        <img src='Images/bot.png' className='w-16 h-16 rounded-full'/>
        <h2 className='text-white/80 text-2xl'>How can i help you ?</h2>
        <button className='py-2 px-4 rounded-3xl bg-white text-[#330867]' onClick={() => setLoadingHide(true)}>Chat Now !</button>
      </div>
    }
      
      <div className='gradint p-3 rounded-t-md flex justify-between items-center shadow-md shadow-[#330867]'>
        <div className='flex gap-2 items-center'>
          <img src='Images/bot.png' className='w-16 h-16 rounded-full'/>
          <div className=''>
            <h1 className='text-white text-2xl'>Sundarbhai</h1>
            <p className='text-white/80'>we are online</p>
          </div>
        </div>
      </div>
      <div class="  shadow-lg  bg-white p-4">
  
  
        <MessageBox messages={messages}  typingAnimation={typingAnimation} setMessages={setMessages}  message={message} setmessage={setmessage} handleSendMessage={handleSendMessage} audioBlob={audioBlob}  startRecording={startRecording} sendQuestions={sendQuestions} socket={socket} answers={answers} imageSrc={imageSrc} setImageSrc={setImageSrc} startBot={startBot} setstartBot={setstartBot} />
        
  
      </div>
    </>






  )
}

export default page