import React from 'react';

type Props = {
  children: React.ReactNode;
};

const GlobalLayout = ({ children }: Props) => {
  return <div className="page">{children}</div>;
};

export default GlobalLayout;
