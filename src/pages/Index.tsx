import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Download,
  Smartphone,
  Shield,
  Trophy,
  Zap,
  Star,
  Play,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";

const Index = () => {
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [latestRelease, setLatestRelease] = useState<{
    name?: string;
    tag_name?: string;
    html_url?: string;
  } | null>(null);

  const screenshots = [
    { title: "Home Screen", description: "Easy navigation and game selection" },
    {
      title: "Game Selection",
      description: "Choose from 4 exciting game types",
    },
    {
      title: "Betting Interface",
      description: "Place your bets with confidence",
    },
    {
      title: "Results & Winnings",
      description: "Track your wins and earnings",
    },
  ];

  const gameTypes = [
    {
      name: "Harup",
      icon: "🎯",
      description: "Pick a single number and win big if it matches the result",
    },
    {
      name: "Jodi",
      icon: "🎲",
      description: "Predict a pair of numbers for higher winning chances",
    },
    {
      name: "Crossing",
      icon: "⚡",
      description: "Cross betting with multiple number combinations",
    },
    {
      name: "Single",
      icon: "🎪",
      description: "Simple single digit betting for beginners",
    },
  ];

  const features = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Easy Interface",
      description: "User-friendly design for seamless betting",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Live Results",
      description: "Real-time updates and instant notifications",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Wallet",
      description: "Safe and encrypted payment system",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Daily Wins",
      description: "Multiple opportunities to win every day",
    },
  ];

  const faqs = [
    {
      question: "Is betting legal on this platform?",
      answer:
        "Khai Wala operates in compliance with local regulations. Please check your local laws regarding online betting before participating.",
    },
    {
      question: "How are winners decided?",
      answer:
        "Winners are determined through a transparent and fair random number generation system. Results are published in real-time for all participants to see.",
    },
    {
      question: "Is my money safe?",
      answer:
        "Yes, we use bank-grade encryption and secure payment gateways. Your funds are protected with multiple layers of security.",
    },
    {
      question: "How do I withdraw my winnings?",
      answer:
        "Winnings can be withdrawn instantly to your bank account or digital wallet through our secure payment system.",
    },
  ];

  const nextScreenshot = () => {
    setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
  };

  const prevScreenshot = () => {
    setCurrentScreenshot(
      (prev) => (prev - 1 + screenshots.length) % screenshots.length
    );
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleDownloadClick = () => {
    setShowDownloadDialog(true);

    // Trigger file download
    const downloadLink = document.createElement("a");
    downloadLink.href =
      "https://github.com/Projects-Kart/khai-wala-landing-page/releases/latest/download/khaiwala.apk";
    downloadLink.download = "khaiwala.apk"; // Optional: force download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Auto close dialog after 3 seconds
    setTimeout(() => {
      setShowDownloadDialog(false);
    }, 3000);
  };

  // Fetch latest release info from GitHub
  useEffect(() => {
    const controller = new AbortController();
    const fetchLatest = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/repos/Projects-Kart/khai-wala-landing-page/releases/latest",
          { signal: controller.signal }
        );
        if (!res.ok) return;
        const data = await res.json();
        setLatestRelease({
          name: data?.name,
          tag_name: data?.tag_name,
          html_url: data?.html_url,
        });
      } catch (_) {
        // ignore network errors
      }
    };
    fetchLatest();
    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center font-bold text-black">
              K
            </div>
            <span className="text-white font-bold text-xl">Khai Wala</span>
            {latestRelease?.tag_name && (
              <span className="ml-2 inline-flex items-center rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium text-yellow-300 border border-yellow-500/30">
                {latestRelease.tag_name}
              </span>
            )}
          </div>
          <Button
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold"
            onClick={handleDownloadClick}
          >
            <Download className="w-4 h-4 mr-2" />
            Download App
            {latestRelease?.tag_name && (
              <span className="ml-2 rounded bg-black/20 px-1.5 py-0.5 text-[10px] font-semibold text-black">
                {latestRelease.tag_name}
              </span>
            )}
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold">
            🎯 #1 Betting App
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Khai Wala
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-yellow-400 font-semibold mb-4 animate-fade-in">
            Play Smart, Win Big!
          </p>
          {latestRelease?.tag_name && (
            <p className="text-sm text-gray-300 mb-6 animate-fade-in">
              Latest version:{" "}
              <span className="text-yellow-300">{latestRelease.tag_name}</span>
            </p>
          )}
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in">
            A safe and exciting online betting experience with 4 unique game
            types: Harup, Jodi, Crossing, and Single. Join thousands of winners
            today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
              onClick={handleDownloadClick}
            >
              <Download className="w-5 h-5 mr-2" />
              Download for Android
              {latestRelease?.tag_name && (
                <span className="ml-2 rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold text-yellow-200">
                  {latestRelease.tag_name}
                </span>
              )}
            </Button>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Mobile Mockup */}
          <div className="relative max-w-xs mx-auto animate-scale-in">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl p-2 shadow-2xl">
              <div className="bg-black rounded-2xl p-1">
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl h-96 flex items-center justify-center">
                  <div className="text-center text-white p-6">
                    <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Trophy className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Ready to Win?</h3>
                    <p className="text-sm opacity-80">
                      Choose your lucky numbers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Khai Wala?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Experience the best in online betting with our advanced features
              and secure platform
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-900/80 border-gray-700/50 backdrop-blur-md hover:bg-gray-800/90 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg mx-auto mb-4 flex items-center justify-center text-black">
                    {feature.icon}
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Game Types Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Four Exciting Game Types
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Choose from our variety of games and find your winning strategy
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {gameTypes.map((game, index) => (
              <Card
                key={index}
                className="bg-gray-900/80 border-yellow-500/30 backdrop-blur-md hover:bg-gray-800/90 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{game.icon}</div>
                  <h3 className="text-white font-bold text-xl mb-2">
                    {game.name}
                  </h3>
                  <p className="text-gray-300 text-sm">{game.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshot Gallery */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              App Screenshots
            </h2>
            <p className="text-gray-300">
              Take a look at our beautiful and intuitive interface
            </p>
          </div>
          <div className="max-w-md mx-auto relative">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl p-4 shadow-2xl">
              <div className="bg-black rounded-2xl p-2">
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl h-96 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center text-white p-6">
                    <h3 className="font-bold text-lg mb-2">
                      {screenshots[currentScreenshot].title}
                    </h3>
                    <p className="text-sm opacity-80">
                      {screenshots[currentScreenshot].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Button
              size="sm"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black"
              onClick={prevScreenshot}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black"
              onClick={nextScreenshot}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-300">
              Start winning in just 3 simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Select a Game",
                description: "Choose from Harup, Jodi, Crossing, or Single",
                icon: <Play className="w-8 h-8" />,
              },
              {
                step: "2",
                title: "Place Your Bet",
                description: "Pick your lucky numbers and bet amount",
                icon: <Trophy className="w-8 h-8" />,
              },
              {
                step: "3",
                title: "Win Big",
                description: "If your number matches, you win the prize!",
                icon: <Star className="w-8 h-8" />,
              },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center text-black font-bold text-2xl">
                  {item.step}
                </div>
                <h3 className="text-white font-bold text-xl mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.description}</p>
                {index < 2 && (
                  <ArrowRight className="w-6 h-6 text-yellow-400 absolute top-8 -right-3 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-300">
              Get answers to common questions about Khai Wala
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="bg-gray-900/80 border-gray-700/50 backdrop-blur-md"
              >
                <CardContent className="p-0">
                  <button
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="text-white font-semibold">
                      {faq.question}
                    </span>
                    {openFaq === index ? (
                      <Minus className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <Plus className="w-5 h-5 text-yellow-400" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-300">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Winning?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Join thousands of players who trust Khai Wala for their betting
              experience
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-lg px-8 py-4"
              onClick={handleDownloadClick}
            >
              <Download className="w-6 h-6 mr-2" />
              Download Khai Wala Now
              {latestRelease?.tag_name && (
                <span className="ml-2 rounded bg-black/20 px-2 py-0.5 text-xs font-semibold text-black">
                  {latestRelease.tag_name}
                </span>
              )}
            </Button>
            <p className="text-sm text-gray-400 mt-4">
              Available for Android devices
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center font-bold text-black">
                  K
                </div>
                <span className="text-white font-bold text-xl">Khai Wala</span>
              </div>
              <p className="text-gray-400 text-sm">
                The most trusted platform for online betting with secure
                payments and fair play.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Download App
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    How to Play
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Game Rules
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Winners
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Live Chat
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Report Issue
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Responsible Gaming
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Age Verification
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center space-y-2">
            {latestRelease && (
              <p className="text-gray-300 text-sm">
                Latest release:{" "}
                {latestRelease.html_url ? (
                  <a
                    href={latestRelease.html_url}
                    className="text-yellow-400 underline hover:text-yellow-300"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {latestRelease.name || "Untitled"}
                  </a>
                ) : (
                  latestRelease.name || "Untitled"
                )}{" "}
                {latestRelease.tag_name && (
                  <span className="text-gray-400">
                    ({latestRelease.tag_name})
                  </span>
                )}
              </p>
            )}
            {/* <p className="text-gray-400 text-sm">
              © 2025 Made By 💖{" "}
              <a
                href="https://www.devhq.in"
                style={{
                  color: "#FFD700",
                  textDecoration: "underline",
                }}
              >
                Devhq.in
              </a>{" "}
              | 18+ Only | Play Responsibly
            </p> */}
          </div>
        </div>
      </footer>

      {/* Download Dialog */}
      <Dialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
        <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-center text-white text-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Download className="w-8 h-8 text-black" />
              </div>
              Download Starting
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-gray-300">
              Your application will download shortly. Please wait...
            </p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <div className="flex items-center justify-center space-x-2 text-green-400">
              <Check className="w-5 h-5" />
              <span className="text-sm">Secure Download</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
