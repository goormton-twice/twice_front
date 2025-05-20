const Button = ({ children, onClick, disabled = false, className = '', style = {}}) => { 
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ backgroundColor:'white', color: 'black', border: '1px solid black', padding:'1px 10px', ...style }}
    >
      {children}
    </button>
  );

}

export default Button;