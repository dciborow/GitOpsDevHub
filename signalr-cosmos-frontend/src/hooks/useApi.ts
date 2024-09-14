import { useState } from 'react';
import axios from 'axios';

export function useApi(url, params) {
  const [record, setRecord] = useState(null);
  const [newRecord, setNewRecord] = useState('');

  const getRecord = async () => {
    const response = await axios.get(url, { params });
    setRecord(response.data);
  };

  const setNewRecordToDb = async () => {
    await axios.post(url, { data: newRecord }, { params });
    setNewRecord('');
  };

  return { record, newRecord, setNewRecord, getRecord, setNewRecordToDb };
}
