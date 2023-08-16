"use client"

import { Edit, ShoppingBag } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { useShoppingCart } from "use-shopping-cart"

export function SiteHeader() {
  const { cartCount } = useShoppingCart()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const defaultSearchQUery = searchParams.get('search') ?? ""

  if (pathname.startsWith('/studio')) return null

  function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const seachQuery = formData.get('search')
    router.replace(`/?search=${seachQuery}`)
  }

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between space-x-4 px-6 sm:space-x-0">
        <MainNav />
        <form
          onSubmit={onSubmit}
          className="hidden items-center lg:inline-flex">
          <Input
            id="search"
            name="search"
            type="search"
            autoComplete="off"
            placeholder="Search products..."
            className="h-9 lg:w-[300px]"
            defaultValue={defaultSearchQUery}
          />
        </form>
        <div className="flex items-center space-x-1">
          <Link href="/cart">
            <Button size="sm" variant="ghost">
              <ShoppingBag className="h-5 w-5" />
              <span className="ml-2 text-sm font-bold">{cartCount}</span>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          <ThemeToggle />
          {process.env.NODE_ENV === 'development' && (
            <Link href="/studio">
              <Button size="sm" variant="ghost">
                <Edit className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}