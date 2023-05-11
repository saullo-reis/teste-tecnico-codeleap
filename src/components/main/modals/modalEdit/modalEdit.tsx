import { ModalProps } from '../../../../utils/utils';
import './modalEdit.sass'

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
