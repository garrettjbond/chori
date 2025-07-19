// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useState } from 'react';

// type ModalProps = {
//     isOpen: boolean;
//     modalMessage: string;
//     children: React.ReactNode;
//     className?: string;
// }

// function Modal({ modalMessage, children, className, ...props }: ModalProps) {
//     // const [isOpen, setIsOpen] = useState<boolean>(true)
    
//     return (
//     <>
//     {isOpen &&
//     <div className={`rounded-lg bg-white ${className}`} {...props}>
//         <div className="flex justify-between border-b-4">
//             <h2>{modalMessage}</h2>
//             <span>
//             <FontAwesomeIcon icon={["fas", "xmark"]} />
//             </span>
//         </div>
//         <div>Body</div>
//     </div>
//     }
//     </>
//   );
// }

// export default Modal;