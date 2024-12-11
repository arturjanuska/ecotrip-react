import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  icon: IconProp;
  content: string;
};

const InfoEntry = ({ icon, content }: Props) => {
  return (
    <div className="info-entry">
      <div className="contacts-icon-container">
        <FontAwesomeIcon icon={icon} color="#9AA61E" />
      </div>
      <span>{content}</span>
    </div>
  );
};

export default InfoEntry;
