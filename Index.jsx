import {useState, useEffect} from 'react'
import BeatLoader from 'react-spinners/BeatLoader'
import LeaderboardRow from '../LeaderboardRow'
import './index.css'

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([])
  const [isLoading, setISLoading] = useState(true)
  useEffect(() => {
    const getLeaderBoardData = async () => {
      const url = 'https://apis2.ccbp.in/leaderboard-v2'
      const response = await fetch(url)
      const responseData = await response.json()
      const formattedData = responseData.leaderboard_data.map(eachuser => ({
        id: eachuser.id,
        rank: eachuser.rank,
        name: eachuser.name,
        profileImgUrl: eachuser.profile_image_url,
        score: eachuser.score,
        language: eachuser.language,
        timeSpent: eachuser.time_spent,
      }))

      setLeaderboardData(formattedData)
      setISLoading(false)
    }

    getLeaderBoardData()
  }, [])

  const renderLeaderboardHeader = () => (
    <li className="leaderboard-header">
      <p className="table-heading rank">Rank</p>
      <p className="table-heading name">Name</p>
      <p className="table-heading score">Score</p>
      <p className="table-heading language">Language</p>
      <p className="table-heading time-spent">Time Spent</p>
    </li>
  )
  const renderLoadingView = () => (
    <div className="loding-view-container">
      <BeatLoader color="#ffffff" />
    </div>
  )
  const renderLeaderboard = () => (
    <ul className="leaderboard-table-container">
      {renderLeaderboardHeader()}
      {leaderboardData.map(eachuser => (
        <LeaderboardRow key={eachuser.id} userDetails={eachuser} />
      ))}
    </ul>
  )

  return (
    <div className="leaderboard-container">
      {isLoading ? renderLoadingView() : renderLeaderboard()}
    </div>
  )
}

export default Leaderboard
