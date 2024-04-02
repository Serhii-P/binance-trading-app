import { ChangeEvent } from "react";

interface MenuProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
}

const DropdownMenu = ({ label, options, value, onChange }: MenuProps) => {
  return (
    <div className="dropdown-menu">
      <label className="dropdown-label">{label}</label>
      <select className="dropdown-select" value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownMenu;
