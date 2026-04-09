import React, { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  disabled, 
  className = '', 
  type = 'button', 
  variant = 'primary',
  ...rest
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 font-medium text-white transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 focus:ring-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]",
    secondary: "bg-slate-800 hover:bg-slate-700 focus:ring-slate-500 border border-slate-700",
    danger: "bg-rose-600 hover:bg-rose-500 focus:ring-rose-500 shadow-[0_0_20px_rgba(225,29,72,0.4)]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...rest}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      {!disabled && (
        <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
      )}
    </button>
  );
};

export default Button;
