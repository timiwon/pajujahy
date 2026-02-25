import { TopNav } from '../navigation/TopNav';

export function Header() {
  return (
      <header>
          <div className="flex w-full flex-row items-center border-b">
              <Logo />
              <TopNav />
          </div>
      </header>
  );
}

function Logo() {
   return (
       <div className="w-fit border-r">
           <a href="/">
               <img
                   className="hover:bg-brand-80 dark:hover:bg-brand-dark-90 h-16 w-16"
                   src="https://my.cyon.ch/img/cyon-logo-min.svg"
                   alt="my.cyon Logo"
               />
           </a>
       </div>
   );
}
