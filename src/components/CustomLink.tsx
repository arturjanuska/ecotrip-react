import Link from "next/link";
import React from "react";

type Props = {
  label: string;
  href: string;
};

const CustomLink = (props: Props) => {
  return (
    <Link
      href={props.href}
      className='bg-sky-500 hover:bg-sky-700 transition'
      style={{
        padding: "0.4rem 0.8rem",
        borderRadius: "4px",
        color: "white",
      }}
    >
      {props.label}
    </Link>
  );
};

export default CustomLink;
