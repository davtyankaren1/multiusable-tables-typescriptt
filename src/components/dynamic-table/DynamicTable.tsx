import React, { useState } from "react";
import { EditModal } from "../edit-modal/EditModal";
import Button from "../button/Button";
import "./DynamicTable.css";

interface DynamicTableProps {
  data: Record<string, any>[];
  onUpdateRow: (updatedRow: any) => void;
}

const formatDate = (date: string | Date) => {
  const d = new Date(date);
  if (d.getTime()) {
    return d.toLocaleDateString();
  }
  return date;
};

const DynamicTable: React.FC<DynamicTableProps> = ({ data, onUpdateRow }) => {
  if (data?.length === 0) {
    return <p className='no-data'>No data available</p>;
  }

  const headers = data && Object.keys(data[0]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<null>(null);

  const handleEdit = (row: any) => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  const handleSave = (updatedRow: any) => {
    onUpdateRow(updatedRow);
    setModalOpen(false);
  };

  return (
    <div className='table-container'>
      <table className='dynamic-table'>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className='table-header'>
                {header.charAt(0).toUpperCase() + header.slice(1)}
              </th>
            ))}
            <th className='table-header'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className='table-row'>
              {headers.map((header) => (
                <td key={header} className='table-cell'>
                  {typeof item[header] === "object" && item[header] !== null
                    ? JSON.stringify(item[header])
                    : typeof item[header] === "string" &&
                      !isNaN(Date.parse(item[header]))
                    ? formatDate(item[header])
                    : item[header]?.toString() || "N/A"}
                </td>
              ))}
              <td className='table-cell'>
                <Button
                  text='Edit'
                  onClick={() => handleEdit(item)}
                  className='edit-button'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && selectedRow && (
        <EditModal
          data={selectedRow}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default DynamicTable;
