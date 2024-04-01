import React from "react";
import { formatTime } from "../helpers/formatTime";

const SignalTable = ({ signals }) => {
  return (
    <div className="signal-table-container">
      <h3>Signals</h3>
      <div className="signal-table-wrapper">
        <table className="signal-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Time</th>
              <th>Price</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {signals.map((signal, index) => (
              <tr key={index}>
                <td>{signal.type}</td>
                <td>{formatTime(signal.x)}</td>
                <td>{signal.y.toFixed(2)}</td>
                <td>{signal.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SignalTable;
