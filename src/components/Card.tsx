type CardProps = {
    children: React.ReactNode;
    className?: string;
}

function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={`rounded-xl size-65 flex flex-shrink-0 flex-col shadow-md ${className}`} {...props}>
        <div id="headerConter" className="rounded-t-xl border-ash border-t border-x flex flex-row justify-start items-center bg-snow h-17 pl-3">
            <p className="hidden lg:flex lg:mr-3 rounded-full size-10 bg-lavender text-nurple font-bold items-center justify-center">A</p>
            <h3 className="font-semibold">Board A</h3>
        </div>
        <div className="bg-mist h-48 rounded-b-xl"></div>
    </div>
  );
}

export default Card