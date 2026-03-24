import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const API =
    "https://opensheet.elk.sh/1x_0zMwQAXAc-FAE1kcbU9uB1AR0fkwE9T4huB74lEfw/Sheet1?raw=true";

  const fetchData = async () => {
    const res = await fetch(API);
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000); // update tiap 5 detik

    return () => clearInterval(interval);
  }, []);

  const filtered = data.filter((item) =>
    item.item?.toLowerCase().includes(search.toLowerCase())
  );

  const totalQty = filtered.reduce(
    (sum, item) => sum + Number(item.qty || 0),
    0
  );

  return (
    <div className={styles.container}>
      <h1>📦 Data Barang</h1>

      <input
        type="text"
        placeholder="Cari barang..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.search}
      />

      <h3>Total Qty: {totalQty}</h3>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>No</th>
            <th>Item</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((row, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{row.item}</td>
              <td>{row.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}