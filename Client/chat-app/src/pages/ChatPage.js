import React, { useEffect, useState} from 'react';
import axios from 'axios';

const ChatPage = () => {
  //store the data inside of the hooks called useState
const [chats, setChats] = useState([]); //chats variable and setChats used to change the value of the variable


    //first api call to render the data from frontend to backend
const fetchChats = async() =>{
    //get all the data 
    // const data = await axios.get('http://localhost:3001/api/chat');
    // console.log(data);

    //destructuring the data to get only the data
    const {data} = await axios.get('http://localhost:4001/api/chat');
    console.log(data);
    setChats(data); //all of the data is inside this variable
}
//calling the function inside the useeffect
//useeffect---> is a hook which runs when the component is render/loads for the first time
//page refresh bachi yo run hunca
useEffect(()=>{
    fetchChats();
},[]);   //null dependency runs only one time

  return (
    <div>
      {chats.map((chat)=>(     //to write the js inside the react we use {}
        <div>{chat.chatName}</div>
      ))}
    </div>
  )
}

export default ChatPage;
