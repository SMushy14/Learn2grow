import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CoursesSection from "./components/CoursesSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <CoursesSection />
        {/* TODO: add testimonials section */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
