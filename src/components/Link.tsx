type Props = {
  href: string;
  text: string;
};

const Link = (props: Props) => {
  return (
    <a className="ecotrip-link" href={props.href}>
      {props.text}
    </a>
  );
};

export default Link;
