import * as React from 'react'
import UserInterface from '../UserInterface'

export default class StaticComponent extends React.Component<UserInterface, {}> {
  render () {
    return (
      <div>
        <h2>Example Static Component</h2>
        <h3>User Data</h3>
        Name: <b>{this.props.name}</b>
        <br/>
        Age <b>{this.props.age} years</b>
        <br/>
        Birth place: <b>{this.props.address}</b>
        <br/>
        Birth date: <b>{this.props.dob.toDateString()}</b>
      </div>
    )
  }
}
