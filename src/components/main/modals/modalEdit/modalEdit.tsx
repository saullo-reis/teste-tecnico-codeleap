import { ReactNode } from 'react'
import './modalEdit.sass'


interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    children: ReactNode
}

export const ModalEdit = ({ isOpen, children }: ModalProps) => {
    if (!isOpen) {
        return null
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
}
