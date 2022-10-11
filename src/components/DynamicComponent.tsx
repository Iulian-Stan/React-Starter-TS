import * as React from 'react'
import style from './DynamicComponent.scss'

export default class DynamicComponent extends React.Component<{ count: number }, { count: number }> {
  constructor (props: { count: number }) {
    super(props)
    this.state = { ...props }
  }

  increment = (): void => {
    this.setState({
      count: (this.state.count + 1)
    })
  }

  decrement = (): void => {
    this.setState({
      count: (this.state.count - 1)
    })
  }

  render () {
    return (
      <div>
        <h2>Example Dynamic Component</h2>
        <h3>Counter</h3>
        <span className={style.number}>{this.state.count}</span>
        <br/>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
      </div>
    )
  }
}
