import NoPostsYesImg from '/src/assets/welcome.png'
import './NoPostsYet.scss'
import NewPostBtn from '../Post-Components/NewPostBtn/NewPostBtn'
export default function NoPostsYet() {
  return (
    <div className='no-posts-yet-contianer'>
        <p>No Posts Published Yet</p>
        <NewPostBtn />
        <img src={NoPostsYesImg} alt="" />
    </div>
  )
}
