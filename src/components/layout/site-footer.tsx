// React and Next.js imports
import Link from "next/link";

// Third-party library imports
import Balancer from "react-wrap-balancer";

// UI component imports

// Local component imports
import { Section, Container } from "@/components/ui/craft";

// Asset imports
import { buttonVariants } from "@/components/ui/button";

export default function SiteFooter() {
  return (
    <footer className="">
      <Section>
        <Container className="not-prose flex w-full flex-col items-center justify-center gap-6 border-t !pb-0 md:flex-row md:gap-6">
          <div className="flex items-center justify-center gap-6">
            <Link href="/">
              <h3 className="sr-only">Palladio AI</h3>
              {/* <Image
                src={"/logo.webp"}
                alt="Logo"
                quality={100}
                width={80}
                height={80}
                className="transition-all hover:opacity-75"
              ></Image> */}
            </Link>
            {/* <Button asChild variant="outline" size="icon">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubLogoIcon />
              </a>
            </Button>
            <Button asChild variant="outline" size="icon">
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterLogoIcon />
              </a>
            </Button>
            <Button asChild variant="outline" size="icon">
              <a
                href={siteConfig.links.discord}
                target="_blank"
                rel="noopener noreferrer"
              >
                <DiscordLogoIcon />
              </a>
            </Button> */}
          </div>
          <p className="text-center text-muted-foreground">
            © <a href="https://trissinoai.com">Trissino AI</a>. All rights
            reserved. 2024-present.
          </p>
        </Container>
        <Container className="grid justify-center gap-6">
          <div className="not-prose flex flex-col gap-6">
            <p className="text-center leading-7 [&:not(:first-child)]:mt-6">
              <Balancer>
                Brand Research Becomes Easier, Faster and Deeper
              </Balancer>
            </p>
          </div>
          <div className="mb-4 flex flex-col justify-center gap-4 md:mb-0 md:flex-row">
            <Link
              className={buttonVariants({ variant: "link" })}
              href="/privacy-policy"
            >
              Privacy Policy
            </Link>
            <Link
              className={buttonVariants({ variant: "link" })}
              href="/terms-of-service"
            >
              Terms of Service
            </Link>
            <Link
              className={buttonVariants({ variant: "link" })}
              href="/cookie-policy"
            >
              Cookie Policy
            </Link>
          </div>
        </Container>
      </Section>
    </footer>
  );
}
