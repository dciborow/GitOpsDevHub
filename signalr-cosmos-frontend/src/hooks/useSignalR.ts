import { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

export function useSignalR(hubUrl) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => console.log('Connected to SignalR'))
      .catch(err => console.log('Error connecting to SignalR: ', err));

    connection.on('ReceiveMessage', (user, message) => {
      setMessages(prevMessages => [...prevMessages, `${user}: ${message}`]);
    });

    return () => {
      connection.stop();
    };
  }, [hubUrl]);

  return messages;
}
