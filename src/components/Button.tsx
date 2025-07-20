interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={`rounded-md text-lg lg:text-xl w-20 h-10 lg:w-25 lg:h-15 center  ${className}`} {...props}>
        {children}
    </button>
  );
}

export default Button