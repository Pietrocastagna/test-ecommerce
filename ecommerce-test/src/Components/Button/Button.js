import React from "react";
import "./btn.css";

const Button = ({
  testo,
  type,
  icon,
  operation,
  carrello,
  navigation,
  disable,
}) => {
  return (
    <>
      <button
        disabled={disable}
        onClick={() => operation(navigation)}
        className={disable === false ? type : type + "-disabled"}
      >
        {carrello > 0 && <div className="number-notification">{carrello}</div>}

        <div>
          {icon}
          {testo}
        </div>
      </button>
    </>
  );
};

export default Button;
