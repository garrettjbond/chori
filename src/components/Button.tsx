interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    size?: "small" | "medium" | "large";
}

const sizeClasses = {
  small: "text-sm w-16 h-8",
  medium: "text-lg w-20 h-10",
  large: "text-xl w-25 h-15",
};

function Button({ children, className, size = "medium", ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-md ${sizeClasses[size]} center hover:bg-lightNurple duration-300 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button