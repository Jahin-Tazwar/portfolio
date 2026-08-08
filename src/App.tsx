import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { SelectedWork } from "./components/SelectedWork";

export default function App() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <section id="work" className="section"><SelectedWork /></section>
        <section id="about" className="section"><div className="container" /></section>
        <section id="journey" className="section"><div className="container" /></section>
        <section id="contact" className="section"><div className="container" /></section>
      </main>
    </>
  );
}
