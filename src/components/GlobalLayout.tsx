import React from "react";

type Props = {
  children: React.ReactNode;
};

const GlobalLayout = ({ children }: Props) => {
  return <div className='container'>{children}</div>;
};

export default GlobalLayout;
