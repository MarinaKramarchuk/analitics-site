import './App.css'
import DatePicker from './components/DatePicker/DatePicker'
import Header from './components/Header/Header'
import PostList from './components/PostList/PostList'

function App() {

  return (
    <div className="dashboard-layout">
      <div className='decor decor-top'></div>
      <div className='decor decor-botom'></div>
      <Header />
      <main className="container">
        <DatePicker />
        <PostList />
      </main>
    </div>
  )
}

export default App
