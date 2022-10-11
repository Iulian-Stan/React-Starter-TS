import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import './styles/main.scss'
import StaticComponent from './components/StaticComponent'
import DynamicComponent from './components/DynamicComponent'

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <div>
      <h1>Hello, Welcome to React and TypeScript</h1>
      <StaticComponent name='John Doe' age={26} address='87 Summer St, Boston, MA 02110' dob={new Date()} />
      <DynamicComponent count={5} />
    </div>
  )
