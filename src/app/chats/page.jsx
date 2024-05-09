'use client'
import React, { useEffect, useState,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import socket from '@/components/socket';
import MessageBox from '@/components/MessageBox';





function page() {
  const { isAuth, user } = useSelector(store => store.userReducer);
  useEffect(() => {
    console.log(user)
    socket.emit("new-member", { name: user.name, category: user.category, socketId: socket.id, role: user.role })


  }, [])

  const [message, setmessage] = useState("")
  const [msginfo, setmsginfo] = useState({})
  const [messages, setMessages] = useState([])
  const [currentCustomer, setcurrentCustomer] = useState("")
  const [recording, setRecording] = useState(false);
  const audioBlob=useRef()
  const mediaRecorder=useRef();
  const [typingAnimation, settypingAnimation] = useState(false)
  const [imageSrc, setImageSrc] = useState(null);

  const audioRef = useRef(null);

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
        setmsginfo(prevMsgInfo => {
          const updatedMsgInfo = { ...prevMsgInfo };
          updatedMsgInfo[currentCustomer] = {
            ...updatedMsgInfo[currentCustomer],
            messages: [...updatedMsgInfo[currentCustomer].messages, { msg: audioBlob.current, status: "outgoing",msgType:"audio"}]
          };
          return updatedMsgInfo;
        });
    
     
     } // 5 seconds recording time, you can adjust as needed
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  
  const handleNewCustomer = (data) => {
    console.log("new customer came ", data);

    // Update state immutably
    setmsginfo(prevMsgInfo => {
      return {
        ...prevMsgInfo,
        [data.socketId]: { customerIndex: data.customerIndex, messages: [] }
      };
    });

    console.log(Object.entries(msginfo));
  }
  useEffect(() => {
    socket.on("recieve-msg", handleReceiveMessage)
    socket.on("new-customer", handleNewCustomer)
    return () => {
      socket.off("recieve-msg", handleReceiveMessage)
      socket.off("new-customer", handleNewCustomer)

    }
  }, [socket])
  const handleCustomerClick = (e) => {
    const key = e.target.getAttribute('data-key');
    setcurrentCustomer(key)
    console.log("current customer key is ", key)
  }
  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(msginfo, "asdsad")
    // Emit message to the server
    if(imageSrc){
      socket.emit("send-msg", {
        message,
        socketId: socket.id,
        category: user.category,
        role: "employee",
        customerSocket: currentCustomer,
        msgType:"img",
        imageData:imageSrc,

      });
      setmsginfo(prevMsgInfo => {
        const updatedMsgInfo = { ...prevMsgInfo };
        updatedMsgInfo[currentCustomer] = {
          ...updatedMsgInfo[currentCustomer],
          messages: [...updatedMsgInfo[currentCustomer].messages, { msg: message, status: "outgoing",msgType:"img",imageData:imageSrc }]
        };
        return updatedMsgInfo;
      });
    }
    else{
    socket.emit("send-msg", {
      message,
      socketId: socket.id,
      category: user.category,
      role: "employee",
      customerSocket: currentCustomer
    });

    // Update messages state immutably
    setMessages(prevMessages => [...prevMessages, { msg: message, status: "outgoing" }]);

    // Update msginfo state immutably
    setmsginfo(prevMsgInfo => {
      const updatedMsgInfo = { ...prevMsgInfo };
      updatedMsgInfo[currentCustomer] = {
        ...updatedMsgInfo[currentCustomer],
        messages: [...updatedMsgInfo[currentCustomer].messages, { msg: message, status: "outgoing" }]
      };
      return updatedMsgInfo;
    });
  }
    // Clear message input
    setmessage("");
    setImageSrc(null)
  };
  const handleReceiveMessage = (data) => {
  
    setmsginfo(prevMsgInfo => {
      const updatedMsgInfo = { ...prevMsgInfo };
      if (data.msgType== "audio"&& data.message) {
        console.log("there is audio we recive ", data.message)
        const audioBlob = new Blob([data.message], { type: 'audio/webm' });
  
        const audioURL = URL.createObjectURL(audioBlob);
        updatedMsgInfo[data.socketId].messages.push({ msg: audioURL, status: "incoming",imageData:data.imageData,msgType:data.msgType });
  
      }
      else{
       updatedMsgInfo[data.socketId].messages.push({ msg: data.message, status: "incoming",imageData:data.imageData,msgType:data.msgType });
      }
     
      return updatedMsgInfo; 
    });


  };
  return (
    <div className='m-5  center'>
      <div class="h-full w-full mx-auto shadow-lg rounded-lg ">

        <div class="px-5 py-5 flex justify-between items-center  bg-white border-b-2">
          <div class="font-semibold text-2xl">GoingChat</div>
          <div class="w-1/2">
            <input
              type="text"
              name=""
              id=""
              placeholder="search IRL"
              class="rounded-2xl bg-gray-100 py-3 px-5 w-full"
            />
          </div>
          
          <div
            class="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center"
          >
            RA
          </div>
        </div>

        <div class="flex flex-row justify-between bg-white">
          {/* side bar here */}
          <div class="flex flex-col w-2/5 h-[80vh] border-r-2 overflow-y-auto">

            <div class="border-b-2 py-4 px-2">
              <input
                type="text"
                placeholder="search chatting"
                class="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
              />
            </div>
            {/* card start */}
            {
              Object.entries(msginfo).map(([key, value]) => {
                console.log("in msg info", key)
                return <div
                  data-key={key} onClick={handleCustomerClick}
                  class="flex flex-row py-4 px-2 justify-center items-center border-b-2"
                >
                  <div class="w-1/4" data-key={key}>
                    <img
                      src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                      class="object-cover h-12 w-12 rounded-full"
                      alt=""
                      data-key={key}
                    />
                  </div>
                  <div class="w-full" data-key={key}>
                    <div class="text-lg font-semibold" data-key={key}>{`customer ${value.customerIndex + 1}`}</div>
                    {/* <span class="text-gray-500">Pick me at 9:00 Am</span> */}
                  </div>


                </div>

              })
            }


            {/* card end */}





          </div>


       
          <div className='w-full'>
          {
            msginfo[currentCustomer] && <MessageBox messages={msginfo[currentCustomer].messages} setMessages={setmsginfo} typingAnimation={typingAnimation}  message={message} setmessage={setmessage} handleSendMessage={handleSendMessage} startRecording={startRecording} imageSrc={imageSrc} setImageSrc={setImageSrc}/>
          }
     
          </div>
        


          
             
           


        </div>
      </div>
    </div>

  )
}

export default page