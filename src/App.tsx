import { Nav } from "./components/Nav";

export default function App() {
  return (
    <>
      <Nav />
      <main id="top">
        <section id="work" className="section"><div className="container" /></section>
        <section id="about" className="section"><div className="container" /></section>
        <section id="journey" className="section"><div className="container" /></section>
        <section id="contact" className="section"><div className="container" /></section>
      </main>
    </>
  );
}
