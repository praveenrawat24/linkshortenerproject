"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LinkIcon, BarChart3, Share2, Zap } from "lucide-react";

export default function Home() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && userId) {
      router.push("/dashboard");
    }
  }, [isLoaded, userId, router]);

  if (isLoaded && userId) return null;

  const features = [
    {
      icon: LinkIcon,
      title: "Shorten URLs",
      description:
        "Convert long, complex URLs into short, memorable links in seconds.",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description:
        "Track clicks, traffic sources, and audience insights for each link.",
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description:
        "Share your shortened links across social media and messaging apps.",
    },
    {
      icon: Zap,
      title: "Custom Slugs",
      description:
        "Create branded links with custom keywords to match your brand.",
    },
  ];

  return (
    <div className="bg-white dark:bg-black">
      <main className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center px-4 py-20 sm:py-28">
          <div className="max-w-2xl w-full text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black dark:text-white mb-6">
              Shorten Your Links,{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Amplify Your Reach
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Create short, memorable links with powerful analytics. Track every
              click, understand your audience, and share with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignUpButton mode="modal">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started Free
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Sign In
                </Button>
              </SignInButton>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-20 sm:py-28 bg-gray-50 dark:bg-zinc-950">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
                Powerful Features
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Everything you need to manage and optimize your links
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-gray-200 dark:border-zinc-800 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
                  >
                    <Icon className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
                    <h3 className="font-semibold text-lg text-black dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20 sm:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Join thousands of users shortening their links and gaining insights
              today.
            </p>
            <SignUpButton mode="modal">
              <Button size="lg">Create Your First Link</Button>
            </SignUpButton>
          </div>
        </section>
      </main>
    </div>
  );
}
