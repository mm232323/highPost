import Image from "next/image";
import Link from "next/link";
import NavLink from "../ui/navLink";
export default function Header({ size, isAuth }) {
  return (
    <>
      {size == "small" && (
        <header className="bg-white/5 w-[842px] [@media(max-width:450px)]:w-[348.62px] h-[116px] [@media(max-width:450px)]:h-[70.03px] border-white/25 border-[.3px] rounded-[11px] [@media(max-width:450px)]:rounded-[6px] relative left-1/2 translate-x-[-50%] top-[45px] [@media(max-width:1025px)]:top-[70px]">
          <Link href="/">
            <Image
              src="/posterizer.svg"
              width={157}
              height={54}
              alt="posterizer"
              className="relative [@media(max-width:450px)]:w-[99.78px] ml-[50px] [@media(max-width:450px)]:ml-[20px] top-1/2 translate-y-[-50%] inline md_screen_max"
            />
          </Link>
          <Link href="/">
            <Image
              src="/posterizerIco.svg"
              width={39.33}
              height={29.95}
              alt="posterizer"
              className="relative [@media(max-width:450px)]:w-[39.33px] ml-[50px] [@media(max-width:450px)]:ml-[20px] top-1/2 translate-y-[-50%] [@media(max-width:450px)]:translate-y-[-50%] inline sm_screen_min"
            />
          </Link>
          <Link href="/about">
            <h1 className="font-[181] text-[23px] text-[#A1E5D5] relative inline pr-[30px] top-[32px] left-[80px] hover:opacity-70 duration-[.4s] [@media(max-width:450px)]:text-[13px] [@media(max-width:450px)]:left-[30px] [@media(max-width:450px)]:pr-[15px] [@media(max-width:450px)]:top-[19px]">
              about
            </h1>
          </Link>
          <Link href="/contact">
            <h1 className="font-[181] text-[23px] text-[#A1E5D5] relative inline top-[32px] left-[80px] hover:opacity-70 duration-[.4s] cursor-pointer [@media(max-width:450px)]:text-[13px] [@media(max-width:450px)]:left-[30px] [@media(max-width:450px)]:top-[19px]">
              contact
            </h1>
          </Link>
          <Link href="/signup">
            <button className="w-[96px] [@media(max-width:450px)]:w-[55.75px] h-[44px] [@media(max-width:450px)]:h-[30px] [@media(max-width:450px)]:rounded-[4px] [@media(max-width:450px)]:text-[11.5px] border-white/60 border-[.5px] rounded-[8px] relative left-[150px] mr-[20px] text-[#9CDFD0] font-[146] text-[20px] top-[32px] hover:bg-[#9CDFD0] hover:text-[#010511] duration-[.4s] [@media(max-width:450px)]:left-[50px] [@media(max-width:450px)]:top-[19px]">
              Sign up
            </button>
          </Link>
          <Link href="/login">
            <button className="w-[96px] [@media(max-width:450px)]:w-[55.75px] h-[44px] [@media(max-width:450px)]:h-[30px] [@media(max-width:450px)]:rounded-[4px] [@media(max-width:450px)]:text-[11.5px] border-white/60 border-[.5px] rounded-[8px] relative left-[150px] text-[#9CDFD0] font-[146] text-[20px] top-[32px] hover:bg-[#9CDFD0] hover:text-[#010511] duration-[.4s] [@media(max-width:450px)]:left-[50px] [@media(max-width:450px)]:top-[19px]">
              Log in
            </button>
          </Link>
        </header>
      )}
      {(size == "large") & !isAuth && (
        <center>
          <header className="bg-white/5 w-full h-[116px] [@media(max-width:450px)]:h-[70.03px] border-b-white/25 border-b-[.3px] relative">
            <Link href="/">
              <Image
                src="/posterizer.svg"
                width={157}
                height={54}
                className="relative [@media(max-width:910px)]:ml-[-100px] [@media(max-width:770px)]:ml-[-140px] [@media(max-width:450px)]:ml-[-50px] [@media(max-width:665px)]:ml-[-80px] [@media(max-width:500px)]:w-[99.78px] top-1/2 translate-y-[-50%] [@media(max-width:665px)]:translate-y-[-61%] [@media(max-width:450px)]:translate-y-[-50%] inline [@media(max-width:665px)]:w-[120px]"
                alt='posterizer'
              />
            </Link>
            <NavLink href="/about" type='text'>
              <h1 className="font-[181] text-[23px] [@media(max-width:725px)]:text-[21px] text-[#A1E5D5] relative inline pr-[30px] [@media(max-width:725px)]:pr-[20px] top-[32px] left-[80px] [@media(max-width:725px)]:left-[60px] [@media(max-width:665px)]:left-[40px] hover:opacity-70 duration-[.4s] [@media(max-width:500px)]:text-[13px] [@media(max-width:450px)]:left-[30px] [@media(max-width:500px)]:pr-[15px] [@media(max-width:500px)]:top-[19px]">
                about
              </h1>
            </NavLink>
            <NavLink href="/contact" type='text'>
              <h1 className="font-[181] text-[23px] [@media(max-width:725px)]:text-[21px] text-[#A1E5D5] relative inline top-[32px] left-[80px] [@media(max-width:725px)]:left-[60px] [@media(max-width:665px)]:left-[40px] hover:opacity-70 duration-[.4s] [@media(max-width:500px)]:text-[13px] [@media(max-width:500px)]:left-[30px] [@media(max-width:500px)]:top-[19px]">
                contact
              </h1>
            </NavLink>
            <NavLink href="/signup">
                Sign up
            </NavLink>
            <NavLink href="/login">
                Log in
            </NavLink>
          </header>
        </center>
      )}
    </>
  );
}
