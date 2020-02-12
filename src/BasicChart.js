import React, { Component } from 'react'
import G2 from '@antv/g2'
import DataSet from '@antv/data-set'

export default class BasicChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 'long',
      chart: null,
      chartData: []
    }
    this.handleBtnClick = this.handleBtnClick.bind(this)
  }
  async componentDidMount() {
    const data = await this.getData()
    this.chartData = data
    this.renderChart()
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

  getData() {
    return new Promise((resolve, reject) => {
      const data = [
        { month: '2019.01', 启蒙: 20.0, 芦苇: 3.9, 海燕: 3.4, 白杨: 5.2 },
        { month: '2019.02', 启蒙: 19.0, 芦苇: 4.2, 海燕: 3.4, 白杨: 5.2 },
        { month: '2019.03', 启蒙: 18.0, 芦苇: 5.7, 海燕: 3.4, 白杨: 5.2 },
        { month: '2019.04', 启蒙: 17.6, 芦苇: 8.5, 海燕: 3.4, 白杨: 5.2 },
        { month: '2019.05', 启蒙: 16.5, 芦苇: 11.9, 海燕: 3.4, 白杨: 5.2 },
        { month: '2019.06', 启蒙: 15.5, 芦苇: 15.2, 海燕: 3.4, 白杨: 5.2 },
        { month: '2019.07', 启蒙: 14.2, 芦苇: 17.0, 海燕: 3.4, 白杨: 5.2 },
        { month: '2019.08', 启蒙: 13.5, 芦苇: 16.6, 海燕: 3.4, 白杨: 5.2 },
        { month: '2019.09', 启蒙: 12.3, 芦苇: 14.2, 海燕: 3.4, 白杨: 5.2 },
        { month: '2019.10', 启蒙: 11.3, 芦苇: 10.3, 海燕: 3.4, 白杨: 5.2 },
        { month: '2019.11', 启蒙: 10.9, 芦苇: 6.6, 海燕: 3.4, 白杨: 5.2 },
        { month: '2019.12', 启蒙: 9.6, 芦苇: 4.8, 海燕: 3.4, 白杨: 5.2 }
      ]
      resolve(data)
    })
  }

  renderChart() {
    const ds = new DataSet()
    const dv = ds.createView().source(this.chartData)
    console.log(dv)

    dv.transform({
      type: 'fold',
      fields: ['启蒙', '芦苇', '海燕', '白杨'], // 展开字段集
      key: 'school', // key字段
      value: 'percent' // value字段
    })

    this.chart = new G2.Chart({
      container: 'chart-container',
      forceFit: true,
      height: 500
    })

    this.chart.source(dv, {
      // Y轴
      month: {
        range: [0, 1]
      }
    })

    this.chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    })

    // 纵坐标轴
    this.chart.axis('percent', {
      alias: '设置',
      label: {
        formatter: val => {
          return val + '%'
        },
        textStyle: {
          fill: '#B8B9BF'
        }
      },
      line: {
        stroke: '#B8B9BF',
        lineWidth: 1
      },
      grid: {
        align: 'center', // 声明网格顶点从两个刻度中间开始，默认从刻度点开始
        type: 'line', // 声明网格的类型，line 表示线，polygon 表示矩形框
        // 当网格类型 type 为 line 时，使用 lineStyle 设置样式
        lineStyle: {
          stroke: '#d9d9d9', // 网格线的颜色
          lineWidth: 1 // 网格线的粗细
        }
      }
    })

    this.chart.legend('school', {
      position: 'top-right'
    })

    this.chart
      .line()
      .position('month*percent')
      .color('school')
      .shape('smooth')

    this.chart
      .point()
      .position('month*percent')
      .color('school')
      .size(4)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1
      })

    this.chart.render()
  }

  render() {
    return (
      <div>
        <button onClick={this.handleBtnClick}>切换长度</button>
        <p>优点：适应性宽度响应很快</p>
        <p>
          缺陷：有一定可以忽略不计的延迟，如果把父元素的长度切换做过渡效果，则会造成不同步情况，快速切换宽度消耗性能
        </p>
        <div className={this.state.width === 'long' ? 'long' : 'low'}>
          <div id="chart-container"></div>
        </div>
      </div>
    )
  }
}
