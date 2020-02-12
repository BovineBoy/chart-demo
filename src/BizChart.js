import React, { Component } from 'react'
import './chart.css'
import { Chart, Geom, Axis, Tooltip } from 'bizcharts'

export default class BizChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      className: 'long',
      data: [],
      cols: {}
    }
  }
  componentDidMount() {
    const data = [
      {
        year: '1991',
        value: 3
      },
      {
        year: '1992',
        value: 4
      },
      {
        year: '1993',
        value: 3.5
      },
      {
        year: '1994',
        value: 5
      },
      {
        year: '1995',
        value: 4.9
      },
      {
        year: '1996',
        value: 6
      },
      {
        year: '1997',
        value: 7
      },
      {
        year: '1998',
        value: 9
      },
      {
        year: '1999',
        value: 13
      }
    ]
    const cols = {
      value: {
        min: 0
      },
      year: {
        range: [0, 1]
      }
    }
    this.setState({
      data,
      cols
    })
  }
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState(() => {
              return {
                className: this.state.className === 'long' ? 'low' : 'long'
              }
            })
          }}
        >
          切换长度
        </button>
        <p>
          优点：API符合React操作习惯，快速切换时会合并多次操作一起，节省资源
        </p>
        <p>缺陷：适应性宽度有一定延迟</p>
        <p>因为不需要考虑快速切换场景，不考虑使用</p>
        <div className={this.state.className === 'long' ? 'long' : 'low'}>
          <Chart
            height={400}
            data={this.state.data}
            scale={this.state.cols}
            forceFit
          >
            <Axis name="year" />
            <Axis name="value" />
            <Tooltip
              crosshairs={{
                type: 'y'
              }}
            />
            <Geom type="line" position="year*value" size={2} />
            <Geom
              type="point"
              position="year*value"
              size={4}
              shape={'circle'}
              style={{
                stroke: '#fff',
                lineWidth: 1
              }}
            />
          </Chart>
        </div>
      </div>
    )
  }
}
