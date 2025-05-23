import { Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-50 py-4 text-center">
      {/* Logo + Social Icon */}
      <div className="mt-12">
        <div className="mx-auto flex aspect-square h-30 w-30 items-center justify-center overflow-hidden rounded-full bg-white">
                <img
                  src="/Pictures/Lcarpio-logo.jpg"
                  alt="FlowerShop Logo"
                  className="h-20 w-20 object-contain"
                />
          </div>
        <div className="mt-6 flex justify-center space-x-4">
          <button className="rounded-full bg-[#a6c48a] p-2 text-white">
            <a href="https://www.facebook.com/profile.php?id=100075981939873">
              <Facebook />
            </a>
          </button>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-10 text-sm text-gray-500">
        Lcarpio's Flower Shop © 2025.{" "}
        <a href="#" className="hover:underline">
          Terms of Use
        </a>{" "}
        and{" "}
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
