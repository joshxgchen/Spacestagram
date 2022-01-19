import React from "react";
import enTranslations from "@shopify/polaris/locales/en.json";
import {
  AppProvider,
  MediaCard,
  SkeletonPage,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
  Frame,
} from "@shopify/polaris";

const loader = (
  <MediaCard
    title={
      <TextContainer>
        <SkeletonDisplayText></SkeletonDisplayText>
      </TextContainer>
    }
    primaryAction={{ content: "" }}
    description={
      <TextContainer>
        <SkeletonBodyText lines={10} />
      </TextContainer>
    }
    popoverActions={[{}]}
  >
  </MediaCard>
);

const loaderList = () => {
  return (
    <div className="skeleton-photo">
      <AppProvider i18n={enTranslations}>
        <Frame>
          <SkeletonPage title="Loading Spacestagram! Please wait">
            {loader}
            {loader}
            {loader}
          </SkeletonPage>
        </Frame>
      </AppProvider>
    </div>
  );
};

export default loaderList;