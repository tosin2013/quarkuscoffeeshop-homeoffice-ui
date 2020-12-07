import React from 'react';

import {
    Card,
    CardBody,
    CardTitle,
    Flex,
    FlexItem,
    Dropdown,
    DropdownToggle,
    DropdownItem,
    DataList,
    DataListItem,
    DataListItemRow,
    DataListItemCells,
    DataListCell,
   } from '@patternfly/react-core';

import { 
    Chart, 
    ChartAxis, 
    ChartBar, 
    ChartStack,
    ChartVoronoiContainer, 
    ChartThemeColor,
    ChartPoint,
    ChartCursorFlyout,
    ChartCursorTooltip,
    ChartBullet
    } from '@patternfly/react-charts';

import CaretDownIcon from '@patternfly/react-icons/dist/js/icons/caret-down-icon';

import { gql, useQuery } from '@apollo/client';
import client from 'src/apolloclient.js'

export class ServerComparisonChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            chartData: [],
            productLegend: []
          };

          this.baseStyles = { 
            color: '#f0f0f0', 
            fontFamily: 'RedHatText, Overpass, overpass, helvetica, arial, sans-serif',
            fontSize: '14px'
          };

          const endingDate = new Date();
          endingDate.setDate(endingDate.getDate() + 1);
          const endDateString = endingDate.toISOString().slice(0,10);
  
          endingDate.setDate(endingDate.getDate() - 7);
          const startDateString = endingDate.toISOString().slice(0,10);
          
  
          const GET_STORESALES = gql`
          query StoreSales($startDate: String!, $endDate: String!){
              storeServerSalesByDate (startDate: $startDate, endDate: $endDate) {
              server
              store,
              sales{
                  item,
                  sales,
                  revenue
              }
              }
          }
          `;

          console.log("Making GraphQL Request")
          client.query({ 
              query: GET_STORESALES , 
              variables: {startDate: startDateString, endDate: endDateString}
            })
            .then(response => {
                //console.log(response.data.storeServerSalesByDate);

                console.log("Processing GraphQL Response")
                this.ProcessGraphqlData(response.data.storeServerSalesByDate)
                
            }
          )

    }

    ProcessGraphqlData(data){

        function flatten(arr) {
            return [].concat(...arr)
        }
            
        const stores = Array.from(new Set(data.map(item => item.store)))

        const allItemSales = flatten(data.map(server => server.sales));

        //calculate a unique list of products
        const products = Array.from(new Set(allItemSales.map(i => i.item)));

        const productLegend = new Array();
        products.forEach(product => {
            productLegend.push({name: product})
        });

        //initialize a 2 dimensional array for product sales [product, [store sales, store sales]]
        const chartData = Array.from(Array(products.length), () => new Array())
        
        stores.forEach( function(store){
            const storeRecords = data.filter(i => i.store == store);

            //get a flat list of all sales for store
            const storeItemSales = flatten(storeRecords.map(server => server.sales));
            
            //sum the product information for each store
            for (let index = 0; index < products.length; index++) {
                const product = products[index];
                    //sum the sales and revenue
                    const itemSales = storeItemSales.filter(i => i.item == product).reduce((prev, curr) => prev + curr.sales, 0);
                    const itemRevenue = storeItemSales.filter(i => i.item == product).reduce((prev, curr) => prev + curr.revenue, 0);

                    //add it to the chart data set
                    chartData[index].push({name: product, x: store, y: itemSales, tooltip: "Revenue: " + itemRevenue});            
                
            }

        });
        this.setState({products:products});
        this.setState({productLegend:productLegend})
        this.setState({chartData:chartData});
    }

    componentDidMount() {

    }

    
    render() {
        console.log("Rendering")

        //get data from state
        const products = this.state.products;
        const chartData = this.state.chartData;
        const productLegend = this.state.productLegend;

        const BasicRightAlignedLegend = (
            <Flex>
                <FlexItem>
                    <Card style={{ height: '300px', width: '500px' }}>
                        <CardTitle>Store and Server Sales</CardTitle>
                        <CardBody>
                            <Chart
                                ariaDesc="Store and Server Sales"
                                ariaTitle="Store and Server Sales"
                                containerComponent={
                                <ChartVoronoiContainer 
                                    labels={({ datum }) => `${datum.name}: ${JSON.stringify(datum.tooltip)}`} 
                                    constrainToVisibleArea
                                    disable
                                />}
/*
                                    labels={({ datum }) => `${datum.name}: ${datum.y}`} 

                                containerComponent={<ChartVoronoiContainer 
                                    labels={({ datum }) => `${datum.name}: ${JSON.stringify(datum.tooltip)}`} 
                                    labelComponent={
                                        <ChartCursorTooltip
                                          centerOffset={{x: ({ center, flyoutWidth, width, offset = flyoutWidth / 2 + 10 }) => width > center.x + flyoutWidth + 10 ? offset : -offset}}
                                          flyout={<ChartCursorFlyout />}
                                          flyoutHeight={110}
                                          flyoutWidth={125}
                                          labelComponent={<HtmlLegendContent legendData={(datum) => datum.tooltip} title={(datum) => datum.server} />}
                                        />
                                      }
                                      mouseFollowTooltips
                                    constrainToVisibleArea />}
*/

                                    themeColor={ChartThemeColor.multiOrdered}
                                    domainPadding={{ x: [30, 25] }}
                                    //legendData={[{ name: 'Coffee' }, { name: 'Espresso' }, { name: 'Food' }]}
                                    legendData={productLegend}
                                    legendOrientation="vertical"
                                    legendPosition="right"
                                    height={250}
                                    padding={{
                                        bottom: 50,
                                        left: 75,
                                        right: 200, // Adjusted to accommodate legend
                                        top: 0
                                        }}
                                    width={500}
                                >
                                <ChartAxis />
                                <ChartAxis dependentAxis showGrid />
                                <ChartStack>
                                    {chartData.map((value, index) => {
                                        return <ChartBar key={index} data={value} />
                                    })}

                                </ChartStack>
                            </Chart>
                        </CardBody>
                    </Card>
                </FlexItem>
                <FlexItem>
                    <Card>
                        <CardTitle>Average OrderUp Time</CardTitle>
                        <CardBody>
                            <div style={{ height: '172px', width: '500px' }}>
                                <ChartBullet
                                ariaDesc="Storage capacity"
                                ariaTitle="Average OrderUp Time"
                                comparativeWarningMeasureData={[{ name: 'Warning', y: 80 }]}
                                comparativeErrorMeasureData={[{name: 'Terrible', y: 100}]}
                                constrainToVisibleArea
                                height={172}
                                labels={({ datum }) => `${datum.name}: ${datum.y}`}
                                maxDomain={{y: 120}}
                                primarySegmentedMeasureData={[{ name: 'Measure', y: 60 }]}
                                qualitativeRangeData={[{ name: 'Range', y: 50 }, { name: 'Range', y: 80 }]}
                                width={500}
                                />
                        </div>
                        <DataList aria-label="Objectives" isCompact="true">
                            <DataListItem aria-labelledby="simple-item1">
                            <DataListItemRow>
                                <DataListItemCells
                                dataListCells={[
                                    <DataListCell key="primary content">
                                    <span id="simple-item1">Excellent is under 50 seconds</span>
                                    </DataListCell>,
                                    <DataListCell key="secondary content">Objective is under 80 seconds</DataListCell>
                                ]}
                                />
                            </DataListItemRow>
                            </DataListItem>
                        </DataList>
                        </CardBody>
                    </Card>
                </FlexItem>

            </Flex>

        ) 
        return BasicRightAlignedLegend;
    }
}