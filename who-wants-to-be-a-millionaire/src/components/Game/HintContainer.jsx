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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {visibleHints.fiftyFifty && (
        <Button
          onClick={handleHintSelect}
          className="flex items-center justify-center p-2 bg-base-100 text-base-content rounded-lg"
          data-value="fiftyFifty"
        >
          <img
            src={fiftyFiftyImage}
            alt="50-50"
            className="w-full h-auto max-w-[150px]"
          />
        </Button>
      )}
      {visibleHints.phoneAFriend && (
        <Button
          onClick={handleHintSelect}
          className="flex items-center justify-center p-2 bg-base-100 text-base-content rounded-lg"
          data-value="phoneAFriend"
        >
          <img
            src={phoneAFriendImage}
            alt="Phone a friend"
            className="w-full h-auto max-w-[150px]"
          />
        </Button>
      )}
      {visibleHints.askTheHost && (
        <Button
          onClick={handleHintSelect}
          className="flex items-center justify-center p-2 bg-base-100 text-base-content rounded-lg"
          data-value="askTheHost"
        >
          <img
            src={askTheHostImage}
            alt="Ask the host"
            className="w-full h-auto max-w-[150px]"
          />
        </Button>
      )}
      {visibleHints.askTheAudience && (
        <Button
          onClick={handleHintSelect}
          className="flex items-center justify-center p-2 bg-base-100 text-base-content rounded-lg"
          data-value="askTheAudience"
        >
          <img
            src={askTheAudienceImage}
            alt="Ask the audience"
            className="w-full h-auto max-w-[150px]"
          />
        </Button>
      )}
    </div>
  );
}
