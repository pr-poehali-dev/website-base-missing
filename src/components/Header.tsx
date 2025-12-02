import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
              <span className="text-2xl text-muted-foreground">АК</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight hover:text-primary transition-colors">
              Официальный сайт Алексея Каплана
            </h1>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                isHome ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Главная
            </Link>
            <button
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              Об авторе
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;