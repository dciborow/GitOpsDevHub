import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [record, setRecord] = useState(null);
  const [newRecord, setNewRecord] = useState('');

  useEffect(() => {
    // Create SignalR connection
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/recordHub') // Your SignalR hub endpoint
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => console.log('Connected to SignalR'))
      .catch(err => {
        console.error('Error connecting to SignalR:', err);
        setTimeout(() => {
          console.log('Attempting to reconnect...');
          connection.start()
            .catch(reconnectErr => console.error('Reconnection failed:', reconnectErr));
        }, 5000);
      });

    // Receive messages from SignalR hub
    connection.on('ReceiveMessage', (user, message) => {
      setMessages(prevMessages => [...prevMessages, `${user}: ${message}`]);
    });

    return () => {
      connection.stop();
    };
  }, []);

  const getRecord = async () => {
    const response = await axios.get('http://localhost:5000/api/record/1', {
      params: { partitionKey: 'default' }
    });
    setRecord(response.data);
  };

  const setNewRecordToDb = async () => {
    await axios.post('http://localhost:5000/api/record', { data: newRecord }, {
      params: { id: '1', partitionKey: 'default' }
    });
    setNewRecord('');
  };

  return (
    <div className="App">
      <h1>SignalR and CosmosDB Demo</h1>

      <div>
        <h2>Record</h2>
        <button onClick={getRecord}>Get Record</button>
        <pre>{JSON.stringify(record, null, 2)}</pre>
      </div>

      <div>
        <h2>Update Record</h2>
        <input value={newRecord} onChange={e => setNewRecord(e.target.value)} />
        <button onClick={setNewRecordToDb}>Update</button>
      </div>

      <div>
        <h2>Messages</h2>
        {messages.map((msg, idx) => <p key={idx}>{msg}</p>)}
      </div>
    </div>
  );
}

export default App;
