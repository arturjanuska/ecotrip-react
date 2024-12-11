import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  icon: IconDefinition;
  onClick: () => void;
};

const IconWithContainer = ({ icon, onClick }: Props) => {
  return (
    <div className="icon-container" onClick={onClick}>
      <FontAwesomeIcon
        icon={icon}
        style={{
          width: "20px",
          height: "20px",
        }}
      />
    </div>
  );
};

export default IconWithContainer;
