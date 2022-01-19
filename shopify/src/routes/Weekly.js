import React, { useState, useCallback } from "react";
import { Page, MediaCard } from "@shopify/polaris";

const CardListItem = (props) => {
  // Change states for Like button.
  const [thumbsUp, setthumbsUp] = useState(false);
  const handleToggleLike = useCallback(
    () => setthumbsUp((thumbsUp) => !thumbsUp),
    []
  );
  const contentStatus = thumbsUp ? " Dislike 💔" : " Like 💖";
  const choiceListItems = [
    {label: 'I accept the Terms of Service', value: 'false'},
    {label: 'I consent to receiving emails', value: 'false2'},
  ];

  return (
    <MediaCard
      title={props.photoData.title +" - "+props.photoData.date+" 📅 "}
      primaryAction={{
        content: contentStatus,
        destructive: thumbsUp,
        onAction: handleToggleLike,
      }}
      description={props.photoData.explanation}
      
      popoverActions={[
        {
          
          content: "Share Photo Link",
          onAction: () => {
            navigator.clipboard.writeText(props.photoData.url);
          },
        },
        {
          
          content: "Copy Explanation",
          onAction: () => {
            navigator.clipboard.writeText(props.photoData.explanation);
          },
        },
      ]}
    >
      <img
        src={props.photoData.url}
        alt={props.photoData.title}
        test={props.photoData.thumbs}
        
        
        width="100%"
        height="100%"
        className="photo"
      />
    </MediaCard>
  );
};

const Weekly = (props) => (
  <Page title="Last Week Photos" >
    {props.photoData.map((photoData) => {

      return <CardListItem photoData={photoData} />;
    })}
  </Page>
);

export default Weekly;