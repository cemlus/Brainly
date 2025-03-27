// interface modalParams {
//     open: boolean;
//     onClose: () => void;
//     closeIcon: React.ReactElement
// }

import { Input } from "./InputBox";
import { Button } from './Button';

// export function AddContentModal({ open, onClose, closeIcon }: modalParams) {
//   return (
//     <>
//       {open && (
//         <div className="h-full w-full bg-blue-400 fixed left-0 top-0 opacity-50 flex items-center justify-center">
//           <div className="z-10 bg-white flex flex-col opacity-100 justify-center rounded-md p-10">
//             <div onClick={onClose}>
//               {closeIcon}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

interface ModalParams {
    open: boolean;
    onClose: () => void;
    closeIcon: React.ReactElement;
}

export function AddContentModal({ open, onClose, closeIcon }: ModalParams) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50">
            <div 
                className="fixed inset-0 bg-gray-200 opacity-80 transition-opacity blur-s"
                onClick={onClose}
            />
            
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <div className="relative bg-white w-full max-w-xl rounded-lg shadow-xl border-gray-300">

                        <div className="absolute right-4 top-4 cursor-pointer" onClick={onClose}>
                            {closeIcon}
                        </div>
                        
                        <div className="p-6 w-full flex-col">
                            <h2 className="text-xl font-semibold mb-4">Add Content</h2>
                            <Input placeholder= {"Title"} />
                            <Input placeholder= {"Description"} />
                            <div className="flex justify-center mt-3">
                                {/* after clicking submit the data will be fed into the backend and rendered on the frontend simultaneously as a note */}
                                <Button variant="primary" text="Submit" onClick={onClose} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
