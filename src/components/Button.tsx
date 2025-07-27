interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    size?: "small" | "medium" | "large" | "custom";
}

const sizeVariants = {
  small: "text-sm px-3 py-1 h-10",
  medium: "text-md px-4 py-2",
  large: "text-lg px-6 py-3",
  custom: "",
};

function Button({ children, className, size = "medium", ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-md ${sizeVariants[size]} center cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button