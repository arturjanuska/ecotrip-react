import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/alert.css";

const CustomAlert = ({ messages }: { messages: string[] }) => {
  if (messages.length === 0) return null;
  return (
    <div className="alert-container">
      <div>
        <FontAwesomeIcon icon={faCircleExclamation} color="#ff0000" />
      </div>
      <div className="alert-messages">
        {messages &&
          messages.map((mess) => (
            <span className="error" key={mess}>
              {mess}
            </span>
          ))}
      </div>
    </div>
  );
};

export default CustomAlert;
