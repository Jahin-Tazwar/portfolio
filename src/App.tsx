import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";

export default function App() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <section id="work" className="section"><div className="container" /></section>
        <section id="about" className="section"><div className="container" /></section>
        <section id="journey" className="section"><div className="container" /></section>
        <section id="contact" className="section"><div className="container" /></section>
      </main>
    </>
  );
}
