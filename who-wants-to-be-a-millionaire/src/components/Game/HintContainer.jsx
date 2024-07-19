import React, { useState } from "react";
import fiftyFiftyImage from "../../assets/50-50.webp";
import phoneAFriendImage from "../../assets/PAF.webp";
import askTheHostImage from "../../assets/ATH.webp";
import askTheAudienceImage from "../../assets/ATA.gif";
import Button from "../UI/Button";

export default function HintContainer({ onHintSelect }) {
  const [visibleHints, setVisibleHints] = useState({
    fiftyFifty: true,
    phoneAFriend: true,
    askTheHost: true,
    askTheAudience: true,
  });

  function handleHintSelect(e) {
    e.preventDefault();
    const hint = e.currentTarget.dataset.value;
    onHintSelect(hint);

    // Make the button disappear after 2000ms
    setTimeout(() => {
      setVisibleHints((prevHints) => ({
        ...prevHints,
        [hint]: false,
      }));
    }, 2000);
  }

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      {visibleHints.fiftyFifty && (
        <Button
          onClick={handleHintSelect}
          className="w-1/4 p-2 bg-base-100 text-base-content rounded-lg"
          data-value="fiftyFifty"
        >
          <img src={fiftyFiftyImage} alt="50-50" />
        </Button>
      )}
      {visibleHints.phoneAFriend && (
        <Button
          onClick={handleHintSelect}
          className="w-1/4 p-2 bg-base-100 text-base-content rounded-lg"
          data-value="phoneAFriend"
        >
          <img src={phoneAFriendImage} alt="Phone a friend" />
        </Button>
      )}
      {visibleHints.askTheHost && (
        <Button
          onClick={handleHintSelect}
          className="w-1/4 p-2 bg-base-100 text-base-content rounded-lg"
          data-value="askTheHost"
        >
          <img src={askTheHostImage} alt="Ask the host" />
        </Button>
      )}
      {visibleHints.askTheAudience && (
        <Button
          onClick={handleHintSelect}
          className="w-1/4 p-2 bg-base-100 text-base-content rounded-lg"
          data-value="askTheAudience"
        >
          <img src={askTheAudienceImage} alt="Ask the audience" />
        </Button>
      )}
    </div>
  );
}
