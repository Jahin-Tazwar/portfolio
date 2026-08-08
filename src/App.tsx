import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { SelectedWork } from "./components/SelectedWork";
import { About } from "./components/About";
import { Journey } from "./components/Journey";
import { MoreOnGitHub } from "./components/MoreOnGitHub";
import { Contact } from "./components/Contact";

export default function App() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <section id="work" className="section"><SelectedWork /></section>
        <section id="about" className="section"><About /></section>
        <section id="journey" className="section"><Journey /></section>
        <section id="more" className="section"><MoreOnGitHub /></section>
        <section id="contact" className="section"><Contact /></section>
      </main>
    </>
  );
}
