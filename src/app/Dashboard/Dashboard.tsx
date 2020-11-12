import * as React from 'react';

import {
    PageSection,
    PageSectionVariants,
    Text,
    TextContent,
    Divider,
    Stack, 
    StackItem,
    LabelGroup,
    Label
   } from '@patternfly/react-core';

import { 
  CheckCircleIcon,
  InfoCircleIcon
} from '@patternfly/react-icons';

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

            <Stack hasGutter>
              <StackItem>
                <TextContent>
                  <Text component="h1">Dashboard</Text>
                </TextContent>
              </StackItem>
              <StackItem>
                <LabelGroup categoryName="Key Metrics">
                  <Label icon={<CheckCircleIcon />} color="green">OrderUp</Label>
                  <Label icon={<CheckCircleIcon />} color="green">Sales</Label>
                  <Label icon={<CheckCircleIcon />} color="green">Inventory</Label>
                </LabelGroup>
              </StackItem>
            </Stack>



            </PageSection>
            <Divider component="div" />
            <PageSection variant={PageSectionVariants.default}>
              <ServerComparisonChart />
            </PageSection>
            <Divider component="div" />
            <PageSection variant={PageSectionVariants.default}>
              <ItemSummaryChart />
            </PageSection>
        </React.Fragment>     
        )
    }
}
