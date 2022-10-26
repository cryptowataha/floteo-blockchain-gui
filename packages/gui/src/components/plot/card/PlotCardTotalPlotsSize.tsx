import React from 'react';
import { Trans } from '@lingui/macro';
import { FormatBytes, CardSimple } from '@floteo/core';
import { useGetTotalHarvestersSummaryQuery } from '@floteo/api-react';

export default function PlotCardTotalPlotsSize() {
  const { totalPlotSize, initializedHarvesters, isLoading } = useGetTotalHarvestersSummaryQuery();

  return (
    <CardSimple
      title={<Trans>Total Plots Size</Trans>}
      value={<FormatBytes value={totalPlotSize} precision={3} />}
      loading={isLoading || !initializedHarvesters}
    />
  );
}
