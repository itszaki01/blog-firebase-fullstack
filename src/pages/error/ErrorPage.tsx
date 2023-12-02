import ErrorImage from '/src/assets/404-Error.png'
import './ErrorPage.scss'
export default function ErrorPage() {
  return (
    <main className='error-page-container'>
      <img src={ErrorImage} alt="" />
    </main>
  )
}
