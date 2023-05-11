import React, {ReactNode} from 'react'
import './modalDelete.sass'


interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    children: ReactNode
}

export const ModalDelete = ({ isOpen, children }: ModalProps) => {
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
