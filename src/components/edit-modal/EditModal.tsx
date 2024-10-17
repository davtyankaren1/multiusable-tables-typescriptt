import { useState } from "react";
import Button from "../button/Button";
import CustomInput from "../custom-input/CustomInput";
import DropdownStatus from "../status-dropdown/DropdownStatus";
import "./EditModal.css";

interface EditModalProps {
  data: Record<string, any>;
  onSave: (updatedRow: Record<string, any>) => void;
  onClose: () => void;
}

export const EditModal = ({ data, onSave, onClose }: EditModalProps) => {
  const [editedData, setEditedData] = useState<Record<string, any>>(data);

  const handleInputChange = (key: string, value: any) => {
    setEditedData((prev) => ({ ...prev, [key]: value }));
  };

  const hiddenKeys = new Set([
    "id",
    "options",
    "createdAt",
    "removedAt",
    "updatedAt",
    "publishedAt"
  ]);

  return (
    <div className='modal'>
      <div className='modal-content'>
        {Object.keys(editedData).map((key) => {
          if (hiddenKeys.has(key)) return null;

          return (
            <div key={key} className='modal-input-group'>
              <label className='modal-label'>{key}:</label>
              {key === "active" ? (
                <DropdownStatus
                  selectedStatus={editedData[key] ? "active" : "inactive"}
                  setSelectedStatus={(value) =>
                    handleInputChange(key, value === "active")
                  }
                />
              ) : (
                <CustomInput
                  value={editedData[key]}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                />
              )}
            </div>
          );
        })}
        <div className='modal-footer'>
          <Button
            text='Save'
            onClick={() => onSave(editedData)}
            className='save-button'
          />
          <Button text='Cancel' onClick={onClose} className='close-button' />
        </div>
      </div>
    </div>
  );
};
