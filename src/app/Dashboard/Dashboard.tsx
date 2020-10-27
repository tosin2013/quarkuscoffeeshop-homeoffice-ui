import * as React from 'react';

import {
    PageSection,
    PageSectionVariants,
    Text,
    TextContent,
    Divider,
   } from '@patternfly/react-core';

import { ItemSummaryChart } from './ItemSummaryChart';
import { ServerComparisonChart } from './ServerComparisonChart'

export class Dashboard extends React.Component{
    constructor(props) {
      super(props);
    }

    public render() {
        return (
            <React.Fragment>
            <PageSection variant={PageSectionVariants.light}>
              <TextContent>
                <Text component="h1">Dashboard</Text>
              </TextContent>
            </PageSection>
            <Divider component="div" />
            <PageSection variant={PageSectionVariants.light}>
                <ItemSummaryChart />
            </PageSection>
            <Divider component="div" />
            <PageSection variant={PageSectionVariants.light}>
                <ServerComparisonChart />
            </PageSection>
        </React.Fragment>     
        )
    }
}
