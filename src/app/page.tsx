import {Button} from "@/components/ui/button";
import PageTear from "@/app/_components/pageTear";
import Link from "next/link";

export default function Home() {
  return (
      <main
          style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            background: "rgba(0,0,0,1)",
          }}
      >
        <video
            src="whisk.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 0,
              opacity: 0.6, // Adjust opacity for the video
            }}
        />
        <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.2)",
              zIndex: 1,
              pointerEvents: "none",
            }}
        />
        {/* Overlay with header, content, footer */}
        <div
            className="flex flex-col justify-between h-screen w-screen relative z-2"
            style={{zIndex: 2}}
        >
          {/* Header */}
          <header className="w-full p-6 flex justify-between items-center">
            <span className="text-white text-xl font-bold">BonoIQ</span>
            <nav>
              <a href="#" className="text-white px-4">Home</a>
              <a href="#" className="text-white px-4">About</a>
              <a href="#" className="text-white px-4">Contact</a>
            </nav>
          </header>

          {/* Centered Content */}
          <main className="flex-1 flex items-center justify-center">
            <div className="bg-opacity-50 p-8 rounded-lg  text-center">
              <h1 className="text-6xl font-bold mb-4 text-white">Welcome to BonoIQ</h1>
              <p className="text-lg text-white">Your journey to smarter financial thinking starts here.</p>
              <Link href={"/login"}>
                <Button className="cursor-pointer mt-8 px-12 py-7 text-xl font-bold transition-transform duration-200 hover:scale-110 active:scale-95">
                  STEP IN
                </Button>
              </Link>
            </div>
          </main>

          {/* Footer */}
          <footer className="w-full p-4 flex justify-center items-center">
            <span className="text-white">&copy; 2025 BonoIQ. All rights reserved.</span>
          </footer>
        </div>
        <Link href={"/login"}>
          <PageTear/>
        </Link>
      </main>
  );
}
