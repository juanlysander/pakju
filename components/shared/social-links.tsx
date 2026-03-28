import Link from "next/link"

import Github from "@/assets/social/github"
import InstagramIcon from "@/assets/social/instagram"
import TiktokIcon from "@/assets/social/tiktok"
import YoutubeIcon from "@/assets/social/youtube"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

const SocialLinks = () => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="outline" size="icon" asChild className="rounded-full">
        <Link
          href="https://github.com/juanlysander"
          target="_blank"
          aria-label="GitHub"
        >
          <Github className="size-4.5! fill-current" />
        </Link>
      </Button>
      <Button variant="outline" size="icon" asChild className="rounded-full">
        <Link
          href="https://instagram.com/juanlysander"
          target="_blank"
          aria-label="Instagram"
        >
          <InstagramIcon className="size-4.5! fill-current" />
        </Link>
      </Button>
      <Button variant="outline" size="icon" asChild className="rounded-full">
        <Link href="https://tiktok.com/@juanlysander" target="_blank" aria-label="TikTok">
          <TiktokIcon className="size-4.5! fill-current" />
        </Link>
      </Button>
      <Button variant="outline" size="icon" asChild className="rounded-full">
        <Link href="https://youtube.com/@juanlysander" target="_blank" aria-label="YouTube">
          <YoutubeIcon className="size-4.5! fill-current" />
        </Link>
      </Button>
      <div className="mx-1 h-5 w-px bg-border" />
      <ThemeToggle />
    </div>
  )
}

export default SocialLinks
