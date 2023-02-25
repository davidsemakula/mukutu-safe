import { SafeAppData } from '@safe-global/safe-gateway-typescript-sdk';
import { SimpleChainInfo } from './chains';

export interface ChainSafeAppData extends SafeAppData {
  onlySupportsRelatedChains?: boolean;
  supportedRelatedChains?: Array<SimpleChainInfo>;
  index?: number;
}
