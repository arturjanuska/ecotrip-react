import React, { ReactNode } from 'react';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';

const CustomModal = ({
  modalTitle,
  modalBody,
  footerProps,
}: {
  modalTitle: string;
  modalBody: ReactNode;
  footerProps: {
    primaryButtonProps: React.ButtonHTMLAttributes<HTMLButtonElement> & {
      children: React.ReactNode;
    };
    secondaryButtonProps: React.ButtonHTMLAttributes<HTMLButtonElement> & {
      children: React.ReactNode;
    };
  };
}) => {
  return (
    <div className="modal-wrapper">
      <div className="modal-container">
        <div className="modal-title">{modalTitle}</div>
        <div className="modal-body">{modalBody}</div>
        <div className="modal-footer">
          <PrimaryButton {...footerProps.primaryButtonProps}>
            {footerProps.primaryButtonProps.children}
          </PrimaryButton>
          <SecondaryButton {...footerProps.secondaryButtonProps}>
            {footerProps.secondaryButtonProps.children}
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
