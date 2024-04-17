import { useEffect } from 'react';
import './App.css';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://127.0.0.1:8000');

function App() {
  const onButtonClicked = (value: string) => {
    client.send(JSON.stringify({
      type: 'message',
      msd: value
    }))
  };

  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message: any) => {
      const data = JSON.parse(message.data);
      console.log('reply: ' + data.msd);
    };
  }, []);

  return (
    <div className="App">
      <button onClick={() => onButtonClicked('Hello World')}>Click me</button>
    </div>
  );
}

export default App;
