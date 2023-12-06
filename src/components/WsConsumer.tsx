import { useContext } from "react";
import { WebSocketContext } from "../contexts/WebSocketProvider";
import Table from "./Table";
import Chart from "./Chart";

export const WsConsumer = () => {
  const [trades] = useContext(WebSocketContext);

  return (
    <div>
      <Table trades={trades} />
      <Chart trades={trades} />
    </div>
  );
};