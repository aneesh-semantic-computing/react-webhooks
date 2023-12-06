import './Table.css';

function financial(x: string) {
  return Number.parseFloat(x).toFixed(2);
}
const numberToDate = (numberTime:number): string => {
  const date = new Date(numberTime * 1000);
  return date.toTimeString();
};

type Props = {
  trades : {
    a: string;
    b: string;
    p: string;
    q: string;
    t: string;
    T: number;
  }[]
}

const Table = ({ trades } : Props) => {
  const renderTrades = () => {
    if (!trades || !trades.length || !trades[0]) return 'Loading...';
    return trades.map((trade, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{trade && trade.t}</td>
        <td>${trade && financial(trade.p)}</td>
        <td>{trade && trade.q}</td>
        <td>{trade && trade.b}</td>
        <td>{trade && trade.a}</td>
        <td>{trade && numberToDate(trade.T)}</td>
      </tr>
    ));
  };

  return (
    <div className="content__table">
      <table>
        <tr>
          <th>STT</th>
          <th>Trade ID</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Buyer ID</th>
          <th>Seller ID</th>
          <th>Trade time</th>
        </tr>
        {renderTrades()}
      </table>
    </div>
  );
};
export default Table;
