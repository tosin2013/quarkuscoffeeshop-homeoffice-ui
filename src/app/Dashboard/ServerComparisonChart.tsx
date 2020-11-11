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

/*
function getChartBar(store, serverRecords) {
    
    const data = [];

    serverRecords.forEach(element => {
        data.push({x: element.store, timePeriod: element.timePeriod, server: element.server, y: element.total});
    });

    return (
        <ChartBar data={data} />
    );
}
*/

export class ServerComparisonChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDropDownOpen: false
          };
          this.onToggle = isDropDownOpen => {
            this.setState({
                isDropDownOpen
            });
          };
          this.onSelect = event => {
            this.setState({
                isDropDownOpen: !this.state.isDropDownOpen
            });
            console.log("Selected: " + event.target.innerText);
            this.onFocus();
          };
          this.onFocus = () => {
            const element = document.getElementById('toggle-id');
            element.focus();
          };

          this.baseStyles = { 
            color: '#f0f0f0', 
            fontFamily: 'RedHatText, Overpass, overpass, helvetica, arial, sans-serif',
            fontSize: '14px'
          };
    }

    componentDidMount() {
        // send HTTP request
        // save it to the state
    }

    render() {


        const data=[
            {store: "Store1", timePeriod: 16, server:"Paul", coffee: 26, espresso:6, food: 14 },
            {store: "Store1", timePeriod: 16, server:"Tosin", coffee: 21, espresso:6, food: 18 },
            {store: "Store1", timePeriod: 16, server:"Jeremy", coffee: 26, espresso:3, food: 15 },
            
            {store: "Store2", timePeriod: 16, server:"Jennifer", coffee: 26, espresso:6, food: 14 },
            {store: "Store2", timePeriod: 16, server:"Mary", coffee: 21, espresso:9, food: 18 },
            {store: "Store2", timePeriod: 16, server:"Ann", coffee: 26, espresso:3, food: 15 },
            {store: "Store2", timePeriod: 16, server:"Jeff", coffee: 26, espresso:3, food: 15 },
            
            {store: "Store3", timePeriod: 16, server:"Rick", coffee: 21, espresso:9, food: 18 },
            {store: "Store3", timePeriod: 16, server:"Morty", coffee: 26, espresso:3, food: 15 },
            {store: "Store3", timePeriod: 16, server:"Jerry", coffee: 26, espresso:3, food: 15 },
            {store: "Store3", timePeriod: 16, server:"Summer", coffee: 26, espresso:6, food: 14 },    
        ];

        data.forEach(server => server.total = server.coffee + server.espresso + server.food );

        const stores = Array.from(new Set(data.map(item => item.store)))

        const chartData = [[],[],[]];
        
        stores.forEach( function(store){
            const storeRecords = data.filter(i => i.store == store);

            const coffeeSum = storeRecords.map(i => i.coffee).reduce((prev, curr) => prev + curr, 0);
            const espressoSum = storeRecords.map(i => i.espresso).reduce((prev, curr) => prev + curr, 0);
            const foodSum = storeRecords.map(i => i.food).reduce((prev, curr) => prev + curr, 0);


            //Build the Tooltips showing servers at each store
            const coffeeTooltip = [];
            storeRecords.forEach(record => {
                coffeeTooltip.push({server: record.server, coffee: record.coffee});
            });

            const espressoTooltip = [];
            storeRecords.forEach(record => {
                espressoTooltip.push({server: record.server, espresso: record.espresso});
            });

            const foodTooltip = [];
            storeRecords.forEach(record => {
                foodTooltip.push({server: record.server, food: record.food});
            });

            //data for each ChartBar
            chartData[0].push({name: "Coffee", x: store, y: coffeeSum, tooltip: coffeeTooltip});
            chartData[1].push({name: "Espresso", x: store, y: espressoSum, tooltip: espressoTooltip});
            chartData[2].push({name: "Food", x: store, y: foodSum, tooltip: foodTooltip});
        });



        const { isDropDownOpen } = this.state;
        const dropdownItems = [];
        stores.forEach( function(store){
            dropdownItems.push(<DropdownItem key={store} component="button">{store}</DropdownItem>)
        });

        // Custom HTML component to create a legend layout
        const HtmlLegendContent = ({datum, legendData, text, theme, title, x, y, ...rest}) => (
            <g>
            <foreignObject height="100%" width="100%" x={x - 40} y={y - 45} >
                <table>
                <thead>
                    <tr>
                    <th colSpan={2} style={{...this.baseStyles, fontWeight: 700}}>{title(datum)}</th>
                    </tr>
                </thead>
                <tbody>
                    {text.map((val, index) => (
                    <tr key={`tbody-tr-${index}`} style={this.baseStyles}>
                        <th width="20px">
                        <svg height="9.74" width="9.74" role="img">
                            {<ChartPoint x={0} y={0}
                            style={{ fill: theme.legend.colorScale[index] }}
                            symbol={legendData[index].symbol ? legendData[index].symbol.type : 'square'}
                            size={10}
                            />}
                        </svg>
                        </th>
                        <td width="55px">{legendData[index].name}</td>
                        <td style={{textAlign: 'right'}}>{val}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </foreignObject>
            </g>
        );

        const BasicRightAlignedLegend = (
            <Flex>
                <FlexItem>
                    <Card style={{ height: '300px', width: '600px' }}>
                        <CardTitle>Store and Server Sales</CardTitle>
                        <CardBody>
                            <Chart
                                ariaDesc="Store and Server Sales"
                                ariaTitle="Store and Server Sales"
                                containerComponent={<ChartVoronoiContainer labels={({ datum }) => `${datum.server}: ${JSON.stringify(datum.tooltip)}`} constrainToVisibleArea />}
/*
                                containerComponent={<ChartVoronoiContainer 
                                    labels={({ datum }) => `${datum.server}: ${JSON.stringify(datum.tooltip)}`} 
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
                                legendData={[{ name: 'Coffee' }, { name: 'Espresso' }, { name: 'Food' }]}
                                legendOrientation="vertical"
                                legendPosition="right"
                                height={250}
                                padding={{
                                bottom: 50,
                                left: 75,
                                right: 200, // Adjusted to accommodate legend
                                top: 0
                                }}
                                width={600}
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
                            <div style={{ height: '150px', width: '500px' }}>
                                <ChartBullet
                                ariaDesc="Storage capacity"
                                ariaTitle="Average OrderUp Time"
                                comparativeWarningMeasureData={[{ name: 'Warning', y: 80 }]}
                                comparativeErrorMeasureData={[{name: 'Terrible', y: 100}]}
                                constrainToVisibleArea
                                height={150}
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
                                    <span id="simple-item1">Excellent range is under 50 seconds</span>
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