import { ReactNode, createContext, useEffect, useState } from "react";

export const WebSocketContext = createContext<any>([false, '', ()=>{}]);

const URL_WEB_SOCKET = 'wss://stream.binance.com:9443/ws';

const request = {
  method: 'SUBSCRIBE',
  params: ['btcusdt@trade'],
  id: 1,
};

type Props = {
  children: ReactNode;
}


export const WebSocketContextProvider = ({ children }: Props) => {
  const [ws, setWs] = useState<WebSocket|null>(null);
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const wsClient = new WebSocket(URL_WEB_SOCKET);
    wsClient.onopen = () => {
      setWs(wsClient);
      wsClient.send(JSON.stringify(request));
    };
    wsClient.onclose = () => console.log('ws closed');
    return () => {
      wsClient.close();
    };
  }, []);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (evt) => {
        const trade = JSON.parse(evt.data);
        const newTrades = [...trades];
        addTradeToList(trade, newTrades);
      };
    }
  }, [ws, trades]);

  const addTradeToList = (trade: any, newTrades:any) => {
    if (newTrades.length >= 20) {
      newTrades.shift();
      newTrades.push(trade);
      setTrades(newTrades);
    } else {
      newTrades.push(trade);
      setTrades(newTrades);
    }
  };

  const contextValue = [trades, setTrades];

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
} 

