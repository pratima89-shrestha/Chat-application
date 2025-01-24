import React, { useEffect } from 'react';
import axios from 'axios';

const ChatPage = () => {
    const [chats, setChats] = useState(0)
    //first api call to render the data from frontend to backend
const fetchChats = async() =>{
    //get all the data 
    // const data = await axios.get('http://localhost:3001/api/chat');
    // console.log(data);

    //destructuring the data to get only the data
    const {data} = await axios.get('http://localhost:3001/api/chat');
    console.log(data);
}
//calling the function inside the useeffect
//useeffect---> is a hook which runs when the component is render/loads for the first time
//page refresh bachi yo run hunca
useEffect(()=>{
    fetchChats();
},[]);   //null dependency runs only one time

  return (
    <div>ChatPage</div>
  )
}

export default ChatPage;


//roadside coder
//tut5
//12:48