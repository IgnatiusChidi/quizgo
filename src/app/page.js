
import Image from "next/image";
import Link from "next/link";
import './styles.scss'

export default function Home() {
  
  return (
    <div id="home">

      <div id="bg">
        <video autoPlay muted loop src="/images/1110756_Animation_Blurred_1280x720.mp4"></video>
      </div>
      <div id="overlay"></div>
      <h1>Welcome To <b>Quiz<span className="green">Go</span></b></h1>
      <p>Explore Questions on any Category, on the <span className="green">Go!</span></p>
      <Link href={'/form'} className="link"><button className="button">Explore</button></Link>

    </div>
  );
}
