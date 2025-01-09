import React, { useState, useEffect } from 'react';
import { useDataContext } from './DataContext'; 
import './PayoutDetails.css'; 
import { jsPDF } from 'jspdf'; 
import "jspdf-autotable"; 
import * as XLSX from 'xlsx'; 

const PayoutDetails = () => {
  const { articles, setArticles } = useDataContext(); 
  const [data, setData] = useState(articles);

  useEffect(() => {
    const storedData = localStorage.getItem('payoutData');
    if (storedData) {
      setData(JSON.parse(storedData)); 
    }
  }, []);

  const handlePayoutChange = (index, value) => {
    const newData = [...data];
    newData[index].payoutRate = value;
    newData[index].payout = value * 10; 

    setData(newData);
    setArticles(newData); 

    localStorage.setItem('payoutData', JSON.stringify(newData));
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const headers = ['Author', 'Article', 'Payout Rate', 'Calculated Payout'];
    const tableData = data.map(row => [
      row.author || 'undefined',
      row.article,
      row.payoutRate || 0,
      row.payout || 0
    ]);

    doc.autoTable({
      head: [headers],
      body: tableData,
    });

    doc.save('payout-details.pdf');
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data.map(row => ({
      Author: row.author || 'undefined',
      Article: row.article,
      'Payout Rate': row.payoutRate || 0,
      'Calculated Payout': row.payout || 0,
    })));
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Payout Details');
    XLSX.writeFile(wb, 'payout-details.xlsx');
  };

  return (
    <div className="payout-details">
      <h3>Payout Details</h3>
      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Article</th>
            <th>Payout Rate</th>
            <th>Calculated Payout</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.author ? row.author : 'undefined'}</td>
              <td>{row.article}</td>
              <td>
                <input
                  type="number"
                  value={row.payoutRate || ''}
                  onChange={(e) => handlePayoutChange(index, e.target.value)}
                />
              </td>
              <td>{row.payout || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="export-buttons">
        <button onClick={exportToPDF}>Export to PDF</button>
        <button onClick={exportToExcel}>Export to Excel</button>
      </div>
    </div>
  );
};

export default PayoutDetails;
