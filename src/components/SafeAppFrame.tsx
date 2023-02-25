// Inspired by https://github.com/safe-global/web-core/blob/dev/src/components/safe-apps/AppFrame/SafeAppIframe.tsx
import type { MutableRefObject, ReactElement } from 'react';
import styled from '@emotion/styled';

const Frame = styled.iframe`
  width: 100%;
  //height: 100%;
  overflow: auto;
  box-sizing: border-box;
  border: none;
  flex-grow: 1;
  ${(props) => (props.hidden ? 'display: none;' : '')}
`;

type SafeAppIFrameProps = {
  appUrl: string;
  allowedFeaturesList: string;
  title?: string;
  iframeRef?: MutableRefObject<HTMLIFrameElement | null>;
  onLoad?: () => void;
  hidden?: boolean;
};

// see sandbox mdn docs for more details https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox
const IFRAME_SANDBOX_ALLOWED_FEATURES =
  'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-downloads allow-orientation-lock';

export default function SafeAppFrame({
  appUrl,
  allowedFeaturesList,
  iframeRef,
  onLoad,
  title,
  hidden = false,
}: SafeAppIFrameProps): ReactElement {
  return (
    <Frame
      id={`iframe-${appUrl}`}
      ref={iframeRef}
      src={appUrl}
      title={title}
      onLoad={onLoad}
      sandbox={IFRAME_SANDBOX_ALLOWED_FEATURES}
      allow={allowedFeaturesList}
      hidden={hidden}
    />
  );
}
