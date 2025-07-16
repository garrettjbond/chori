interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={`rounded-md px-6 py-4 text-lg lg:text-xl  ${className}`} {...props}>
        {children}
    </button>
  );
}

export default Button