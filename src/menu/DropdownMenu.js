
const DropdownMenu = ({ label, options, value, onChange }) => {
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