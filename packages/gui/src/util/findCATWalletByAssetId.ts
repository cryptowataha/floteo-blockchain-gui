import type { Wallet } from '@floteo/api';
import { WalletType } from '@floteo/api';

export default function findCATWalletByAssetId(
  wallets: Wallet[],
  assetId: string,
) {
  return wallets.find(
    (wallet) =>
      wallet.type === WalletType.CAT &&
      wallet.meta?.assetId?.toLowerCase() === assetId.toLowerCase(),
  );
}
