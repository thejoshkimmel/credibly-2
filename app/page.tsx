"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Users, Star } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full px-4 lg:w-1/2">
              <div className="max-w-lg">
                <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                  Build Trust Through
                  <span className="text-gray-700"> Verified Ratings</span>
                </h1>
                <p className="mt-6 text-lg text-gray-600">
                  Credibly helps professionals build and maintain their reputation through verified ratings and reviews from colleagues and clients.
                </p>
                <div className="flex flex-wrap mt-8 gap-4">
                  <Link href="/signup">
                    <Button size="lg" variant="outline">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full px-4 mt-12 lg:w-1/2 lg:mt-0">
              <div className="relative w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-xl" style={{ height: 400 }}>
                <Image
                  src="/hero-image.png"
                  alt="Credibly Platform"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gray-700 rounded-lg opacity-10 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Why Choose Credibly?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Our platform provides everything you need to build and maintain professional credibility.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-8 bg-white rounded-lg shadow-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-6 text-blue-600 bg-blue-100 rounded-lg">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900">Verified Ratings</h3>
              <p className="text-gray-600">
                All ratings are verified to ensure authenticity and build trust in your professional reputation.
              </p>
            </div>

            <div className="p-8 bg-white rounded-lg shadow-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-6 text-blue-600 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900">Professional Network</h3>
              <p className="text-gray-600">
                Connect with colleagues and clients to build a strong professional network.
              </p>
            </div>

            <div className="p-8 bg-white rounded-lg shadow-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-6 text-yellow-500 bg-yellow-100 rounded-lg">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900">Credibly Score</h3>
              <p className="text-gray-600">
                Your Credibly Score is a dynamic, trust-based rating calculated from verified feedback, helping you stand out in your industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Build Your Professional Reputation?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Join thousands of professionals who trust Credibly to showcase their expertise.
            </p>
            <div className="flex flex-wrap justify-center mt-8 gap-4">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center justify-between">
            <div className="w-full text-center lg:w-auto">
              <Link href="/" className="text-2xl font-bold text-white">
                Credibly
              </Link>
            </div>
            <div className="flex flex-wrap justify-center mt-8 lg:mt-0">
              <Link href="/about" className="px-4 text-gray-400 hover:text-white">
                About
              </Link>
              <Link href="/privacy" className="px-4 text-gray-400 hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="px-4 text-gray-400 hover:text-white">
                Terms
              </Link>
              <Link href="/contact" className="px-4 text-gray-400 hover:text-white">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Credibly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
