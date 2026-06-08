import './App.scss'
import Header from './components/Header/Header'
import PostList from './components/PostList/PostList'

function App() {

  return (
    <div className="dashboard-layout">
      <div className='decor decor-top'></div>
      <div className='decor decor-botom'></div>
      <Header />
      <main className="container">
        <PostList />
      </main>
    </div>
  )
}

export default App
