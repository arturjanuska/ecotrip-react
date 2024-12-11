type Props = {
  href: string;
  text: string;
};

const Link = (props: Props) => {
  return (
    <a
      href={props.href}
      style={{
        color: "#9AA61E",
        margin: "18px 0 0 0",
        marginRight: "auto",
      }}
    >
      {props.text}
    </a>
  );
};

export default Link;
