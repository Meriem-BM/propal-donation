import LandingPage from "@/components/LandingPage";
import Header from "@/components/Sections/Header";
import FeaturesSection from "@/components/Sections/FeaturesSection";

const App = () => {
  return (
    <div className="min-h-screen text-gray-300 font-sans">
      <Header />
      <LandingPage>
        <FeaturesSection />
      </LandingPage>
    </div>
  );
};

export default App;
