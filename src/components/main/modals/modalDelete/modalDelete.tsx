import './modalDelete.sass'
import { ModalProps } from '../../../../utils/utils';

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
