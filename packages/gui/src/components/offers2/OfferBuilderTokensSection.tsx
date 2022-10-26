import React, { useMemo } from 'react';
import { Trans } from '@lingui/macro';
import { Tokens } from '@floteo/icons';
import { Flex } from '@floteo/core';
import { WalletType } from '@floteo/api';
import type { Wallet } from '@floteo/api';
import { useGetWalletsQuery } from '@floteo/api-react';
import { useFieldArray, useWatch } from 'react-hook-form';
import OfferBuilderSection from './OfferBuilderSection';
import OfferBuilderToken from './OfferBuilderToken';
import useOfferBuilderContext from '../../hooks/useOfferBuilderContext';

export type OfferBuilderTokensSectionProps = {
  name: string;
  offering?: boolean;
  muted?: boolean;
};

export default function OfferBuilderTokensSection(
  props: OfferBuilderTokensSectionProps,
) {
  const { name, offering, muted } = props;

  const { data: wallets } = useGetWalletsQuery();
  const { fields, append, remove } = useFieldArray({
    name,
  });

  const tokens = useWatch({
    name,
  });

  function handleAdd() {
    append({
      amount: '',
      assetId: '',
    });
  }

  function handleRemove(index: number) {
    remove(index);
  }

  const { usedAssetIds } = useOfferBuilderContext();
  // const usedAssets = tokens.map((field) => field.assetId);
  const showAdd = useMemo(() => {
    if (!wallets) {
      return false;
    }

    const emptyTokensCount =
      tokens?.filter((token) => !token.assetId).length ?? 0;

    const catWallets = wallets.filter(
      (wallet: Wallet) => wallet.type === WalletType.CAT,
    );

    const availableTokensCount = catWallets.length - usedAssetIds.length;
    return availableTokensCount > emptyTokensCount;
  }, [wallets, usedAssetIds, tokens]);

  return (
    <OfferBuilderSection
      icon={<Tokens />}
      title={<Trans>Tokens</Trans>}
      subtitle={
        <Trans>Chia Asset Tokens (CATs) are tokens built on top of XCH</Trans>
      }
      onAdd={showAdd ? handleAdd : undefined}
      expanded={!!fields.length}
      muted={muted}
    >
      <Flex gap={4} flexDirection="column">
        {fields.map((field, index) => (
          <OfferBuilderToken
            key={field.id}
            // usedAssets={usedAssets}
            name={`${name}.${index}`}
            onRemove={() => handleRemove(index)}
            hideBalance={!offering}
          />
        ))}
      </Flex>
    </OfferBuilderSection>
  );
}
