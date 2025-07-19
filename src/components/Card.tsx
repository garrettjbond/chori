type CardProps = {
    children: React.ReactNode;
    className?: string;
}

function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={`rounded-xl size-70 flex flex-col ${className}`} {...props}>
        <div id="headerConter" className="rounded-t-xl border-ash border-t border-x flex flex-row justify-start items-center bg-snow h-20">
            <p className="mx-4 rounded-full size-10 bg-lavender text-nurple font-bold flex items-center justify-center">A</p>
            <h3>Board A</h3>
        </div>
        <div className="bg-mist h-50 rounded-b-xl"></div>
    </div>
  );
}

export default Card