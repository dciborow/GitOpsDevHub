import React from 'react';
import { useSignalR } from './hooks/useSignalR';
import { useApi } from './hooks/useApi';

const App: React.FC = () => {
  const messages = useSignalR('http://localhost:5000/recordHub');
  const { record, newRecord, setNewRecord, getRecord, setNewRecordToDb } = useApi('http://localhost:5000/api/record', { id: '1', partitionKey: 'default' });

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
