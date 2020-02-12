import React, { Component } from 'react'
import G2 from '@antv/g2'

export default class AntvChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 'long',
      className: '',
      chart: null
    }
    this.handleBtnClick = this.handleBtnClick.bind(this)
    this.handleAniBtnClick = this.handleAniBtnClick.bind(this)
  }
  componentDidMount() {
    const data = [
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
      { year: '2000', value: 4.9 },
      { year: '2001', value: 6 },
      { year: '2002', value: 7 },
      { year: '2003', value: 9 },
      { year: '2004', value: 13 },
      { year: '2005', value: 4.9 },
      { year: '2006', value: 6 },
      { year: '2007', value: 7 },
      { year: '2008', value: 9 },
      { year: '2009', value: 13 }
    ]
    this.chart = new G2.Chart({
      container: 'chart-container',
      forceFit: true,
      height: 500
    })
    this.chart.source(data)
    this.chart.scale('value', {
      min: 0
    })
    this.chart.scale('year', {
      range: [0, 1]
    })
    this.chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    })
    this.chart.line().position('year*value')
    this.chart
      .point()
      .position('year*value')
      .size(4)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1
      })
    this.chart.render()
  }

  handleBtnClick() {
    this.setState(
      () => {
        return { width: this.state.width === 'long' ? 'low' : 'long' }
      },
      () => {
        this.chart.forceFit()
      }
    )
  }

  handleAniBtnClick() {
    this.setState({
      className: this.state.className === '' ? 'animate' : ''
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.handleBtnClick}>切换长度</button>
        <button onClick={this.handleAniBtnClick}>切换父元素过渡效果</button>
        {this.state.className === '' ? '没有过渡效果' : '有过渡效果'}
        <p>优点：适应性宽度响应很快</p>
        <p>
          缺陷：有一定可以忽略不计的延迟，如果把父元素的长度切换做过渡效果，则会造成不同步情况，快速切换宽度消耗性能
        </p>
        {this.state.className === '' ? (
          <div className={this.state.width === 'long' ? 'long' : 'low'}>
            <div id="chart-container"></div>
          </div>
        ) : (
          <div
            className={
              this.state.width === 'long' ? 'long animate' : 'low animate'
            }
          >
            <div id="chart-container"></div>
          </div>
        )}
      </div>
    )
  }
}
